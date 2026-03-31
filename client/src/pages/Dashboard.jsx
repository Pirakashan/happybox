import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ChartLine, CalendarDays, Box, ShoppingCart, Settings,
    Bell, LogOut, MoreHorizontal, User, CloudUpload, Globe, Plus, Edit3,
    Trash2, ArrowLeft, Image as ImageIcon, X, ChevronRight, FolderTree, Eye, Truck
} from 'lucide-react';
import authService from '../utils/authService';
import exploreService from '../utils/exploreService';
import ServiceManager from '../components/ServiceManager';
import GiftManager from '../components/GiftManager';
import DeliveryPartnerManager from '../components/DeliveryPartnerManager';

const Dashboard = () => {
    const navigate = useNavigate();
    const [section, setSection] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const serviceCategories = [
        { id: 1, title: 'Guest & Travel Services', slug: 'guest-travel' },
        { id: 2, title: 'Venue & Setup Services', slug: 'venue-setup' },
        { id: 3, title: 'Vendor Coordination', slug: 'vendor-coordination' },
        { id: 4, title: 'Event Experience Enhancements', slug: 'event-experience' },
        { id: 5, title: 'Documentation & Media', slug: 'documentation-media' },
        { id: 6, title: 'Guest Management', slug: 'guest-management' },
        { id: 7, title: 'Overseas Client Support', slug: 'overseas-support' }
    ];

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/');
        } catch (err) {
            console.error(err);
            // Clear auth data and navigate even if API call fails
            authService.clearAuth();
            navigate('/');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', marginTop: '-80px', position: 'relative', zIndex: '2000', backgroundColor: '#f8f9fa' }}>
            {/* Sidebar */}
            <div style={{ width: '260px', background: 'white', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '30px', borderBottom: '1px solid #f8f9fa' }}>
                    <Link to="/" className="logo"><Box size={20} color="var(--primary)" /> Happy Box</Link>
                </div>
                <div style={{ padding: '20px 0', flex: 1 }}>
                    <SidebarItem icon={<ChartLine size={20} />} label="Dashboard" active={section === 'dashboard'} onClick={() => setSection('dashboard')} />
                    <SidebarItem icon={<Globe size={20} />} label="Explore Sections" active={section === 'explore'} onClick={() => setSection('explore')} />
                    <SidebarItem icon={<CalendarDays size={20} />} label="Manage Events" active={section === 'events'} onClick={() => setSection('events')} />
                    <SidebarItem icon={<Box size={20} />} label="Manage Gifts" active={section === 'gifts'} onClick={() => setSection('gifts')} />
                    <SidebarItem icon={<Truck size={20} />} label="Delivery Partners" active={section === 'delivery'} onClick={() => setSection('delivery')} />
                    <SidebarItem icon={<Settings size={20} />} label="Settings" active={section === 'settings'} onClick={() => setSection('settings')} />
                </div>
                <div style={{ padding: '30px', borderTop: '1px solid #f8f9fa' }}>
                    <div
                        onClick={handleLogout}
                        style={{ color: '#d00000', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}
                    >
                        <LogOut size={20} /> Logout
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '70px', background: 'white', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
                    <h3 style={{ color: '#2d2d2d' }}>{section.charAt(0).toUpperCase() + section.slice(1)} Overview</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            <Bell size={18} color="#888" style={{ cursor: 'pointer' }} />
                            <span style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%' }}></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Admin User</span>
                            <div style={{ width: 35, height: 35, borderRadius: '50%', background: 'var(--secondary)' }}><User size={20} style={{ margin: 7.5 }} color="var(--primary)" /></div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '40px', overflowY: 'auto', flex: 1 }}>
                    {section === 'dashboard' && <DashboardHome />}
                    {section === 'explore' && <ExploreManager />}
                    {section === 'services' && (
                        selectedCategory ? (
                            <div>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--primary)',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        marginBottom: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <ArrowLeft size={18} /> Back to Categories
                                </button>
                                <ServiceManager {...selectedCategory} />
                            </div>
                        ) : (
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '30px', color: '#1a1a1a' }}>
                                    Service Categories
                                </h2>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                    gap: '20px'
                                }}>
                                    {serviceCategories.map(cat => (
                                        <div
                                            key={cat.id}
                                            onClick={() => setSelectedCategory({ categoryTitle: cat.title, categoryId: cat.id, categorySlug: cat.slug })}
                                            style={{
                                                background: '#fff',
                                                border: '1px solid #e8e8e8',
                                                borderRadius: '12px',
                                                padding: '24px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-4px)';
                                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,163,115,0.15)';
                                                e.currentTarget.style.borderColor = 'var(--primary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
                                                e.currentTarget.style.borderColor = '#e8e8e8';
                                            }}
                                        >
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                background: '#FFF3E0',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: '16px'
                                            }}>
                                                <Globe size={26} color="var(--primary)" />
                                            </div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: '#1a1a1a' }}>
                                                {cat.title}
                                            </h3>
                                            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>
                                                Manage services and items
                                            </p>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                color: 'var(--primary)',
                                                fontWeight: 600,
                                                fontSize: '0.95rem'
                                            }}>
                                                Manage <ChevronRight size={16} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                    {section === 'events' && <ManageForm section={section} setSection={setSection} />}
                    {section === 'gifts' && <GiftManager />}
                    {section === 'delivery' && <DeliveryPartnerManager />}
                    {section === 'settings' && <SettingsSection />}
                </div>
            </div>
        </div>
    );
};

