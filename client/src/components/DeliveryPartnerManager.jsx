import React, { useState, useEffect } from 'react';
import { 
    Plus, Edit3, Trash2, CloudUpload, Image as ImageIcon, 
    X, Check, Search, Package, Bike, Globe, Truck, Box
} from 'lucide-react';
import exploreService from '../utils/exploreService';

const DeliveryPartnerManager = () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000';

    const getFullImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `${API_BASE}${path}`;
    };

    const [partners, setPartners] = useState([]);
    const [parentNode, setParentNode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editNode, setEditNode] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', image: null
    });

    const parentSlug = 'personal-shopping-international-delivery';

    useEffect(() => {
        loadPartners();
    }, []);

    const loadPartners = async () => {
        setLoading(true);
        setError(null);
        try {
            // First get the parent node to get its ID
            const parentRes = await exploreService.getNodeDetails(parentSlug);
            setParentNode(parentRes);
            
            // Then get its children
            const res = await exploreService.getChildren(parentRes.id);
            const partnerNodes = (res.children || []).filter(c => c.type === 'delivery_partner');
            setPartners(partnerNodes);
        } catch (err) {
            console.error('Error loading partners:', err);
            setError('Failed to load delivery partners. Please ensure the "Personal Shopping" section exists.');
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!parentNode) return;

        const fd = new FormData();
        fd.append('title', formData.title);
        fd.append('description', formData.description);
        fd.append('type', 'delivery_partner');
        fd.append('parent_id', parentNode.id);
        if (formData.image) fd.append('image', formData.image);

        try {
            if (editNode) {
                await exploreService.updateNode(editNode.id, fd);
            } else {
                await exploreService.createNode(fd);
            }
            setShowModal(false);
            setEditNode(null);
            setFormData({ title: '', description: '', image: null });
            loadPartners();
        } catch (err) {
            console.error('Error saving partner:', err);
        }
    };

    const openEdit = (partner) => {
        setEditNode(partner);
        setFormData({
            title: partner.title,
            description: partner.description || '',
            image: null
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this partner?')) return;
        try {
            await exploreService.deleteNode(id);
            loadPartners();
        } catch (err) {
            console.error('Error deleting partner:', err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '8px' }}>
                        Delivery Partners & Services
                    </h2>
                    <p style={{ color: '#666' }}>Manage Sri Lankan and International delivery couriers displayed on the frontend.</p>
                </div>
                <button 
                    onClick={() => { setEditNode(null); setFormData({ title: '', description: '', image: null }); setShowModal(true); }}
                    style={{
                        background: 'var(--primary)', color: '#fff', border: 'none',
                        padding: '12px 24px', borderRadius: '10px', fontSize: '0.95rem',
                        fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px',
                        cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(212,163,115,0.2)'
                    }}
                >
                    <Plus size={18} /> Add New Partner
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}><div className="spinner"></div></div>
            ) : error ? (
                <div style={{ padding: '40px', textAlign: 'center', background: '#ffebee', borderRadius: '12px', color: '#d00000' }}>
                    <p>{error}</p>
                </div>
            ) : partners.length === 0 ? (
                <div style={{ padding: '80px 20px', textAlign: 'center', background: '#fff', borderRadius: '20px', border: '2px dashed #eee' }}>
                    <Truck size={48} color="#ccc" style={{ marginBottom: '16px' }} />
                    <p style={{ color: '#999', fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>No partners added yet.</p>
                    <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '30px' }}>Would you like to start with the 4 default Sri Lankan delivery services?</p>
                    <button 
                        onClick={async () => {
                            setLoading(true);
                            const defaults = [
                                { title: 'PickMe Flash', description: 'Instant motorcycle delivery within city limits.' },
                                { title: 'Uber Connect', icon: 'Globe', description: 'Real-time tracked parcel sending.' },
                                { title: 'Pronto', description: 'Leading island-wide courier with tracking.' },
                                { title: 'Domex', description: 'Extensive delivery network for all parcel sizes.' }
                            ];
                            try {
                                for (const d of defaults) {
                                    const fd = new FormData();
                                    fd.append('title', d.title);
                                    fd.append('description', d.description);
                                    fd.append('type', 'delivery_partner');
                                    fd.append('parent_id', parentNode.id);
                                    await exploreService.createNode(fd);
                                }
                                loadPartners();
                            } catch (err) {
                                console.error('Quick setup failed:', err);
                                setError('Failed to run quick setup.');
                            }
                            setLoading(false);
                        }}
                        style={{
                            background: '#fdfaf6', color: 'var(--primary)', border: '1px solid #f0e8de',
                            padding: '12px 30px', borderRadius: '10px', fontSize: '0.95rem',
                            fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f0e8de'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fdfaf6'; }}
                    >
                        Yes, Add 4 Default Partners
                    </button>
                    <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#ccc' }}>
                        Or click the "Add New Partner" button above to add your own.
                    </div>
                </div>
            ) : (
                <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #eee', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#fdfaf6', borderBottom: '1px solid #eee' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', textAlign: 'left', color: '#666', fontWeight: 600, fontSize: '0.85rem', width: '100px' }}>LOGO</th>
                                <th style={{ padding: '16px 24px', textAlign: 'left', color: '#666', fontWeight: 600, fontSize: '0.85rem' }}>PARTNER NAME</th>
                                <th style={{ padding: '16px 24px', textAlign: 'left', color: '#666', fontWeight: 600, fontSize: '0.85rem' }}>TOOLTIP DESCRIPTION</th>
                                <th style={{ padding: '16px 24px', textAlign: 'right', color: '#666', fontWeight: 600, fontSize: '0.85rem', width: '150px' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partners.map(partner => (
                                <tr key={partner.id} style={{ borderBottom: '1px solid #f5f5f5', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ 
                                            width: '50px', height: '50px', background: '#fdfaf6', 
                                            borderRadius: '10px', border: '1px solid #eee', overflow: 'hidden',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {partner.image_path ? (
                                                <img src={getFullImageUrl(partner.image_path)} alt={partner.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            ) : (
                                                <Truck size={20} color="var(--primary)" />
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ fontWeight: 700, color: '#1a1a1a' }}>{partner.title}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', maxWidth: '300px' }}>
                                        <p style={{ color: '#888', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {partner.description || 'No description provided.'}
                                        </p>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button 
                                                onClick={() => openEdit(partner)}
                                                style={{ 
                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                    background: '#fdfdfd', border: '1px solid #eee', color: '#555',
                                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                                title="Edit"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(partner.id)}
                                                style={{ 
                                                    width: '32px', height: '32px', borderRadius: '8px',
                                                    background: '#fff5f5', border: '1px solid #ffecec', color: '#d00000',
                                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                }}>
                    <div style={{
                        background: '#fff', borderRadius: '24px', padding: '40px',
                        width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{editNode ? 'Edit Partner' : 'Add Delivery Partner'}</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer' }}><X size={18} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem' }}>Partner Name *</label>
                                <input 
                                    type="text" className="form-control" required
                                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g. PickMe Flash"
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem' }}>Logo (Icon/Image)</label>
                                <div style={{
                                    border: '2px dashed #ddd', padding: '30px', borderRadius: '16px',
                                    textAlign: 'center', position: 'relative', cursor: 'pointer'
                                }}>
                                    <input 
                                        type="file" accept="image/*" 
                                        onChange={e => setFormData({...formData, image: e.target.files[0]})}
                                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                    />
                                    {formData.image ? (
                                        <div style={{ padding: '10px' }}>
                                            <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>Selected: {formData.image.name}</p>
                                        </div>
                                    ) : editNode && editNode.image_path ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                            <img src={getFullImageUrl(editNode.image_path)} alt="Current Logo" style={{ height: '60px', objectFit: 'contain' }} />
                                            <p style={{ color: '#999', fontSize: '0.8rem' }}>Current logo (Click to change)</p>
                                        </div>
                                    ) : (
                                        <>
                                            <CloudUpload size={32} color="#ccc" style={{ marginBottom: '8px' }} />
                                            <p style={{ color: '#999', fontSize: '0.9rem' }}>Click to upload logo</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem' }}>Service Tooltip Description</label>
                                <textarea 
                                    className="form-control" rows="3"
                                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                                    placeholder="Brief details about the service..."
                                ></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)} style={{ padding: '12px 24px' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                                    {editNode ? 'Update Partner' : 'Create Partner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryPartnerManager;
