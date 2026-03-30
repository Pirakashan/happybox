import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, CloudUpload, X, ImageIcon, Search, Filter, MoreHorizontal, ChevronRight, LayoutGrid, List } from 'lucide-react';
import giftService from '../utils/giftService';

const GiftManager = () => {
    const [gifts, setGifts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
    const [showModal, setShowModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [categoryForm, setCategoryForm] = useState({ name: '' });
    const [editingCategory, setEditingCategory] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        event_category_id: '',
        description: '',
        price: '',
        image: null,
        is_featured: false
    });

    const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace('/api', '');

    useEffect(() => {
        fetchGifts();
        fetchCategories();
    }, []);

    const fetchGifts = async () => {
        setLoading(true);
        try {
            const data = await giftService.getAll();
            setGifts(data);
        } catch (err) {
            setError('Failed to fetch gifts');
        }
        setLoading(false);
    };

    const fetchCategories = async () => {
        try {
            const data = await giftService.getCategories();
            setCategories(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            event_category_id: '',
            description: '',
            price: '',
            image: null,
            is_featured: false
        });
        setEditMode(false);
        setSelectedId(null);
    };

    const openCreateModal = () => {
        resetForm();
        setShowModal(true);
    };

    const openEditModal = (gift) => {
        setFormData({
            name: gift.name,
            event_category_id: gift.event_category_id,
            description: gift.description || '',
            price: gift.price,
            image: null,
            is_featured: !!gift.is_featured
        });
        setEditMode(true);
        setSelectedId(gift.id);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image' && !formData[key]) return;
            fd.append(key, key === 'is_featured' ? (formData[key] ? 1 : 0) : formData[key]);
        });

        try {
            if (editMode) {
                await giftService.update(selectedId, fd);
            } else {
                await giftService.create(fd);
            }
            setShowModal(false);
            fetchGifts();
            resetForm();
        } catch (err) {
            alert('Error saving gift');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this gift?')) {
            try {
                await giftService.delete(id);
                fetchGifts();
            } catch (err) {
                alert('Error deleting gift');
            }
        }
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await giftService.updateCategory(editingCategory.id, categoryForm.name);
            } else {
                await giftService.addCategory(categoryForm.name);
            }
            setCategoryForm({ name: '' });
            setEditingCategory(null);
            fetchCategories();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving category');
        }
    };

    const handleCategoryEdit = (cat) => {
        setEditingCategory(cat);
        setCategoryForm({ name: cat.name });
    };

    const handleCategoryDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category? (Deleting will fail if items are assigned to this category)')) {
            try {
                await giftService.deleteCategory(id);
                fetchCategories();
            } catch (err) {
                alert(err.response?.data?.message || 'Error deleting category. Most likely it has items assigned to it.');
            }
        }
    };

    const getFullImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `${API_BASE}${path}`;
    };

    const filteredGifts = gifts.filter(gift => {
        const matchSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = filterCategory === '' || gift.event_category_id.toString() === filterCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div style={{ padding: '0 0 50px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '8px' }}>Manage Gifts Collection</h2>
                    <p style={{ color: '#888' }}>Upload and organize your premium customized gift collection.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        onClick={() => setShowCategoryModal(true)}
                        style={{
                            padding: '12px 24px',
                            background: 'white',
                            color: 'var(--primary)',
                            border: '1px solid var(--primary)',
                            borderRadius: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <Filter size={20} /> Categories
                    </button>
                    <button
                        onClick={openCreateModal}
                        style={{
                            padding: '12px 24px',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 4px 15px rgba(212,163,115,0.3)'
                        }}
                    >
                        <Plus size={20} /> Add New Gift
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div style={{
                background: 'white',
                padding: '15px 25px',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} color="#aaa" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 10px 10px 45px',
                                border: '1px solid #f0f0f0',
                                borderRadius: '10px',
                                outline: 'none',
                                background: '#fcfcfc',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Filter size={18} color="#aaa" />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            style={{
                                padding: '8px 15px',
                                border: '1px solid #f0f0f0',
                                borderRadius: '10px',
                                background: '#fcfcfc',
                                outline: 'none',
                                color: '#555',
                                fontSize: '0.9rem'
                            }}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={{ display: 'flex', background: '#f5f5f5', padding: '4px', borderRadius: '10px', gap: '4px' }}>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            padding: '6px 12px',
                            border: 'none',
                            background: viewMode === 'list' ? 'white' : 'transparent',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: viewMode === 'list' ? 'var(--primary)' : '#888',
                            boxShadow: viewMode === 'list' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none'
                        }}
                    >
                        <List size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        style={{
                            padding: '6px 12px',
                            border: 'none',
                            background: viewMode === 'grid' ? 'white' : 'transparent',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: viewMode === 'grid' ? 'var(--primary)' : '#888',
                            boxShadow: viewMode === 'grid' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none'
                        }}
                    >
                        <LayoutGrid size={18} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ padding: '100px', textAlign: 'center' }}>Loading gifts...</div>
            ) : filteredGifts.length === 0 ? (
                <div style={{ padding: '100px', textAlign: 'center', background: 'white', borderRadius: '20px', color: '#888' }}>
                    <ImageIcon size={48} style={{ opacity: 0.2, marginBottom: '15px' }} />
                    <p>No gifts found in this collection.</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '25px'
                }}>
                    {filteredGifts.map(gift => (
                        <div key={gift.id} style={{
                            background: 'white',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                            transition: 'all 0.3s'
                        }}>
                            <div style={{ height: '220px', position: 'relative' }}>
                                <img
                                    src={getFullImageUrl(gift.image_path) || 'https://via.placeholder.com/400x300?text=No+Image'}
                                    alt={gift.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                {gift.is_featured && (
                                    <div style={{
                                        position: 'absolute', top: '15px', right: '15px',
                                        background: 'var(--primary)', color: 'white',
                                        padding: '4px 12px', borderRadius: '50px',
                                        fontSize: '0.75rem', fontWeight: 700
                                    }}>
                                        Featured
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {gift.event_category?.name || 'Uncategorized'}
                                    </span>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '4px' }}>{gift.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '8px', lineHeight: '1.5', height: '40px', overflow: 'hidden' }}>
                                        {gift.description}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f5f5', paddingTop: '15px' }}>
                                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1a1a' }}>Rs. {parseFloat(gift.price).toLocaleString()}</span>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => openEditModal(gift)}
                                            style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: '#f5f5f5', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(gift.id)}
                                            style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: '#fff0f0', color: '#d00000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                                <th style={{ padding: '20px 25px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Gift Info</th>
                                <th style={{ padding: '20px 25px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Category</th>
                                <th style={{ padding: '20px 25px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Price</th>
                                <th style={{ padding: '20px 25px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888' }}>Status</th>
                                <th style={{ padding: '20px 25px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#888', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGifts.map(gift => (
                                <tr key={gift.id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                                    <td style={{ padding: '20px 25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <img
                                                src={getFullImageUrl(gift.image_path) || 'https://via.placeholder.com/80x80?text=None'}
                                                style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: 700, color: '#1a1a1a' }}>{gift.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '2px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {gift.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 25px' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555', background: '#f5f5f5', padding: '5px 12px', borderRadius: '50px' }}>
                                            {gift.event_category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 25px', fontWeight: 700 }}>
                                        Rs. {parseFloat(gift.price).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '20px 25px' }}>
                                        {gift.is_featured ? (
                                            <span style={{ color: '#2e7d32', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2e7d32' }}></div> Featured
                                            </span>
                                        ) : (
                                            <span style={{ color: '#888', fontSize: '0.8rem' }}>Standard</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '20px 25px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => openEditModal(gift)}
                                                style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #eee', background: 'white', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600 }}
                                            >
                                                <Edit3 size={14} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(gift.id)}
                                                style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#fff0f0', color: '#d00000', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
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
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '700px',
                        padding: '40px',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{editMode ? 'Edit Gift Item' : 'Add New Gift Item'}</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: '#f5f5f5', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Gift Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Midnight Surprise"
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Category</label>
                                    <select
                                        name="event_category_id"
                                        required
                                        value={formData.event_category_id}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Price (Rs.)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 5500"
                                        className="form-control"
                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            name="is_featured"
                                            checked={formData.is_featured}
                                            onChange={handleInputChange}
                                            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                                        />
                                        Featured Item
                                    </label>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the contents of this gift box..."
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', resize: 'none' }}
                                ></textarea>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Upload Image</label>
                                <div style={{ position: 'relative', border: '2px dashed #eee', borderRadius: '16px', padding: '30px', textAlign: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%' }}
                                    />
                                    {formData.image ? (
                                        <div style={{ color: 'var(--primary)', fontWeight: 700 }}>{formData.image.name} (Ready to upload)</div>
                                    ) : (
                                        <>
                                            <CloudUpload size={32} color="#aaa" style={{ marginBottom: '10px' }} />
                                            <p style={{ color: '#999', fontSize: '0.9rem' }}>Drag & drop or click to change photo</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ flex: 1, padding: '15px', borderRadius: '15px', border: '1px solid #eee', background: 'white', fontWeight: 700, cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ flex: 2, padding: '15px', borderRadius: '15px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 700, cursor: 'pointer' }}
                                >
                                    {editMode ? 'Update Gift Item' : 'Create Gift Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Manage Categories Modal */}
            {showCategoryModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '500px',
                        padding: '40px',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Gift Categories</h3>
                            <button onClick={() => { setShowCategoryModal(false); setEditingCategory(null); setCategoryForm({ name: '' }); }} style={{ background: '#f5f5f5', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Add/Edit Category Form */}
                        <form onSubmit={handleCategorySubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm({ name: e.target.value })}
                                placeholder="New Category Name..."
                                required
                                style={{ flex: 1, padding: '12px 18px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none' }}
                            />
                            <button
                                type="submit"
                                style={{
                                    padding: '12px 24px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                {editingCategory ? 'Update' : 'Add'}
                            </button>
                        </form>

                        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                            {categories.map(cat => (
                                <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                                    <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{cat.name}</span>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => handleCategoryEdit(cat)}
                                            style={{ color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleCategoryDelete(cat.id)}
                                            style={{ color: '#d00000', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowCategoryModal(false)}
                            style={{ width: '100%', marginTop: '30px', padding: '15px', borderRadius: '15px', border: '1px solid #eee', background: 'white', fontWeight: 700, cursor: 'pointer' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GiftManager;