// ===========================
// EXPLORE MANAGER (Full CRUD)
// ===========================
const ExploreManager = () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000';

    const getFullImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        return `${API_BASE}${path}`;
    };

    const [nodes, setNodes] = useState([]);
    const [currentParent, setCurrentParent] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editNode, setEditNode] = useState(null);
    const [showGalleryModal, setShowGalleryModal] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [formData, setFormData] = useState({
        title: '', description: '', content: '', type: 'item',
        metadata: '', image: null, rating: ''
    });

    // Column management - different for root vs items
    const rootColumns = [
        { id: 'no', name: 'No', editable: false, visible: true, width: '80px' },
        { id: 'title', name: 'Title', editable: false, visible: true, width: '250px' },
        { id: 'type', name: 'Type', editable: false, visible: true, width: '150px' },
        { id: 'slug', name: 'Slug', editable: false, visible: true, width: '200px' },
        { id: 'order', name: 'Order', editable: false, visible: true, width: '100px' }
    ];

    const itemColumns = [
        { id: 'no', name: 'No', editable: false, visible: true, width: '80px' },
        { id: 'title', name: 'Name', editable: false, visible: true, width: '250px' },
        { id: 'description', name: 'Description', editable: false, visible: true, width: '300px' },
        { id: 'image_path', name: 'Photo', editable: false, visible: true, width: '200px' },
        { id: 'rating', name: 'Rating', editable: false, visible: true, width: '120px' }
    ];

    const [columns, setColumns] = useState(rootColumns);
    const [editingColumn, setEditingColumn] = useState(null);
    const [newColumnName, setNewColumnName] = useState('');
    const [showColumnMenu, setShowColumnMenu] = useState(false);
    const [editingCell, setEditingCell] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const [manageColumns, setManageColumns] = useState(false);

    useEffect(() => { loadNodes(); }, [currentParent]);

    const loadNodes = async () => {
        setLoading(true);
        setError(null);
        try {
            if (currentParent) {
                const res = await exploreService.getChildren(currentParent);
                setNodes(Array.isArray(res.children) ? res.children : []);
                setBreadcrumbs(Array.isArray(res.breadcrumbs) ? res.breadcrumbs : []);
                
                // Load columns from parent metadata if they exist
                if (res.parent && res.parent.metadata && res.parent.metadata.columns) {
                    setColumns(res.parent.metadata.columns);
                } else {
                    setColumns(itemColumns);
                }
            } else {
                const res = await exploreService.getRootSections();
                setNodes(Array.isArray(res) ? res : []);
                setBreadcrumbs([]);
                setColumns(rootColumns);
            }
        } catch (err) {
            console.error('Error loading nodes:', err);
            const errorMessage = typeof err === 'object' && err !== null
                ? (err.message || JSON.stringify(err))
                : String(err);
            setError(errorMessage || 'Failed to load content');
            setNodes([]);
        }
        setLoading(false);
    };

    const handleAddColumn = async () => {
        if (!newColumnName.trim() || !currentParent) return;
        const newColId = `col_${Date.now()}`;
        const newCol = {
            id: newColId,
            name: newColumnName,
            editable: true,
            visible: true,
            width: '150px'
        };
        const updatedColumns = [...columns, newCol];
        setColumns(updatedColumns);
        setNewColumnName('');

        // Persist to parent metadata and sync to siblings
        try {
            await exploreService.syncSiblingsColumns(currentParent, updatedColumns);
        } catch (err) {
            console.error('Failed to save columns:', err);
        }
    };

    const handleUpdateColumnName = async (colId, newName) => {
        const updatedColumns = columns.map(col => col.id === colId ? { ...col, name: newName } : col);
        setColumns(updatedColumns);
        setEditingColumn(null);

        if (currentParent) {
            try {
                await exploreService.syncSiblingsColumns(currentParent, updatedColumns);
            } catch (err) {
                console.error('Failed to save column update:', err);
            }
        }
    };

    const handleDeleteColumn = async (colId) => {
        if (colId === 'no') {
            alert('Cannot delete the item index (No.) column');
            return;
        }
            const isDefaultCol = ['photo', 'rating'].includes(colId);
            const msg = isDefaultCol 
                ? `Delete this column GLOBALLY? This will remove "${columns.find(c => c.id === colId)?.name}" from all sections.`
                : 'Delete this column? This will remove all data in this column for items in this section.';
            
            if (window.confirm(msg)) {
                const updatedColumns = columns.filter(col => col.id !== colId);
                setColumns(updatedColumns);

                if (currentParent) {
                    try {
                        await exploreService.syncSiblingsColumns(currentParent, updatedColumns);
                        
                        // Global cleanup if it's a default column
                        await exploreService.bulkMetadataCleanup(currentParent, colId, isDefaultCol);
                        
                        // Force refresh columns for the view
                        loadNodes();
                    } catch (err) {
                        console.error('Failed to save deletion:', err);
                    }
                }
            }
    };

    const handleToggleColumnVisibility = async (colId) => {
        const updatedColumns = columns.map(col => col.id === colId ? { ...col, visible: !col.visible } : col);
        setColumns(updatedColumns);
        if (currentParent) {
            try {
                await exploreService.syncSiblingsColumns(currentParent, updatedColumns);
            } catch (err) {
                console.error('Failed to save visibility change:', err);
            }
        }
    };

    const visibleColumns = columns.filter(col => col.visible);

    const getColumnValue = (node, colId) => {
        switch (colId) {
            case 'no': return '';
            case 'title': return node.title;
            case 'description': return node.description || '';
            case 'image_path': return node.image_path || '';
            case 'type': return node.type;
            case 'slug': return node.slug;
            case 'order': return node.order_index;
            case 'rating': return node.rating;
            default:
                // Check metadata
                if (node.metadata && typeof node.metadata === 'object') {
                    return node.metadata[colId] || '';
                }
                return '';
        }
    };

    const startEditing = (nodeId, colId, value) => {
        if (colId === 'no' || colId === 'image_path') return;
        setEditingCell({ nodeId, colId });
        setEditingValue(value != null ? String(value) : '');
    };

    const cancelEditing = () => {
        setEditingCell(null);
        setEditingValue('');
    };

    const saveInlineEdit = async () => {
        if (!editingCell) return;
        const { nodeId, colId } = editingCell;
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;
        const oldVal = getColumnValue(node, colId);
        if (String(oldVal) === editingValue) { cancelEditing(); return; }

        const fieldMap = { title: 'title', type: 'type', slug: 'slug', order: 'order_index', description: 'description', rating: 'rating' };
        const field = fieldMap[colId];

        try {
            const fd = new FormData();
            if (field) {
                fd.append(field, editingValue);
            } else {
                // It's a metadata field
                const updatedMetadata = { ...(node.metadata || {}), [colId]: editingValue };
                fd.append('metadata', JSON.stringify(updatedMetadata));
            }
            await exploreService.updateNode(nodeId, fd);
            cancelEditing();
            loadNodes();
        } catch (err) {
            console.error(err);
            alert('Save failed.');
        }
    };

    const onEditKeyDown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); saveInlineEdit(); }
        else if (e.key === 'Escape') cancelEditing();
    };

    const openCreate = () => {
        setEditNode(null);
        
        let initialType = 'item';
        if (!currentParent) {
            initialType = 'root';
        } else if (breadcrumbs.length > 0) {
            const pNode = breadcrumbs[breadcrumbs.length - 1];
            if (pNode.type === 'root') initialType = 'group';
            else if (pNode.type === 'group') initialType = 'category';
            else if (pNode.type === 'category') initialType = 'service_item';
        }

        setFormData({
            title: '', description: '', content: '',
            type: initialType,
            metadata: '', metadata_vals: {}, image: null, rating: ''
        });
        setShowModal(true);
    };

    const openEdit = (node) => {
        setEditNode(node);
        setFormData({
            title: node.title,
            description: node.description || '',
            content: node.content || '',
            type: node.type,
            metadata: node.metadata ? JSON.stringify(node.metadata) : '',
            metadata_vals: node.metadata || {},
            image: null,
            rating: node.rating !== null && node.rating !== undefined ? node.rating : ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('title', formData.title);
        fd.append('description', formData.description);
        fd.append('content', formData.content);
        fd.append('type', formData.type);

        if (currentParent) {
            // For items under a section, combine potential metadata string with custom columns input
            let mergedMeta = {};
            if (formData.metadata) {
                try { mergedMeta = JSON.parse(formData.metadata); } catch (e) { console.error('Invalid JSON metadata string'); }
            }
            const finalMeta = { ...mergedMeta, ...(formData.metadata_vals || {}) };
            if (Object.keys(finalMeta).length > 0) {
                fd.append('metadata', JSON.stringify(finalMeta));
            }
        } else {
            // For top level root/groups, just append raw JSON text
            if (formData.metadata) fd.append('metadata', formData.metadata);
        }

        if (formData.image) fd.append('image', formData.image);
        if (formData.rating !== '' && formData.rating !== null && formData.rating !== undefined) {
            fd.append('rating', formData.rating);
        }
        if (currentParent) fd.append('parent_id', currentParent);

        try {
            if (editNode) {
                await exploreService.updateNode(editNode.id, fd);
            } else {
                await exploreService.createNode(fd);
            }
            setShowModal(false);
            loadNodes();
        } catch (err) {
            console.error(err);
            const msg = typeof err === 'object' ? (err.message || JSON.stringify(err)) : err;
            alert('Error saving node: ' + msg);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this node and all its children?')) return;
        try {
            await exploreService.deleteNode(id);
            loadNodes();
        } catch (err) {
            console.error(err);
        }
    };

    const openGallery = async (node) => {
        setShowGalleryModal(node);
        try {
            const res = await exploreService.getNodeDetails(node.slug);
            setGalleryImages(res.gallery_images || []);
        } catch (err) {
            console.error(err);
        }
    };

    const uploadGalleryImages = async (e) => {
        const files = e.target.files;
        if (!files.length) return;
        const fd = new FormData();
        for (let i = 0; i < files.length; i++) {
            fd.append('images[]', files[i]);
        }
        try {
            await exploreService.uploadGallery(showGalleryModal.id, fd);
            const res = await exploreService.getNodeDetails(showGalleryModal.slug);
            setGalleryImages(res.gallery_images || []);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteGalleryImage = async (id) => {
        try {
            await exploreService.deleteGalleryImage(id);
            setGalleryImages(prev => prev.filter(g => g.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const typeOptions = [
        'root', 'group', 'category', 'service_group', 'service_item',
        'gift_item', 'info_section', 'item', 'delivery_partner'
    ];

    const typeBadgeColor = (type) => {
        const colors = {
            root: '#e3f2fd', group: '#e8f5e9', category: '#fff3e0',
            service_group: '#fce4ec', service_item: '#f3e5f5',
            gift_item: '#fff8e1', info_section: '#e0f2f1', item: '#f5f5f5',
            delivery_partner: '#e1f5fe'
        };
        return colors[type] || '#f5f5f5';
    };

    return (
        <div>
            {/* Breadcrumbs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <span
                    onClick={() => setCurrentParent(null)}
                    style={{
                        cursor: 'pointer', color: 'var(--primary)', fontWeight: 600,
                        fontSize: '0.9rem'
                    }}
                >
                    <FolderTree size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    Root
                </span>
                {breadcrumbs.map((crumb, i) => (
                    <React.Fragment key={crumb.id}>
                        <ChevronRight size={14} color="#999" />
                        <span
                            onClick={() => setCurrentParent(crumb.id)}
                            style={{
                                cursor: 'pointer',
                                color: i === breadcrumbs.length - 1 ? '#555' : 'var(--primary)',
                                fontWeight: i === breadcrumbs.length - 1 ? 600 : 500,
                                fontSize: '0.9rem'
                            }}
                        >
                            {crumb.title}
                        </span>
                    </React.Fragment>
                ))}
            </div>

            <div className="card" style={{ padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>Explore Content Manager</h3>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>
                            Manage the hierarchical structure of Event Planning, Gifts, and International Delivery.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {currentParent && (
                            <button
                                onClick={() => {
                                    const parent = breadcrumbs[breadcrumbs.length - 1];
                                    if (breadcrumbs.length <= 1) setCurrentParent(null);
                                    else setCurrentParent(breadcrumbs[breadcrumbs.length - 2].id);
                                }}
                                style={{
                                    background: '#f5f5f5',
                                    color: '#333',
                                    border: '1px solid #ddd',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#efefef'}
                                onMouseLeave={(e) => e.target.style.background = '#f5f5f5'}
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                        )}
                        <button
                            onClick={openCreate}
                            style={{
                                background: 'var(--primary)',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#c9a66f'}
                            onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}
                        >
                            <Plus size={16} /> Add Item
                        </button>

                        {/* Column Manager */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowColumnMenu(!showColumnMenu)}
                                style={{
                                    background: '#f5f5f5',
                                    color: '#333',
                                    border: '1px solid #ddd',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#efefef'}
                                onMouseLeave={(e) => e.target.style.background = '#f5f5f5'}
                            >
                                <Settings size={18} /> Columns
                            </button>

                            {showColumnMenu && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    background: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    minWidth: '300px',
                                    zIndex: 1000,
                                    marginTop: '8px'
                                }}>
                                    <div style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Column Visibility</h4>
                                            <button 
                                                onClick={() => setManageColumns(!manageColumns)}
                                                style={{ 
                                                    background: manageColumns ? 'var(--primary)' : '#f5f5f5', 
                                                    color: manageColumns ? 'white' : '#666',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    padding: '2px 8px',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {manageColumns ? 'Done' : 'Manage'}
                                            </button>
                                        </div>
                                        {columns.map(col => (
                                            <div key={col.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={col.visible}
                                                    onChange={() => handleToggleColumnVisibility(col.id)}
                                                    disabled={!col.editable && col.id !== 'order'}
                                                    style={{ cursor: col.editable || col.id === 'order' ? 'pointer' : 'not-allowed' }}
                                                />
                                                <label style={{ fontSize: '0.85rem', cursor: 'pointer', flex: 1 }}>
                                                    {col.name}
                                                </label>
                                                {manageColumns && col.id !== 'no' && (
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <button
                                                            onClick={() => setEditingColumn(col.id)}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                color: '#666',
                                                                fontSize: '0.9rem',
                                                                padding: '4px'
                                                            }}
                                                            title="Edit Column Name"
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteColumn(col.id)}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                color: '#d00000',
                                                                fontSize: '1rem',
                                                                padding: '4px'
                                                            }}
                                                            title="Delete Column"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 700 }}>Add Column</h4>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <input
                                                type="text"
                                                placeholder="Column name"
                                                value={newColumnName}
                                                onChange={e => setNewColumnName(e.target.value)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px 12px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '0.85rem'
                                                }}
                                            />
                                            <button
                                                onClick={handleAddColumn}
                                                style={{
                                                    background: 'var(--primary)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '8px 12px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    {editingColumn && (
                                        <div style={{ padding: '16px' }}>
                                            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 700 }}>Edit Column</h4>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <input
                                                    type="text"
                                                    placeholder="New column name"
                                                    defaultValue={columns.find(c => c.id === editingColumn)?.name}
                                                    onChange={e => setNewColumnName(e.target.value)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '8px 12px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        fontSize: '0.85rem'
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (newColumnName.trim()) {
                                                            handleUpdateColumnName(editingColumn, newColumnName);
                                                        }
                                                    }}
                                                    style={{
                                                        background: '#4caf50',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '8px 12px',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px' }}>
                        <div className="spinner"></div>
                    </div>
                ) : error ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        background: '#ffebee',
                        borderRadius: '8px',
                        color: '#d00000'
                    }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>❌ Error Loading Content</p>
                        <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>{error}</p>
                        <button
                            onClick={() => loadNodes()}
                            style={{
                                background: '#d00000',
                                color: '#fff',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                ) : nodes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
                        <FolderTree size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                        <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>No content yet</p>
                        <p style={{ fontSize: '0.95rem' }}>Click "Add Item" to create new content</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto', border: '1px solid #e8e8e8', borderRadius: '8px' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '0.9rem'
                        }}>
                            <thead>
                                <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e8e8e8' }}>
                                    {visibleColumns.map(col => (
                                        <th key={col.id} style={{
                                            padding: '16px',
                                            textAlign: col.id === 'no' ? 'center' : 'left',
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            borderRight: '1px solid #e8e8e8',
                                            width: col.width
                                        }}>
                                            {col.name}
                                        </th>
                                    ))}
                                    <th style={{
                                        padding: '16px',
                                        textAlign: 'center',
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        width: '280px'
                                    }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nodes.map((node, idx) => (
                                    <tr
                                        key={node.id}
                                        style={{
                                            borderBottom: '1px solid #e8e8e8',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                                    >
                                        {visibleColumns.map(col => {
                                            const isEditing = editingCell?.nodeId === node.id && editingCell?.colId === col.id;
                                            const canEdit = col.id !== 'no' && col.id !== 'image_path';
                                            const inputStyle = {
                                                width: '100%', padding: '6px 10px',
                                                border: '2px solid var(--primary)', borderRadius: '6px',
                                                fontSize: '0.9rem', outline: 'none',
                                                background: '#fffdf8', boxShadow: '0 0 0 3px rgba(212,163,115,0.15)'
                                            };
                                            return (
                                                <td key={col.id} style={{
                                                    padding: isEditing ? '8px' : '16px',
                                                    color: '#333',
                                                    borderRight: '1px solid #e8e8e8',
                                                    width: col.width,
                                                    cursor: canEdit ? 'pointer' : 'default'
                                                }}
                                                    onDoubleClick={() => canEdit && startEditing(node.id, col.id, getColumnValue(node, col.id))}
                                                    title={canEdit ? 'Double-click to edit' : ''}
                                                >
                                                    {col.id === 'no' && (
                                                        <span style={{ textAlign: 'center', display: 'block' }}>{idx + 1}</span>
                                                    )}
                                                    {col.id === 'title' && (
                                                        isEditing ? (
                                                            <input type="text" value={editingValue} onChange={e => setEditingValue(e.target.value)}
                                                                onKeyDown={onEditKeyDown} onBlur={saveInlineEdit} autoFocus
                                                                style={{ ...inputStyle, fontWeight: 600 }} />
                                                        ) : (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                {node.image_path && (
                                                                    <img src={getFullImageUrl(node.image_path)} alt={node.title}
                                                                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                                                                        onError={(e) => e.target.style.display = 'none'} />
                                                                )}
                                                                <span style={{ fontWeight: 600 }}>{node.title}</span>
                                                            </div>
                                                        )
                                                    )}
                                                    {col.id === 'description' && (
                                                        isEditing ? (
                                                            <input type="text" value={editingValue} onChange={e => setEditingValue(e.target.value)}
                                                                onKeyDown={onEditKeyDown} onBlur={saveInlineEdit} autoFocus style={inputStyle} />
                                                        ) : (
                                                            <span style={{ color: '#666', fontSize: '0.9rem' }}>
                                                                {node.description ? node.description.substring(0, 100) : '-'}
                                                            </span>
                                                        )
                                                    )}
                                                    {col.id === 'image_path' && (
                                                        <div 
                                                            onClick={(e) => { e.stopPropagation(); openGallery(node); }}
                                                            style={{ cursor: 'pointer', position: 'relative' }}
                                                            title="Click to manage gallery"
                                                        >
                                                            {node.image_path ? (
                                                                <img src={getFullImageUrl(node.image_path)} alt={node.title}
                                                                    style={{ width: '140px', height: '90px', borderRadius: '6px', objectFit: 'cover' }}
                                                                    onError={(e) => e.target.style.display = 'none'} />
                                                            ) : (
                                                                <div style={{ width: '140px', height: '90px', borderRadius: '6px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                                                    <ImageIcon size={24} />
                                                                </div>
                                                            )}
                                                            {node.gallery_images && node.gallery_images.length > 0 && (
                                                                <span style={{
                                                                    position: 'absolute', bottom: '6px', right: '6px',
                                                                    background: 'rgba(0,0,0,0.7)', color: '#fff',
                                                                    padding: '2px 8px', borderRadius: '10px',
                                                                    fontSize: '0.7rem', fontWeight: 700
                                                                }}>
                                                                    +{node.gallery_images.length} photos
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    {col.id === 'type' && (
                                                        isEditing ? (
                                                            <select value={editingValue} onChange={e => setEditingValue(e.target.value)}
                                                                onBlur={saveInlineEdit} onKeyDown={onEditKeyDown} autoFocus
                                                                style={{ ...inputStyle, cursor: 'pointer' }}>
                                                                {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                                            </select>
                                                        ) : (
                                                            <span style={{
                                                                padding: '4px 12px', borderRadius: '50px',
                                                                fontSize: '0.75rem', fontWeight: 700,
                                                                background: typeBadgeColor(node.type), color: '#333'
                                                            }}>{node.type}</span>
                                                        )
                                                    )}
                                                    {col.id === 'slug' && (
                                                        isEditing ? (
                                                            <input type="text" value={editingValue} onChange={e => setEditingValue(e.target.value)}
                                                                onKeyDown={onEditKeyDown} onBlur={saveInlineEdit} autoFocus style={inputStyle} />
                                                        ) : (
                                                            <span style={{ color: '#666', fontSize: '0.9rem' }}>{node.slug}</span>
                                                        )
                                                    )}
                                                    {col.id === 'order' && (
                                                        isEditing ? (
                                                            <input type="number" value={editingValue} onChange={e => setEditingValue(e.target.value)}
                                                                onKeyDown={onEditKeyDown} onBlur={saveInlineEdit} autoFocus
                                                                style={{ ...inputStyle, width: '80px', textAlign: 'center' }} />
                                                        ) : (
                                                            <span style={{ color: '#666', fontSize: '0.9rem', textAlign: 'center', display: 'block' }}>
                                                                {node.order_index}
                                                            </span>
                                                        )
                                                    )}
                                                    {col.id === 'rating' && (
                                                        isEditing ? (
                                                            <input type="number" min="0" max="5" step="0.1" value={editingValue}
                                                                onChange={e => setEditingValue(e.target.value)}
                                                                onKeyDown={onEditKeyDown} onBlur={saveInlineEdit} autoFocus
                                                                style={{ ...inputStyle, width: '80px', textAlign: 'center' }} />
                                                        ) : (
                                                            <span style={{ color: '#666', fontSize: '0.9rem' }}>{node.rating || '-'}</span>
                                                        )
                                                    )}
                                                    {!['no', 'title', 'description', 'image_path', 'type', 'slug', 'order', 'rating'].includes(col.id) && (
                                                        isEditing ? (
                                                            <input type="text" value={editingValue} onChange={e => setEditingValue(e.target.value)}
                                                                onKeyDown={onEditKeyDown} onBlur={saveInlineEdit} autoFocus style={inputStyle} />
                                                        ) : (
                                                            <span style={{ color: '#666', fontSize: '0.9rem' }}>
                                                                {getColumnValue(node, col.id) || '-'}
                                                            </span>
                                                        )
                                                    )}
                                                </td>
                                            );
                                        })}
                                        <td style={{
                                            padding: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}>
                                            {!['service_item', 'gift_item', 'item', 'info_section', 'delivery_partner'].includes(node.type) && (
                                                <button
                                                    onClick={() => setCurrentParent(node.id)}
                                                    style={{
                                                        background: '#E8F5E9',
                                                        color: 'var(--primary)',
                                                        border: 'none',
                                                        padding: '6px 12px',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontWeight: 600,
                                                        fontSize: '0.85rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        transition: 'all 0.3s'
                                                    }}
                                                    title="View Children"
                                                    onMouseEnter={(e) => e.target.style.background = '#C8E6C9'}
                                                    onMouseLeave={(e) => e.target.style.background = '#E8F5E9'}
                                                >
                                                    <Eye size={14} /> Children
                                                </button>
                                            )}
                                            <button
                                                onClick={() => openGallery(node)}
                                                style={{
                                                    background: '#F3E5F5',
                                                    color: '#7b1fa2',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontWeight: 600,
                                                    transition: 'all 0.3s'
                                                }}
                                                title="Gallery"
                                                onMouseEnter={(e) => e.target.style.background = '#E1BEE7'}
                                                onMouseLeave={(e) => e.target.style.background = '#F3E5F5'}
                                            >
                                                <ImageIcon size={14} />
                                            </button>
                                            <button
                                                onClick={() => openEdit(node)}
                                                style={{
                                                    background: '#FFF3E0',
                                                    color: 'var(--primary)',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontWeight: 600,
                                                    transition: 'all 0.3s'
                                                }}
                                                title="Edit"
                                                onMouseEnter={(e) => e.target.style.background = '#FFE0B2'}
                                                onMouseLeave={(e) => e.target.style.background = '#FFF3E0'}
                                            >
                                                <Edit3 size={14} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(node.id)}
                                                style={{
                                                    background: '#FFEBEE',
                                                    color: '#d00000',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontWeight: 600,
                                                    transition: 'all 0.3s'
                                                }}
                                                title="Delete"
                                                onMouseEnter={(e) => e.target.style.background = '#FFCDD2'}
                                                onMouseLeave={(e) => e.target.style.background = '#FFEBEE'}
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: '#fff', borderRadius: '20px',
                        padding: '40px', width: '100%', maxWidth: '600px',
                        maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h3>{editNode ? (currentParent ? 'Edit Item' : 'Edit Node') : (currentParent ? 'Create New Item' : 'Create New Node')}</h3>
                            <button onClick={() => setShowModal(false)} style={{
                                background: '#f5f5f5', border: 'none', borderRadius: '50%',
                                width: '36px', height: '36px', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* NAME / TITLE field - always shown */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>{currentParent ? 'Name' : 'Title'} *</label>
                                <input
                                    type="text" className="form-control" required
                                    value={formData.title}
                                    onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                                    placeholder={currentParent ? "e.g. Personal Celebrations" : "e.g. Event Planning & Coordination"}
                                />
                            </div>

                            {/* === ITEM LEVEL FIELDS (inside a parent) === */}
                            {currentParent && (
                                <>
                                    {/* Description field - only shows here if NOT in dynamic columns below */}
                                    {!columns.some(col => col.id === 'description' && col.visible !== false) && (
                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Description</label>
                                            <textarea
                                                className="form-control" rows="3"
                                                value={formData.description}
                                                onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                                                placeholder="Short description..."
                                            ></textarea>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* === TYPE FIELD (Always show so admin can override) === */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Type *</label>
                                <select
                                    className="form-control"
                                    value={formData.type}
                                    onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                                >
                                    {typeOptions.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            {/* === ROOT LEVEL FIELDS === */}
                            {!currentParent && (
                                <>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Content (Detailed)</label>
                                        <textarea
                                            className="form-control" rows="5"
                                            value={formData.content}
                                            onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                                            placeholder="Detailed content for service items..."
                                        ></textarea>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Metadata (JSON)</label>
                                        <textarea
                                            className="form-control" rows="3"
                                            value={formData.metadata}
                                            onChange={e => setFormData(p => ({ ...p, metadata: e.target.value }))}
                                            placeholder='{"whatsapp_number": "+94771234567"}'
                                        ></textarea>
                                    </div>

                                    <div style={{ marginBottom: '28px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Cover Image</label>
                                        <div style={{
                                            border: '2px dashed #ddd', padding: '30px',
                                            borderRadius: '12px', textAlign: 'center',
                                            cursor: 'pointer', position: 'relative'
                                        }}>
                                            <input
                                                type="file" accept="image/*"
                                                onChange={e => setFormData(p => ({ ...p, image: e.target.files[0] }))}
                                                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                            />
                                            <CloudUpload size={32} color="#ccc" style={{ marginBottom: '8px' }} />
                                            <p style={{ color: '#999', fontSize: '0.9rem' }}>
                                                {formData.image ? formData.image.name : 'Click to upload image'}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* === ALL OTHER DYNAMIC FIELDS === */}
                            {currentParent && (
                                <>
                                    {columns
                                        .filter(col => 
                                            col.id !== 'no' && 
                                            col.id !== 'name' && 
                                            col.id !== 'title' && 
                                            col.visible !== false
                                        )
                                        .map(col => (
                                            <div key={col.id} style={{ marginBottom: '20px' }}>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>{col.name}</label>
                                                
                                                {col.id === 'photo' || col.id === 'image_path' ? (
                                                    <div style={{
                                                        border: '2px dashed #ddd', padding: '30px',
                                                        borderRadius: '12px', textAlign: 'center',
                                                        cursor: 'pointer', position: 'relative'
                                                    }}>
                                                        <input
                                                            type="file" accept="image/*"
                                                            onChange={e => setFormData(p => ({ ...p, image: e.target.files[0] }))}
                                                            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                                        />
                                                        {editNode && editNode.image_path && !formData.image ? (
                                                            <div>
                                                                <img src={getFullImageUrl(editNode.image_path)} alt="Current"
                                                                    style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', marginBottom: '8px' }}
                                                                    onError={(e) => e.target.style.display = 'none'} />
                                                                <p style={{ color: '#999', fontSize: '0.85rem' }}>Click to change photo</p>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <CloudUpload size={32} color="#ccc" style={{ marginBottom: '8px' }} />
                                                                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                                                                    {formData.image ? formData.image.name : 'Click to upload photo'}
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                ) : col.id === 'rating' ? (
                                                    <input
                                                        type="number" className="form-control"
                                                        min="0" max="5" step="0.1"
                                                        value={formData.rating || ''}
                                                        onChange={e => setFormData(p => ({ ...p, rating: e.target.value }))}
                                                        placeholder="e.g. 4.5"
                                                    />
                                                ) : col.id === 'description' ? (
                                                    <textarea
                                                        className="form-control" rows="3"
                                                        value={formData.description}
                                                        onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                                                        placeholder="Description..."
                                                    ></textarea>
                                                ) : (
                                                    <input
                                                        type="text" className="form-control"
                                                        value={formData.metadata_vals?.[col.id] || ''}
                                                        onChange={e => setFormData(p => ({ 
                                                            ...p, 
                                                            metadata_vals: { ...p.metadata_vals, [col.id]: e.target.value } 
                                                        }))}
                                                        placeholder={`Enter ${col.name.toLowerCase()}...`}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                </>
                            )}

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
                                {editNode && (
                                    <button 
                                        type="button"
                                        onClick={() => { setShowModal(false); openGallery(editNode); }}
                                        style={{
                                            background: '#F3E5F5',
                                            color: '#7b1fa2',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <ImageIcon size={18} /> Manage Gallery Photos
                                    </button>
                                )}
                                <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
                                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}
                                        style={{ padding: '10px 24px' }}>Cancel</button>
                                    <button type="submit" className="btn btn-primary"
                                        style={{ padding: '10px 24px' }}>
                                        {editNode ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Gallery Modal */}
            {showGalleryModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: '#fff', borderRadius: '20px',
                        padding: '40px', width: '100%', maxWidth: '700px',
                        maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3>Gallery — {showGalleryModal.title}</h3>
                            <button onClick={() => setShowGalleryModal(null)} style={{
                                background: '#f5f5f5', border: 'none', borderRadius: '50%',
                                width: '36px', height: '36px', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Upload */}
                        <div style={{
                            border: '2px dashed #ddd', padding: '24px',
                            borderRadius: '12px', textAlign: 'center',
                            marginBottom: '24px', position: 'relative', cursor: 'pointer'
                        }}>
                            <input
                                type="file" accept="image/*" multiple
                                onChange={uploadGalleryImages}
                                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                            />
                            <CloudUpload size={28} color="#ccc" />
                            <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '8px' }}>Click to upload gallery images</p>
                        </div>

                        {/* Gallery Grid */}
                        {galleryImages.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No gallery images yet.</p>
                        ) : (
                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '12px'
                            }}>
                                {galleryImages.map(img => (
                                    <div key={img.id} style={{
                                        position: 'relative', height: '140px',
                                        borderRadius: '12px', overflow: 'hidden'
                                    }}>
                                        <img src={img.image_path} alt="Gallery"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            onClick={() => deleteGalleryImage(img.id)}
                                            style={{
                                                position: 'absolute', top: '8px', right: '8px',
                                                width: '28px', height: '28px', borderRadius: '50%',
                                                background: 'rgba(198,40,40,0.9)', color: '#fff',
                                                border: 'none', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// ===========================
// DASHBOARD HOME
// ===========================
const DashboardHome = () => (
    <>
        <div style={{
            height: '200px', borderRadius: '24px',
            background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("http://localhost:8000/assets/images/hero_premium.png")',
            backgroundSize: 'cover', backgroundPosition: 'center',
            marginBottom: '40px', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: '0 50px', color: 'white'
        }}>
            <h1 style={{ color: 'white', marginBottom: '10px' }}>Welcome back, Admin!</h1>
            <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Manage your luxury gift deliveries and events with ease.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
            <StatCard label="Total Orders" value="1,284" icon={<ShoppingCart />} color="#e3f2fd" iconColor="#1976d2" />
            <StatCard label="Revenue" value="$42,500" icon={<ChartLine />} color="#e8f5e9" iconColor="#2e7d32" />
            <StatCard label="New Users" value="156" icon={<User />} color="#fff3e0" iconColor="#f57c00" />
            <StatCard label="Happiness Score" value="4.9/5" icon={<Box />} color="#fce4ec" iconColor="#c2185b" />
        </div>

        <div className="card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3>Recent Deliveries</h3>
                <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>View All</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: '#888', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        <th style={{ paddingBottom: 15 }}>Order ID</th>
                        <th style={{ paddingBottom: 15 }}>Recipient</th>
                        <th style={{ paddingBottom: 15 }}>Gift Type</th>
                        <th style={{ paddingBottom: 15 }}>Date</th>
                        <th style={{ paddingBottom: 15 }}>Status</th>
                        <th style={{ paddingBottom: 15 }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <OrderRow id="#HO-5829" rec="Jessica Miller" type="Birthday Special" date="Oct 24, 2026" status="Delivered" />
                    <OrderRow id="#HO-5830" rec="Robert Wilson" type="Wedding Duo" date="Oct 25, 2026" status="In Transit" />
                    <OrderRow id="#HO-5831" rec="Emily Chen" type="Graduation Box" date="Oct 25, 2026" status="Preparing" />
                </tbody>
            </table>
        </div>
    </>
);

// ===========================
// MANAGE FORM (Events / Gifts)
// ===========================
const ManageForm = ({ section, setSection }) => (
    <div className="card" style={{ padding: '30px' }}>
        <h3>Add New {section === 'gifts' ? 'Gift Box' : 'Event'}</h3>
        <form style={{ marginTop: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Name</label>
                    <input type="text" className="form-control" placeholder="e.g. Midnight Surprise" />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Category</label>
                    <select className="form-control">
                        <option>Birthday</option>
                        <option>Wedding</option>
                        <option>Valentine's Day</option>
                        <option>Graduation</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Description</label>
                <textarea className="form-control" rows="3" placeholder="Describe the contents..."></textarea>
            </div>
            <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Upload Images</label>
                <div style={{ border: '2px dashed #ddd', padding: '40px', borderRadius: '12px', textAlign: 'center', color: '#888', cursor: 'pointer' }}>
                    <CloudUpload size={40} style={{ marginBottom: 12, display: 'block', margin: '0 auto' }} />
                    Drag and drop or click to upload
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setSection('dashboard')}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
        </form>
    </div>
);

;




// ===========================
// SETTINGS
// ===========================
const SettingsSection = () => (
    <div className="card" style={{ padding: '30px' }}>
        <h3>Account & System Settings</h3>
        <div style={{ marginTop: '24px', maxWidth: '600px' }}>
            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Store Name</label>
                <input type="text" className="form-control" defaultValue="Happy Box Sri Lanka" />
            </div>
            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Admin Email</label>
                <input type="email" className="form-control" defaultValue="admin@happybox.lk" />
            </div>
            <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Currency</label>
                <select className="form-control">
                    <option>LKR (Rs.)</option>
                    <option>USD ($)</option>
                </select>
            </div>
            <button className="btn btn-primary" style={{ padding: '12px 24px' }}>Update Settings</button>
        </div>
    </div>
);

// ===========================
// SHARED COMPONENTS
// ===========================
const SidebarItem = ({ icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 30px',
            color: active ? 'var(--primary)' : '#666', fontWeight: 500,
            borderLeft: `4px solid ${active ? 'var(--primary)' : 'transparent'}`,
            background: active ? '#fdfaf6' : 'transparent',
            cursor: 'pointer', transition: 'all 0.3s'
        }}
    >
        {icon} <span>{label}</span>
    </div>
);

const StatCard = ({ label, value, icon, color, iconColor }) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '50px', height: '50px', background: color, color: iconColor, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div>
            <h4 style={{ color: '#888', fontSize: '0.85rem' }}>{label}</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</p>
        </div>
    </div>
);

const OrderRow = ({ id, rec, type, date, status }) => (
    <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
        <td style={{ padding: '15px 0' }}>{id}</td>
        <td style={{ padding: '15px 0' }}>{rec}</td>
        <td style={{ padding: '15px 0' }}>{type}</td>
        <td style={{ padding: '15px 0' }}>{date}</td>
        <td style={{ padding: '15px 0' }}>
            <span style={{
                padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600,
                background: status === 'Delivered' ? '#e8f5e9' : status === 'In Transit' ? '#fff8e1' : '#e3f2fd',
                color: status === 'Delivered' ? '#2e7d32' : status === 'In Transit' ? '#f57f17' : '#1976d2'
            }}>{status}</span>
        </td>
        <td style={{ padding: '15px 0' }}><MoreHorizontal size={18} color="#ccc" style={{ cursor: 'pointer' }} /></td>
    </tr>
);

export default Dashboard;
