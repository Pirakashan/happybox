import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, LayoutGrid } from 'lucide-react';

const SubCategories = () => {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/explore/sub-categories/${slug}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Loading Collections...</p>
        </div>
    );

    if (!data) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Category not found</div>;

    return (
        <div style={{ marginTop: '80px', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{ padding: '80px 0 60px', backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' }}>
                <div className="container">
                    <Link to="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600, marginBottom: '32px' }}>
                        <ArrowLeft size={20} /> Back to Explore
                    </Link>
                    <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '24px' }}>{data.main.name}</h1>
                    <p style={{ color: '#666', fontSize: '1.2rem', maxWidth: '800px', lineHeight: '1.7' }}>{data.main.description}</p>
                </div>
            </header>

            {/* Subcategories Grid */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
                        {data.subs.map((sub, index) => (
                            <div
                                key={sub.id}
                                className="card animate-fade-in"
                                style={{
                                    padding: '40px',
                                    display: 'grid',
                                    gridTemplateColumns: '400px 1fr',
                                    gap: '60px',
                                    alignItems: 'start',
                                    borderRadius: '32px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #f0f0f0'
                                }}
                            >
                                <div style={{ borderRadius: '24px', overflow: 'hidden', height: '300px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                    <img
                                        src={sub.image_path}
                                        alt={sub.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#1a1a1a' }}>{sub.name}</h2>
                                    <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '32px' }}>{sub.description}</p>

                                    <div style={{ marginBottom: '40px' }}>
                                        <p style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '16px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Related Concepts</p>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            {[1, 2, 3].map(i => (
                                                <div key={i} style={{ width: '100px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#f5f5f5' }}>
                                                    <img src={sub.image_path} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="Rel" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        to={`/gallery/${sub.slug}`}
                                        className="btn btn-primary"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '14px 32px'
                                        }}
                                    >
                                        <LayoutGrid size={20} /> View Full Gallery
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SubCategories;
