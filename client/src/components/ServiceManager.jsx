import React, { useState, useEffect } from 'react';
import {
    Plus, Trash2, Edit3, X, Eye, ChevronDown, Settings, Copy
} from 'lucide-react';

const ServiceManager = ({ categoryTitle, categoryId, categorySlug }) => {
    const [items, setItems] = useState([]);

    const [columns, setColumns] = useState([
        { id: 'no', name: 'No', width: '60px', visible: true, editable: false },
        { id: 'name', name: 'Name', width: '250px', visible: true, editable: false },
        { id: 'description', name: 'Description', width: 'auto', visible: true, editable: false },
        { id: 'photo', name: 'Photo', width: '150px', visible: true, editable: false },
        { id: 'rating', name: 'Rating', width: '120px', visible: true, editable: false }
    ]);

    const [editingItem, setEditingItem] = useState(null);
    const [editingColumn, setEditingColumn] = useState(null);
    const [newColumnName, setNewColumnName] = useState('');
    const [showAddItem, setShowAddItem] = useState(false);
    const [formData, setFormData] = useState({});
    const [showColumnMenu, setShowColumnMenu] = useState(false);
    const [manageColumns, setManageColumns] = useState(false);

    // Add new item
    const handleAddItem = () => {
        const newItem = {
            id: Math.max(...items.map(i => i.id), 0) + 1,
            name: formData.name || 'New Item',
            description: formData.description || '',
            photo: formData.photo || '/api/placeholder/200/200',
            rating: formData.rating || 0
        };
        setItems([...items, newItem]);
        setFormData({});
        setShowAddItem(false);
    };

    // Update item
    const handleUpdateItem = () => {
        setItems(items.map(item => item.id === editingItem.id ? { ...editingItem } : item));
        setEditingItem(null);
    };

    // Delete item
    const handleDeleteItem = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    // Add new column
    const handleAddColumn = () => {
        if (!newColumnName.trim()) return;
        const newColumn = {
            id: `col_${Date.now()}`,
            name: newColumnName,
            editable: true,
            visible: true,
            width: '150px'
        };
        setColumns([...columns, newColumn]);
        setNewColumnName('');

        // Add empty value to all items for new column
        setItems(items.map(item => ({ ...item, [newColumn.id]: '' })));
    };

    // Update column name
    const handleUpdateColumnName = (colId, newName) => {
        setColumns(columns.map(col => col.id === colId ? { ...col, name: newName } : col));
        setEditingColumn(null);
    };

    // Delete column
    const handleDeleteColumn = async (colId) => {
        if (colId === 'no') {
            alert('Cannot delete the item index (No.) column');
            return;
        }

        const isDefaultCol = ['photo', 'rating'].includes(colId);
        const msg = isDefaultCol 
            ? `Delete this column GLOBALLY? This will remove "${columns.find(c => c.id === colId)?.name}" from all sections of the application.`
            : 'Delete this column? THIS WILL PERMANENTLY DELETE all data stored in this column for items in this section.';

        if (window.confirm(msg)) {
            const updatedColumns = columns.filter(col => col.id !== colId);
            setColumns(updatedColumns);
            
            // Cleanup data from items locally
            setItems(items.map(item => {
                const newItem = { ...item };
                delete newItem[colId];
                return newItem;
            }));

            // Sync with backend if possible (Note: ServiceManager might need parentId for local sync)
            try {
                // If we have a parent id or slug, we could use exploreService
                // For now, let's at least trigger the global cleanup if default
                if (isDefaultCol) {
                    await exploreService.bulkMetadataCleanup('global', colId, true);
                }
            } catch (err) {
                console.error('Failed to sync column deletion:', err);
            }
        }
    };

    // Toggle column visibility
    const handleToggleColumnVisibility = (colId) => {
        setColumns(columns.map(col => col.id === colId ? { ...col, visible: !col.visible } : col));
    };

    const visibleColumns = columns.filter(col => col.visible);

    return (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>
                        {categoryTitle}
                    </h2>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>Manage services and items for this category</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {/* Add Item Button */}
                    <button
                        onClick={() => setShowAddItem(true)}
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
                        <Plus size={18} /> Add New
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

                        {/* Column Menu Dropdown */}
                        {showColumnMenu && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                background: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                zIndex: 1000,
                                minWidth: '300px',
                                marginTop: '8px'
                            }}>
                                <div style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: '#1a1a1a' }}>
                                            Manage Columns
                                        </h4>
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
                                        <div
                                            key={col.id}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '8px 0',
                                                borderBottom: '1px solid #f5f5f5'
                                            }}
                                        >
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1 }}>
                                                <input
                                                    type="checkbox"
                                                    checked={col.visible}
                                                    onChange={() => handleToggleColumnVisibility(col.id)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <span style={{ fontSize: '0.9rem', color: '#333' }}>{col.name}</span>
                                            </label>
                                            {manageColumns && col.id !== 'no' && (
                                                <button
                                                    onClick={() => handleDeleteColumn(col.id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#d00000',
                                                        cursor: 'pointer',
                                                        padding: '2px 8px'
                                                    }}
                                                    title="Delete Column"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Add Column */}
                                <div style={{ padding: '15px' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', color: '#1a1a1a' }}>
                                        Add New Column
                                    </h4>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="text"
                                            placeholder="Column name..."
                                            value={newColumnName}
                                            onChange={(e) => setNewColumnName(e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: '8px 12px',
                                                border: '1px solid #ddd',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                        <button
                                            onClick={handleAddColumn}
                                            style={{
                                                background: 'var(--primary)',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Item Form */}
            {showAddItem && (
                <div style={{
                    background: '#f9f9f9',
                    border: '1px solid #e8e8e8',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '30px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Add New Item</h3>
                        <button
                            onClick={() => { setShowAddItem(false); setFormData({}); }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                        {visibleColumns.map(col => (
                            <div key={col.id}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px', color: '#333' }}>
                                    {col.name}
                                </label>
                                {col.id === 'photo' ? (
                                    <input
                                        type="file"
                                        onChange={(e) => setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) })}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
                                    />
                                ) : col.id === 'rating' ? (
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        placeholder={col.name}
                                        value={formData[col.id] || ''}
                                        onChange={(e) => setFormData({ ...formData, [col.id]: e.target.value })}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                                    />
                                ) : col.id === 'description' ? (
                                    <textarea
                                        placeholder={col.name}
                                        value={formData[col.id] || ''}
                                        onChange={(e) => setFormData({ ...formData, [col.id]: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            minHeight: '80px',
                                            boxSizing: 'border-box',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={col.name}
                                        value={formData[col.id] || ''}
                                        onChange={(e) => setFormData({ ...formData, [col.id]: e.target.value })}
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => { setShowAddItem(false); setFormData({}); }}
                            style={{
                                background: '#f5f5f5',
                                color: '#333',
                                border: '1px solid #ddd',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddItem}
                            style={{
                                background: 'var(--primary)',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Save Item
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #e8e8e8', borderRadius: '8px' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.9rem'
                }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e8e8e8' }}>
                            {visibleColumns.map(col => (
                                <th
                                    key={col.id}
                                    style={{
                                        padding: '16px',
                                        textAlign: 'left',
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        width: col.width,
                                        borderRight: '1px solid #e8e8e8'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>{col.name}</span>
                                        {col.editable && (
                                            <button
                                                onClick={() => setEditingColumn(col.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#999',
                                                    cursor: 'pointer',
                                                    padding: '2px',
                                                    display: 'flex'
                                                }}
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                        )}
                                    </div>
                                    {editingColumn === col.id && (
                                        <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
                                            <input
                                                type="text"
                                                defaultValue={col.name}
                                                onBlur={(e) => handleUpdateColumnName(col.id, e.target.value)}
                                                autoFocus
                                                style={{
                                                    padding: '4px 8px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '0.85rem',
                                                    flex: 1
                                                }}
                                            />
                                        </div>
                                    )}
                                </th>
                            ))}
                            <th style={{
                                padding: '16px',
                                textAlign: 'center',
                                fontWeight: 700,
                                color: '#1a1a1a',
                                width: '120px'
                            }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={item.id}
                                style={{
                                    borderBottom: '1px solid #e8e8e8',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                            >
                                {visibleColumns.map(col => (
                                    <td
                                        key={col.id}
                                        style={{
                                            padding: '16px',
                                            color: '#555',
                                            borderRight: '1px solid #e8e8e8'
                                        }}
                                    >
                                        {editingItem?.id === item.id ? (
                                            <input
                                                type={col.id === 'rating' ? 'number' : 'text'}
                                                value={editingItem[col.id] || ''}
                                                onChange={(e) => setEditingItem({ ...editingItem, [col.id]: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: '6px',
                                                    border: '1px solid var(--primary)',
                                                    borderRadius: '4px',
                                                    fontSize: '0.9rem',
                                                    boxSizing: 'border-box'
                                                }}
                                            />
                                        ) : col.id === 'no' ? (
                                            <strong>{index + 1}</strong>
                                        ) : col.id === 'photo' ? (
                                            <img src={item[col.id]} alt="Service" style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '6px',
                                                objectFit: 'cover'
                                            }} />
                                        ) : col.id === 'rating' ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span>{'⭐'.repeat(item[col.id] || 0)}</span>
                                                <span style={{ color: '#999' }}>({item[col.id]}/5)</span>
                                            </div>
                                        ) : (
                                            <span>{String(item[col.id] || '').substring(0, 100)}</span>
                                        )}
                                    </td>
                                ))}
                                <td style={{
                                    padding: '16px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    {editingItem?.id === item.id ? (
                                        <>
                                            <button
                                                onClick={handleUpdateItem}
                                                style={{
                                                    background: 'var(--primary)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingItem(null)}
                                                style={{
                                                    background: '#f5f5f5',
                                                    color: '#333',
                                                    border: '1px solid #ddd',
                                                    padding: '6px 12px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditingItem(item)}
                                                style={{
                                                    background: '#fff3e0',
                                                    color: 'var(--primary)',
                                                    border: 'none',
                                                    padding: '6px 10px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                <Edit3 size={14} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteItem(item.id)}
                                                style={{
                                                    background: '#ffebee',
                                                    color: '#d00000',
                                                    border: 'none',
                                                    padding: '6px 10px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {items.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#999'
                }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>No items yet</p>
                    <p style={{ fontSize: '0.95rem' }}>Click "Add New" to create the first item</p>
                </div>
            )}

            {/* Info Box */}
            <div style={{
                marginTop: '30px',
                background: '#e8f5e9',
                border: '1px solid #4caf50',
                borderRadius: '8px',
                padding: '15px 20px',
                color: '#2e7d32',
                fontSize: '0.9rem'
            }}>
                <strong>💡 Tip:</strong> You can add custom columns, edit item details, and manage your service offerings. All changes are saved automatically.
            </div>
        </div>
    );
};

export default ServiceManager;
