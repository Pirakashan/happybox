import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import exploreService from '../utils/exploreService';
import { ArrowLeft, Maximize2 } from 'lucide-react';

const Gallery = () => {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(null);

    useEffect(() => {
        exploreService.getNodeDetails(slug)
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Loading Gallery...</p>
        </div>
    );

    if (!data) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Gallery not found</div>;

    return (
        <div style={{ marginTop: '80px', backgroundColor: '#111', minHeight: '100vh', color: '#fff' }}>
            {/* Header */}
            <header style={{ padding: '100px 0 60px', textAlign: 'center' }}>
                <div className="container">
                    <Link onClick={() => window.history.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginBottom: '32px' }}>
                        <ArrowLeft size={20} /> Back to Categories
                    </Link>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>{data.name}</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>{data.description}</p>
                    <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '40px auto 0' }}></div>
                </div>
            </header>

            {/* Gallery Grid */}
            <section style={{ padding: '0 0 120px' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '20px',
                        padding: '20px'
                    }}>
                        {data.gallery && data.gallery.length > 0 ? (
                            data.gallery.map((item, i) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedImg(item.image_path)}
                                    style={{
                                        position: 'relative',
                                        height: '450px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.querySelector('.overlay').style.opacity = 1;
                                        e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.querySelector('.overlay').style.opacity = 0;
                                        e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                                    }}
                                >
                                    <img
                                        src={item.full_image_url}
                                        alt={`Gallery ${i}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
                                    />
                                    <div className="overlay" style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0,0,0,0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0,
                                        transition: 'opacity 0.3s'
                                    }}>
                                        <div style={{
                                            padding: '16px',
                                            borderRadius: '50%',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            background: 'rgba(0,0,0,0.2)'
                                        }}>
                                            <Maximize2 size={24} color="#fff" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '100px', color: 'rgba(255,255,255,0.3)' }}>
                                <h3>No showcase images available yet.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Lightbox / Modal */}
            {selectedImg && (
                <div
                    onClick={() => setSelectedImg(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.95)',
                        zIndex: 3000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px'
                    }}
                >
                    <img
                        src={selectedImg}
                        style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                        alt="Preview"
                    />
                    <div style={{ position: 'absolute', top: '40px', right: '40px', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>&times;</div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
