import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    ArrowRight, Sparkles, Gift, Globe, ArrowLeft, MessageCircle,
    ChevronRight, CheckCircle2, Image as ImageIcon, MapPin, Users,
    Camera, Music, Mic2, Plane, Hotel, Truck, Star, Heart,
    Calendar, Award, PartyPopper, Building2, Briefcase,
    PenTool, Palette, Layers, Maximize, Droplet, Package,
    ChevronLeft, Bike, Box, Shield
} from 'lucide-react';
import exploreService from '../utils/exploreService';
import giftService from '../utils/giftService';

// Carousel Component
const Carousel = ({ items, renderItem }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const next = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [currentIndex, items.length]);

    if (!items || items.length === 0) return null;

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', overflow: 'hidden', padding: '0 60px' }}>
            <div style={{
                display: 'flex',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(-${currentIndex * 100}%)`
            }}>
                {items.map((item, idx) => (
                    <div key={idx} style={{ minWidth: '100%', padding: '0 15px' }}>
                        {renderItem(item, idx)}
                    </div>
                ))}
            </div>
            
            <button 
                onClick={prev} 
                style={{ 
                    position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', 
                    background: '#fff', border: 'none', borderRadius: '50%', width: '50px', height: '50px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    color: 'var(--primary)', transition: 'all 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            >
                <ChevronLeft size={28} />
            </button>
            
            <button 
                onClick={next} 
                style={{ 
                    position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', 
                    background: '#fff', border: 'none', borderRadius: '50%', width: '50px', height: '50px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    color: 'var(--primary)', transition: 'all 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            >
                <ChevronRight size={28} />
            </button>
            
            <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', marginTop: '20px' }}>
                {items.map((_, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setCurrentIndex(idx)} 
                        style={{ 
                            width: currentIndex === idx ? '24px' : '8px', 
                            height: '8px', 
                            borderRadius: '10px', 
                            background: currentIndex === idx ? 'var(--primary)' : '#ddd', 
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }} 
                    />
                ))}
            </div>
            <div style={{ marginBottom: '60px' }}></div>
        </div>
    );
};

// Sub-slideshow for multiple images within a card
const ImageCarousel = ({ images }) => {
    const [imgIdx, setImgIdx] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setImgIdx((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    if (!images || images.length === 0) return null;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            {images.map((img, idx) => (
                <div 
                    key={idx} 
                    style={{ 
                        position: 'absolute', inset: 0, 
                        opacity: imgIdx === idx ? 1 : 0,
                        transform: `scale(${imgIdx === idx ? 1 : 1.1})`,
                        transition: 'all 1s ease-in-out',
                        zIndex: imgIdx === idx ? 1 : 0
                    }}
                >
                    <img 
                        src={img.image_path || img} 
                        alt="Slide" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </div>
            ))}
            {/* Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)', zIndex: 2 }}></div>
            
            {/* Dots */}
            {images.length > 1 && (
                <div style={{ position: 'absolute', bottom: '15px', left: '20px', display: 'flex', gap: '6px', zIndex: 3 }}>
                    {images.map((_, idx) => (
                        <div 
                            key={idx} 
                            style={{ 
                                width: imgIdx === idx ? '12px' : '6px', height: '6px', 
                                background: 'rgba(255,255,255,0.8)', borderRadius: '10px'
                            }} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Icon mapping for service groups
const serviceGroupIcons = {
    'Guest & Travel Services': Plane,
    'Venue & Setup Services': MapPin,
    'Vendor Coordination': Users,
    'Event Experience Enhancements': Sparkles,
    'Documentation & Media': Camera,
    'Guest Management': Users,
    'Overseas Client Support': Globe,
};

// Icon mapping for event groups
const groupIcons = {
    'Personal Celebrations': Heart,
    'Traditional & Cultural Events': Star,
    'Corporate & Business Events': Briefcase,
};

const ExploreUs = () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000';

    const getFullImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/images')) return path; // Frontend local images
        return `${API_BASE}${path}`;
    };

    const { slug } = useParams();
    const navigate = useNavigate();
    const [node, setNode] = useState(null);
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [animateCards, setAnimateCards] = useState(false);

    useEffect(() => {
        setLoading(true);
        setAnimateCards(false);

        const fetchData = async () => {
            try {
                const data = slug
                    ? await exploreService.getNodeDetails(slug)
                    : await exploreService.getRootSections();
                console.log('API Response:', data);
                setNode(data);
                setTimeout(() => setAnimateCards(true), 100);
            } catch (err) {
                console.error('API Error:', err.message || err);
                setNode([]);
            } finally {
                setLoading(false);
            }
        };

        const fetchGifts = async () => {
            if (slug === 'customized-gift-solutions') {
                try {
                    const data = await giftService.getAll();
                    setGifts(data);
                } catch (err) {
                    console.error('Gifts Fetch Error:', err);
                }
            }
        };

        fetchData();
        fetchGifts();
    }, [slug]);

    if (loading) return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'var(--background)',
            flexDirection: 'column', gap: '20px'
        }}>
            <div className="spinner" style={{ width: '50px', height: '50px' }}></div>
            <p style={{ color: '#999', fontSize: '0.95rem' }}>Loading...</p>
        </div>
    );

    // ===========================
    // ROOT VIEW (3 Main Sections)
    // ===========================
    if (!slug) {
        const rootIcons = [Calendar, Gift, Globe];
        const rootImages = {
            'event-planning-coordination': '/images/WhatsApp%20Image.jpeg',
            'customized-gift-solutions': '/images/WhatsApp%20Image%202026-03-10%20at%2013.06.56.jpeg',
            'personal-shopping-international-delivery': '/images/global.jpeg'
        };
        return (
            <div style={{ marginTop: '80px' }}>
                {/* Hero Header */}
                <header style={{
                    padding: '180px 0',
                    background: 'url("/images/unnamed (3).jpg") center/cover no-repeat',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '70vh',
                    textAlign: 'center'
                }}>
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
                        zIndex: 1
                    }}></div>
                    <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                        <h1 style={{
                            fontSize: '4.5rem', fontWeight: 800, color: '#fff',
                            letterSpacing: '-1px', marginBottom: '20px', lineHeight: 1.1
                        }}>
                            Explore Us
                        </h1>
                        <p style={{
                            maxWidth: '650px', color: 'rgba(255,255,255,0.95)',
                            fontSize: '1.25rem', lineHeight: '1.8', margin: '0 auto'
                        }}>
                            We specialize in creating unforgettable moments through expert event planning, bespoke gifts, and global connectivity.
                        </p>
                    </div>
                </header>

                <section className="section-padding">
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '30px'
                        }}>
                            {Array.isArray(node) && node.map((item, index) => {
                                const Icon = rootIcons[index] || Calendar;
                                const customImage = rootImages[item.slug];
                                return (
                                    <Link
                                        to={`/explore/${item.slug}`}
                                        key={item.id}
                                        className="card"
                                        style={{
                                            padding: '0', overflow: 'hidden', border: 'none',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                                            opacity: animateCards ? 1 : 0,
                                            transform: animateCards ? 'translateY(0)' : 'translateY(30px)',
                                            transition: `all 0.6s ease ${index * 0.15}s`
                                        }}
                                    >
                                        <div style={{
                                            height: '280px', position: 'relative',
                                            background: index === 0 ? 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' :
                                                index === 1 ? 'linear-gradient(135deg, #2d1a0e, #4a2d1a)' :
                                                    'linear-gradient(135deg, #0e1a2d, #1a2d4a)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {(item.image_path || customImage) ? (
                                                <>
                                                    <img src={getFullImageUrl(item.image_path || customImage)} alt={item.title}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
                                                    <div style={{
                                                        position: 'absolute', inset: 0,
                                                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))'
                                                    }}></div>
                                                </>
                                            ) : (
                                                <Icon size={80} color="rgba(212,163,115,0.3)" />
                                            )}
                                            <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
                                                <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 700 }}>{item.title}</h3>
                                            </div>
                                        </div>
                                        <div style={{ padding: '28px 30px' }}>
                                            <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.7', minHeight: '50px' }}>
                                                {item.description}
                                            </p>
                                            <span style={{
                                                color: 'var(--primary)', fontWeight: 600,
                                                display: 'flex', alignItems: 'center', gap: '8px',
                                                fontSize: '0.95rem'
                                            }}>
                                                Explore More <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    const { title, description, children, type, content, gallery_images, metadata, breadcrumbs } = node;

    // Back button
    const BackButton = ({ light = false }) => (
        <button onClick={() => navigate(-1)} style={{
            background: light ? 'rgba(212,163,115,0.15)' : 'rgba(212,163,115,0.1)',
            border: 'none', color: 'var(--primary)',
            padding: '10px 24px', borderRadius: '50px',
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '30px', cursor: 'pointer', fontWeight: 600,
            fontSize: '0.9rem', transition: 'all 0.3s'
        }}>
            <ArrowLeft size={16} /> Back
        </button>
    );

    // ===========================
    // GENERIC SUBCATEGORY VIEW (Weddings, Birthdays, etc.)
    // ===========================
    if (slug && slug !== 'event-planning-coordination' && slug !== 'customized-gift-solutions' && slug !== 'personal-shopping-international-delivery') {
        return (
            <div style={{ marginTop: '80px' }}>
                {/* Header */}
                <header style={{
                    padding: '140px 0 80px',
                    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/unnamed (3).jpg") center/cover no-repeat',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <BackButton light={true} />
                        <h1 style={{
                            fontSize: '4rem', fontWeight: 800, color: '#fff',
                            marginBottom: '16px', lineHeight: 1.1, letterSpacing: '-0.5px',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>{title}</h1>
                        <p style={{
                            fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)',
                            maxWidth: '700px', lineHeight: 1.7,
                            textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                        }}>
                            {description || 'Explore our comprehensive services and options'}
                        </p>
                    </div>
                </header>

                <section className="section-padding">
                    <div className="container">
                        {/* Content Section */}
                        {content && (
                            <div style={{
                                background: '#f9f9f9',
                                padding: '40px',
                                borderRadius: '16px',
                                marginBottom: '60px',
                                lineHeight: '1.8',
                                color: '#555'
                            }}>
                                {content}
                            </div>
                        )}

                        {/* Services/Children List - Table View */}
                        {children && children.length > 0 ? (
                            <div style={{ marginBottom: '60px' }}>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '35px', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
                                    Our Services
                                </h2>
                                <div style={{
                                    overflowX: 'auto',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    border: '1px solid #eee',
                                    background: '#fff'
                                }}>
                                    <table style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        textAlign: 'left',
                                        minWidth: '800px'
                                    }}>
                                        <thead>
                                            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                                                {(metadata?.columns || [
                                                    { id: 'no', name: 'No', width: '60px' },
                                                    { id: 'title', name: 'Name' },
                                                    { id: 'description', name: 'Description' },
                                                    { id: 'image_path', name: 'Photo', width: '150px' },
                                                    { id: 'rating', name: 'Rating', width: '100px' }
                                                ]).filter(c => c.visible !== false).map(col => (
                                                    <th key={col.id} style={{ padding: '20px', fontWeight: 700, color: '#333', width: col.width || 'auto' }}>
                                                        {col.name}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {children.map((service, idx) => {
                                                const isLeaf = ['service_item', 'gift_item', 'item', 'info_section'].includes(service.type);
                                                return (
                                                    <tr
                                                        key={service.id}
                                                        onClick={() => !isLeaf && navigate(`/explore/${service.slug}`)}
                                                        style={{
                                                            borderBottom: '1px solid #eee',
                                                            cursor: isLeaf ? 'default' : 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            background: idx % 2 === 0 ? '#fff' : '#fafafa'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!isLeaf) {
                                                                e.currentTarget.style.background = '#fef9f3';
                                                                e.currentTarget.style.transform = 'scale(1.002)';
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!isLeaf) {
                                                                e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#fafafa';
                                                                e.currentTarget.style.transform = 'scale(1)';
                                                            }
                                                        }}
                                                    >
                                                    {(metadata?.columns || [
                                                        { id: 'no', name: 'No' },
                                                        { id: 'title', name: 'Name' },
                                                        { id: 'description', name: 'Description' },
                                                        { id: 'image_path', name: 'Photo' },
                                                        { id: 'rating', name: 'Rating' }
                                                    ]).filter(c => c.visible !== false).map(col => (
                                                        <td key={col.id} style={{ padding: '20px', verticalAlign: 'middle' }}>
                                                            {col.id === 'no' ? (
                                                                <span style={{ color: '#666', fontWeight: 500 }}>{idx + 1}</span>
                                                            ) : col.id === 'title' ? (
                                                                <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1.05rem' }}>{service.title}</div>
                                                            ) : col.id === 'description' ? (
                                                                <div style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                                                    {service.description || 'Professional services tailored for your needs.'}
                                                                </div>
                                                            ) : col.id === 'image_path' ? (
                                                                service.image_path ? (
                                                                    <div style={{ width: '140px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                                                                        <img src={getFullImageUrl(service.image_path)} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                    </div>
                                                                ) : (
                                                                    <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.85rem' }}>No photo</span>
                                                                )
                                                            ) : col.id === 'rating' ? (
                                                                service.rating ? (
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d4a373', fontWeight: 700 }}>
                                                                        <Star size={16} fill="#d4a373" />
                                                                        <span>{parseFloat(service.rating).toFixed(1)}</span>
                                                                    </div>
                                                                ) : (
                                                                    <span style={{ color: '#ccc', fontSize: '0.85rem' }}>-</span>
                                                                )
                                                            ) : (
                                                                <div style={{ color: '#555', fontSize: '0.95rem' }}>
                                                                    {service.metadata?.[col.id] || '-'}
                                                                </div>
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'center', padding: '60px 20px',
                                background: '#f9f9f9', borderRadius: '14px'
                            }}>
                                <p style={{ color: '#999', fontSize: '1.1rem' }}>No services available yet</p>
                            </div>
                        )}

                        {/* Gallery Section */}
                        {gallery_images && gallery_images.length > 0 && (
                            <div style={{ marginTop: '60px' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '30px', color: '#1a1a1a' }}>
                                    Gallery
                                </h2>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                    gap: '20px'
                                }}>
                                    {gallery_images.map((img, idx) => (
                                        <div
                                            key={img.id}
                                            onClick={() => setSelectedImage(img)}
                                            style={{
                                                cursor: 'pointer',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                height: '280px',
                                                position: 'relative',
                                                transition: 'transform 0.3s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'scale(1.03)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        >
                                            <img src={getFullImageUrl(img.image_path)} alt={`Gallery ${idx}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => e.target.src = '/api/placeholder/300/280'}
                                            />
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: 'rgba(0,0,0,0)',
                                                transition: 'background 0.3s',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                                                    e.currentTarget.querySelector('svg').style.opacity = '1';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'rgba(0,0,0,0)';
                                                    e.currentTarget.querySelector('svg').style.opacity = '0';
                                                }}>
                                                <ImageIcon size={36} color="#fff" style={{ opacity: 0, transition: 'opacity 0.3s' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA Section */}
                        <div style={{
                            marginTop: '80px',
                            padding: '50px',
                            background: 'linear-gradient(135deg, var(--primary) 0%, rgba(212, 163, 115, 0.9) 100%)',
                            borderRadius: '16px',
                            textAlign: 'center',
                            color: '#fff'
                        }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>
                                Ready to make it special?
                            </h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9 }}>
                                Contact us today to discuss your requirements and get a personalized quote.
                            </p>
                            <button style={{
                                background: '#fff',
                                color: 'var(--primary)',
                                padding: '14px 36px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                border: 'none',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                onClick={() => window.location.href = 'https://wa.me/94701234567?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services'}>
                                Contact Us on WhatsApp
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // ===========================
    // EVENT PLANNING ROOT VIEW
    // ===========================
    if (slug === 'event-planning-coordination') {
        return (
            <div style={{ marginTop: '80px' }}>
                {/* Banner with Image Background - Centered Content */}
                <header style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '70vh',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url("/images/unnamed (10).jpg") center/cover no-repeat',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
                        <h1 style={{
                            fontSize: '4.2rem',
                            fontWeight: '900',
                            marginBottom: '20px',
                            lineHeight: '1.1',
                            color: '#fff',
                            letterSpacing: '-0.5px'
                        }}>
                            Events We <span style={{ color: 'rgba(255,255,255,0.9)' }}>Plan</span>
                        </h1>

                        <p style={{
                            fontSize: '1.25rem',
                            color: 'rgba(255,255,255,0.95)',
                            lineHeight: '1.8',
                            fontWeight: '500',
                            marginBottom: '40px'
                        }}>
                            From intimate gatherings to grand celebrations, we plan and coordinate every detail to perfection.
                        </p>

                        <button
                            onClick={() => {
                                const element = document.querySelector('[data-section="categories"]');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                                background: 'linear-gradient(135deg, var(--primary) 0%, rgba(212, 163, 115, 0.9) 100%)',
                                color: '#fff',
                                padding: '14px 36px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: '0 8px 25px rgba(212, 163, 115, 0.3)',
                                width: 'fit-content'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 12px 35px rgba(212, 163, 115, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 163, 115, 0.3)';
                            }}
                        >
                            Explore Categories
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </header>

                <section className="section-padding" data-section="categories">
                    <div className="container">
                        {/* Hardcoded event groups and categories */}
                        {/* Dynamic categories from DB */}
                        {children && children.length > 0 ? (
                            children.map((group, gi) => {
                                const GroupIcon = groupIcons[group.title] || Star;
                                return (
                                    <div key={group.id} style={{
                                        marginBottom: '60px',
                                        opacity: animateCards ? 1 : 0,
                                        transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `all 0.5s ease ${gi * 0.2}s`
                                    }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '16px',
                                            marginBottom: '30px'
                                        }}>
                                            <div style={{
                                                width: '48px', height: '48px',
                                                background: 'var(--secondary)', borderRadius: '14px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <GroupIcon size={22} color="var(--primary)" />
                                            </div>
                                            <div>
                                                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px', marginBottom: '4px' }}>
                                                    {group.title}
                                                </h2>
                                                <p style={{ color: '#777', fontSize: '1.05rem', lineHeight: 1.6 }}>{group.description}</p>
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                            gap: '15px'
                                        }}>
                                            {group.children && group.children.map((cat) => (
                                                <div
                                                    key={cat.id}
                                                    onClick={() => navigate(`/explore/${cat.slug}`)}
                                                    style={{
                                                        display: 'flex', alignItems: 'center',
                                                        padding: '16px 20px', cursor: 'pointer',
                                                        background: '#fff', borderRadius: '12px',
                                                        border: '1px solid #efefef',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                                                        fontSize: '1.05rem', fontWeight: 600, color: '#333'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(-3px) translateX(5px)';
                                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(212,163,115,0.12)';
                                                        e.currentTarget.style.background = '#fff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0) translateX(0)';
                                                        e.currentTarget.style.borderColor = '#efefef';
                                                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
                                                        e.currentTarget.style.background = '#fff';
                                                    }}
                                                >
                                                    <span style={{
                                                        color: 'var(--primary)', marginRight: '14px',
                                                        fontSize: '1.4rem', lineHeight: 1, fontWeight: 900
                                                    }}>•</span>
                                                    <span>{cat.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px', background: '#f9f9f9', borderRadius: '20px' }}>
                                <p style={{ color: '#999', fontSize: '1.1rem' }}>No event categories found. Please add them in the admin dashboard.</p>
                            </div>
                        )}


                    </div>
                </section>
            </div>
        );
    }

    // ===========================
    // CUSTOMIZED GIFT SOLUTIONS VIEW
    // ===========================
    if (slug === 'customized-gift-solutions') {
        const handleWhatsAppSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const text = `*New Custom Gift Request*%0A%0A*Name:* ${formData.get('name')}%0A*Phone:* ${formData.get('phone')}%0A*Budget:* ${formData.get('budget')}%0A*Date:* ${formData.get('date')}%0A*Customizations:* ${formData.get('details')}`;
            window.open(`https://wa.me/94701234567?text=${text}`, '_blank');
        };

        const displayedGifts = gifts.length > 0 ? gifts : [
            { id: 101, name: 'Jimmiki Bouquet Collection', image_path: '/images/unnamed (1).jpg', description: 'Our signature collection.' },
            { id: 102, name: 'Teddy Love Bouquets', image_path: '/images/unnamed.jpg', description: 'Perfect for romance.' },
            { id: 103, name: 'Elegant Flower Bouquets', image_path: '/images/unnamed (1).jpg', description: 'Timeless elegance.' },
            { id: 104, name: 'Surprise Gift Boxes', image_path: '/images/unnamed.jpg', description: 'Crafted with love.' },
            { id: 105, name: 'Customized Photo Frames', image_path: '/images/unnamed (1).jpg', description: 'Preserve memories.' },
            { id: 106, name: 'Anniversary Special Boxes', image_path: '/images/unnamed.jpg', description: 'Celebrate togetherness.' }
        ];

        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 70px',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url("/images/WhatsApp%20Image%202026-03-10%20at%2013.06.56.jpeg") center/cover no-repeat',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: '-20%', right: '-5%',
                        width: '400px', height: '400px',
                        background: 'radial-gradient(circle, rgba(212,163,115,0.15) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}></div>
                    <div className="container" style={{ position: 'relative' }}>
                        <h1 style={{
                            fontSize: '3.5rem', fontWeight: 800, color: '#fff',
                            marginBottom: '16px', lineHeight: 1.1
                        }}>Customized Gift Solutions</h1>
                        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.7 }}>
                            {description || 'Create unique, personalized gifts that tell your story. From custom engraving to bespoke designs, we bring your vision to life.'}
                        </p>
                    </div>
                </header>

                <section className="section-padding" style={{ backgroundColor: '#fafbfc' }}>
                    <div className="container">


                        {/* 2. Gallery Section */}
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#1a1a1a' }}>Our Customized Gifts Collection</h2>
                            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
                                Browse through some of the beautiful, personalized gifts we have created for our clients.
                            </p>
                        </div>
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '24px', marginBottom: '80px'
                        }}>
                            {displayedGifts.map((item, i) => (
                                <div key={item.id || i}>
                                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px', textAlign: 'center' }}>
                                        {item.name || item.caption || 'Custom Gift'}
                                    </p>
                                    <div className="card float-effect" style={{ padding: 0, overflow: 'hidden', height: '300px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                        <img 
                                            src={getFullImageUrl(item.image_path || item.img)} 
                                            alt={item.name || item.caption} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} 
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} 
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} 
                                            onError={(e) => { e.target.src = '/api/placeholder/400/400'; }} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 3. WhatsApp Direct Contact CTA */}
                        <div style={{
                            background: 'linear-gradient(135deg, #E8D4C0 0%, #DBC4B0 100%)',
                            borderRadius: '24px',
                            padding: '50px 60px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                            color: '#1a1a1a',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.1fr',
                            gap: '60px',
                            alignItems: 'center'
                        }}>
                            {/* Left Column - Text & CTA */}
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{
                                    fontSize: '2.8rem',
                                    fontWeight: 800,
                                    marginBottom: '20px',
                                    color: '#1a1a1a',
                                    letterSpacing: '-0.5px',
                                    lineHeight: '1.2'
                                }}>
                                    Have a Unique Idea?
                                </h2>
                                <p style={{
                                    fontSize: '1.1rem',
                                    color: '#666',
                                    marginBottom: '40px',
                                    lineHeight: '1.8',
                                    fontWeight: '500'
                                }}>
                                    Our team is ready to bring your vision to life. Simply reach out to us on WhatsApp and let's discuss your custom gift requirements directly.
                                </p>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '20px',
                                    marginBottom: '40px',
                                    justifyContent: 'center',
                                    maxWidth: '400px',
                                    margin: '0 auto 40px'
                                }}>
                                    <div style={{
                                        background: 'transparent',
                                        padding: '20px 24px',
                                        borderRadius: '16px',
                                        border: '2px solid #ddd'
                                    }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>100+</div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Custom Gifts</div>
                                    </div>
                                    <div style={{
                                        background: 'transparent',
                                        padding: '20px 24px',
                                        borderRadius: '16px',
                                        border: '2px solid #ddd'
                                    }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>98%</div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Satisfaction</div>
                                    </div>
                                </div>

                                <a href={'https://wa.me/94719995559?text=' + encodeURIComponent('Hello HappyBox! I am interested in your customized gift solutions. Could you please help me with a custom gift?')} target="_blank" rel="noopener noreferrer" style={{
                                    background: 'var(--primary)',
                                    color: '#fff',
                                    padding: '16px 44px',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    border: 'none',
                                    borderRadius: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    textDecoration: 'none',
                                    boxShadow: '0 12px 32px rgba(212,163,115,0.3)',
                                    letterSpacing: '0.3px'
                                }}>
                                    <MessageCircle size={20} />
                                    Chat on WhatsApp
                                </a>
                            </div>

                            {/* Right Column - Gift Images Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '16px'
                            }}>
                                {displayedGifts.slice(0, 4).map((item, i) => (
                                    <div key={item.id || i} style={{
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        height: '200px',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                                        opacity: animateCards ? 1 : 0,
                                        transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `all 0.5s ease ${i * 0.1}s`
                                    }}>
                                        <img src={getFullImageUrl(item.image_path || item.img)} alt={item.name || item.caption} style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease'
                                        }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} onError={(e) => { e.target.src = '/api/placeholder/300/300'; }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // ===========================
    // PERSONAL SHOPPING & INTERNATIONAL DELIVERY VIEW
    // ===========================
    if (slug === 'personal-shopping-international-delivery') {
        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 70px',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url("/images/global.jpeg") center/cover no-repeat',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', bottom: '-30%', right: '-10%',
                        width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(212,163,115,0.1) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}></div>
                    <div className="container" style={{ position: 'relative' }}>
                        <h1 style={{
                            fontSize: '3.5rem', fontWeight: 800, color: '#fff',
                            marginBottom: '16px', lineHeight: 1.1
                        }}>Personal Shopping & International Delivery</h1>
                        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.7 }}>
                            {description || 'Your personal shoppers worldwide. We source, purchase, and deliver anything you need from anywhere in the world.'}
                        </p>
                    </div>
                </header>

                <section className="section-padding">
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>What We Do</h2>
                            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
                                For foreigners and international clients, we handle all your shopping needs and ensure safe, reliable delivery worldwide.
                            </p>
                        </div>

                        <div style={{ marginBottom: '80px' }}>
                            {metadata?.display_type === 'slideshow' || slug === 'personal-shopping-international-delivery' ? (
                                <Carousel 
                                    items={(children && children.length > 0) ? children.filter(c => c.type !== 'delivery_partner') : [
                                        { title: 'Custom Shopping', description: 'Personal shoppers source items as per your specifications', image_path: '/api/placeholder/300/200' },
                                        { title: 'Global Sourcing', description: 'Access to markets worldwide for unique finds', image_path: '/api/placeholder/300/200' },
                                        { title: 'Quality Assurance', description: 'Rigorous checking before shipping', image_path: '/api/placeholder/300/200' },
                                        { title: 'Cultural Items', description: 'Authentic local products and specialties', image_path: '/api/placeholder/300/200' },
                                        { title: 'Bulk Purchases', description: 'Large orders handled efficiently', image_path: '/api/placeholder/300/200' },
                                        { title: 'Gift Procurement', description: 'Curated gifts for special occasions', image_path: '/api/placeholder/300/200' }
                                    ]}
                                    renderItem={(item, i) => (
                                        <div style={{
                                            background: '#fff', borderRadius: '24px',
                                            overflow: 'hidden', boxShadow: '0 15px 45px rgba(0,0,0,0.1)',
                                            display: 'grid', gridTemplateColumns: '1fr 1fr',
                                            height: '400px', width: '100%',
                                            animation: 'fadeIn 0.5s ease-out'
                                        }}>
                                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                                {item.gallery_images && item.gallery_images.length > 0 ? (
                                                    <ImageCarousel 
                                                        images={item.gallery_images.map(img => getFullImageUrl(img.image_path))} 
                                                    />
                                                ) : (
                                                    <>
                                                        <img 
                                                            src={getFullImageUrl(item.image_path || item.img)} 
                                                            alt={item.title} 
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                        />
                                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)' }}></div>
                                                    </>
                                                )}
                                            </div>
                                            <div style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <div style={{ width: '40px', height: '4px', background: 'var(--primary)', marginBottom: '24px', borderRadius: '2px' }}></div>
                                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '20px', color: '#1a1a1a', letterSpacing: '-0.5px' }}>{item.title}</h3>
                                                <p style={{ color: '#555', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '30px' }}>
                                                    {item.description || item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                />
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '30px'
                                }}>
                                    {(children && children.length > 0 ? children : [
                                        { title: 'Custom Shopping', description: 'Personal shoppers source items as per your specifications', image_path: '/api/placeholder/300/200' },
                                        { title: 'Global Sourcing', description: 'Access to markets worldwide for unique finds', image_path: '/api/placeholder/300/200' },
                                        { title: 'Quality Assurance', description: 'Rigorous checking before shipping', image_path: '/api/placeholder/300/200' },
                                        { title: 'Cultural Items', description: 'Authentic local products and specialties', image_path: '/api/placeholder/300/200' },
                                        { title: 'Bulk Purchases', description: 'Large orders handled efficiently', image_path: '/api/placeholder/300/200' },
                                        { title: 'Gift Procurement', description: 'Curated gifts for special occasions', image_path: '/api/placeholder/300/200' }
                                    ]).map((item, i) => (
                                        <div key={i} style={{
                                            background: '#fff', borderRadius: '16px',
                                            overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                                            opacity: animateCards ? 1 : 0,
                                            transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                                            transition: `all 0.5s ease ${i * 0.1}s`
                                        }}>
                                            <img src={getFullImageUrl(item.image_path || item.img)} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                            <div style={{ padding: '24px' }}>
                                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
                                                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.description || item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '60px' }}>
                            <div style={{
                                background: '#fff', borderRadius: '24px', padding: '40px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
                                border: '1px solid #f0f0f0',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '40px', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
                                    Delivery Partners & Services
                                </h3>
                                
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                                    gap: '30px',
                                    justifyContent: 'center'
                                }}>
                                    {((children && children.length > 0 && children.some(c => c.type === 'delivery_partner')) 
                                        ? children.filter(c => c.type === 'delivery_partner') 
                                        : [
                                            { title: 'PickMe Flash', icon: <Bike size={32} />, description: 'Instant motorcycle delivery within city limits.' },
                                            { title: 'Uber Connect', icon: <Globe size={32} />, description: 'Real-time tracked parcel sending.' },
                                            { title: 'Pronto', icon: <Truck size={32} />, description: 'Leading island-wide courier with tracking.' },
                                            { title: 'Domex', icon: <Package size={32} />, description: 'Extensive delivery network for all parcel sizes.' }
                                        ]
                                    ).map((p, idx) => (
                                        <div key={idx} style={{ position: 'relative', cursor: 'pointer' }} className="shop-icon-container">
                                            <div 
                                                style={{ 
                                                    background: '#f8f9fa', borderRadius: '24px', padding: '30px',
                                                    border: '1px solid #eee', transition: 'all 0.3s ease',
                                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                                    e.currentTarget.style.boxShadow = '0 12px 25px rgba(212,163,115,0.15)';
                                                    e.currentTarget.style.background = '#fff';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderColor = '#eee';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                    e.currentTarget.style.background = '#f8f9fa';
                                                }}
                                            >
                                                <div style={{ 
                                                    width: '80px', height: '80px', borderRadius: '20px', 
                                                    background: '#fff', border: '1px solid #f0f0f0',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: 'var(--primary)', overflow: 'hidden', padding: p.image_path ? '12px' : '0'
                                                }}>
                                                    {p.image_path ? (
                                                        <img src={getFullImageUrl(p.image_path)} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                    ) : (
                                                        p.icon || <Package size={32} />
                                                    )}
                                                </div>
                                                <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: '1rem' }}>{p.title || p.name}</div>
                                            </div>
                                            
                                            {/* Tooltip detail */}
                                            {(p.description || p.detail) && (
                                                <div className="shop-tooltip" style={{
                                                    position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                                                    background: '#1a1a1a', color: '#fff', padding: '12px 16px', borderRadius: '12px',
                                                    fontSize: '0.8rem', width: '200px', marginBottom: '15px', zIndex: 100,
                                                    opacity: 0, visibility: 'hidden', transition: 'all 0.3s ease',
                                                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)', pointerEvents: 'none',
                                                    textAlign: 'center'
                                                }}>
                                                    <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--primary)' }}>{p.title || p.name}</div>
                                                    <div style={{ lineHeight: 1.4, opacity: 0.9 }}>{p.description || p.detail}</div>
                                                    <div style={{
                                                        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                                                        borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                                                        borderTop: '6px solid #1a1a1a'
                                                    }}></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <style>{`
                            .shop-icon-container:hover .shop-tooltip {
                                opacity: 1;
                                visibility: visible;
                                transform: translateX(-50%) translateY(0);
                            }
                            .shop-tooltip {
                                transform: translateX(-50%) translateY(10px);
                            }
                        `}</style>

                        <div style={{
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                            borderRadius: '24px', padding: '60px', textAlign: 'center',
                            color: '#fff'
                        }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Need Personal Shopping Services?</h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
                                Tell us what you need, and we'll handle the rest. From local specialties to international finds.
                            </p>
                            <button
                                onClick={() => window.open('https://wa.me/94719995559?text=' + encodeURIComponent('Hello HappyBox! I am interested in your personal shopping and international delivery services. Could you please help me?'), '_blank')}
                                style={{
                                    background: 'var(--primary)', color: '#fff', border: 'none',
                                    padding: '16px 40px', borderRadius: '50px', fontSize: '1rem',
                                    fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s',
                                    display: 'inline-flex', alignItems: 'center', gap: '10px'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <MessageCircle size={18} /> Request Services
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // ===========================
    // GROUP VIEW (e.g., Personal Celebrations)
    // ===========================
    if (type === 'group') {
        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 60px',
                    background: 'var(--background)',
                    borderBottom: '1px solid #f0f0f0'
                }}>
                    <div className="container">
                        <BackButton />
                        <h1 style={{
                            fontSize: '3rem', fontWeight: 800,
                            marginBottom: '16px', lineHeight: 1.1
                        }}>{title}</h1>
                        {description && (
                            <p style={{ fontSize: '1.15rem', color: '#666', maxWidth: '600px', lineHeight: 1.7 }}>
                                {description}
                            </p>
                        )}
                    </div>
                </header>

                <section className="section-padding">
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '20px'
                        }}>
                            {children?.map((cat, i) => (
                                <div
                                    key={cat.id}
                                    onClick={() => navigate(`/explore/${cat.slug}`)}
                                    className="card"
                                    style={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '28px 30px', cursor: 'pointer',
                                        background: '#fff', border: '1px solid #f0f0f0',
                                        transition: 'all 0.3s ease',
                                        opacity: animateCards ? 1 : 0,
                                        transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                                        transitionDelay: `${i * 0.08}s`
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateX(8px)';
                                        e.currentTarget.style.borderColor = 'var(--primary-light)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.borderColor = '#f0f0f0';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                                        <div style={{
                                            width: '45px', height: '45px',
                                            background: 'var(--secondary)', borderRadius: '12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <PartyPopper size={20} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{cat.title}</span>
                                            {cat.description && (
                                                <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '4px' }}>
                                                    {cat.description.substring(0, 60)}...
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <ArrowRight size={18} color="#ccc" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // ===========================
    // CATEGORY VIEW (e.g., Weddings) → Shows 7 Service Groups
    // ===========================
    if (type === 'category') {
        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 60px',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url("/images/Gemini_Generated_Image_f8epo5f8epo5f8ep.png") center/cover no-repeat',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: '-20%', right: '-5%',
                        width: '400px', height: '400px',
                        background: 'radial-gradient(circle, rgba(212,163,115,0.12) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}></div>
                    <div className="container" style={{ position: 'relative' }}>
                        <BackButton light />
                        <h1 style={{
                            fontSize: '3rem', fontWeight: 800, color: '#fff',
                            marginBottom: '16px', lineHeight: 1.1
                        }}>{title}</h1>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.7 }}>
                            {description || `Complete event management services for your ${title}.`}
                        </p>
                    </div>
                </header>

                <section className="section-padding">
                    <div className="container">
                        {/* Event Details Section */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '40px',
                            marginBottom: '60px',
                            border: '1px solid #f0f0f0',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
                        }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: '#1a1a1a' }}>
                                {title} Details
                            </h2>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: gallery_images?.length > 0 ? '1fr 1fr' : '1fr',
                                gap: '40px', alignItems: 'start'
                            }}>
                                <div>
                                    <div style={{
                                        color: '#555', fontSize: '1.1rem',
                                        lineHeight: '1.8', marginBottom: '30px'
                                    }}>
                                        {content || `Our ${title} service provides comprehensive event planning and coordination tailored to your specific needs. From initial consultation to the final execution, our experienced team ensures every detail is perfect.`}
                                    </div>

                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#2d2d2d' }}>
                                            Services Included
                                        </h4>
                                        <div style={{ display: 'grid', gap: '12px' }}>
                                            {children?.slice(0, 4).map((service, i) => (
                                                <div key={i} style={{
                                                    display: 'flex', alignItems: 'center', gap: '12px',
                                                    padding: '12px 16px',
                                                    background: '#fdfaf6', borderRadius: '10px',
                                                    border: '1px solid #f0e8de'
                                                }}>
                                                    <CheckCircle2 size={18} color="var(--primary)" />
                                                    <span style={{ fontSize: '0.95rem' }}>{service.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 style={{ fontSize: '1.3rem', marginBottom: '16px', color: '#2d2d2d' }}>
                                            Event Arrangement Explanation
                                        </h4>
                                        <p style={{ color: '#666', lineHeight: '1.7', fontSize: '1rem' }}>
                                            We handle all aspects of your {title} planning, from venue selection and vendor coordination to guest management and day-of execution. Our overseas client support ensures seamless coordination for international guests, while our comprehensive documentation captures every precious moment.
                                        </p>
                                    </div>
                                </div>

                                {/* Gallery Side */}
                                {gallery_images?.length > 0 && (
                                    <div>
                                        <h4 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#2d2d2d' }}>
                                            Related Images
                                        </h4>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '12px'
                                        }}>
                                            {gallery_images.slice(0, 4).map((img, i) => (
                                                <div
                                                    key={img.id}
                                                    onClick={() => setSelectedImage(img.image_path)}
                                                    style={{
                                                        height: '180px', borderRadius: '12px',
                                                        overflow: 'hidden', cursor: 'pointer',
                                                        transition: 'transform 0.3s'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                                >
                                                    <img src={img.image_path} alt={`${title} ${i + 1}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{
                            marginTop: '80px', padding: '60px',
                            borderRadius: '28px',
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                            color: '#fff',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute', top: '-50%', right: '-10%',
                                width: '400px', height: '400px',
                                background: 'radial-gradient(circle, rgba(212,163,115,0.15) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }}></div>
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr auto',
                                gap: '40px', alignItems: 'center', position: 'relative'
                            }}>
                                <div>
                                    <h2 style={{ color: '#fff', marginBottom: '16px', fontSize: '2rem' }}>
                                        Ready to plan your {title}?
                                    </h2>
                                    <p style={{ opacity: 0.6, marginBottom: '30px', fontSize: '1.05rem', lineHeight: 1.7 }}>
                                        Our team handles every detail — from overseas coordination to on-site management. Let us make it unforgettable.
                                    </p>
                                    <Link to="/contact" className="btn btn-primary" style={{ padding: '16px 40px' }}>
                                        Get a Free Quote
                                    </Link>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{
                                        padding: '24px 28px',
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: '16px', textAlign: 'center'
                                    }}>
                                        <h4 style={{ color: 'var(--primary)', marginBottom: '6px', fontSize: '1.8rem' }}>500+</h4>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>Events Planned</p>
                                    </div>
                                    <div style={{
                                        padding: '24px 28px',
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: '16px', textAlign: 'center'
                                    }}>
                                        <h4 style={{ color: 'var(--primary)', marginBottom: '6px', fontSize: '1.8rem' }}>99%</h4>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>Satisfaction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // ===========================
    // SERVICE GROUP VIEW (e.g., Guest & Travel Services)
    // ===========================
    if (type === 'service_group') {
        const SGroupIcon = serviceGroupIcons[title] || CheckCircle2;
        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 60px',
                    background: 'var(--background)',
                    borderBottom: '1px solid #f0f0f0'
                }}>
                    <div className="container">
                        <BackButton />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{
                                width: '60px', height: '60px',
                                background: 'var(--secondary)', borderRadius: '18px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <SGroupIcon size={28} color="var(--primary)" />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.1 }}>{title}</h1>
                                {description && (
                                    <p style={{ color: '#888', fontSize: '1rem', marginTop: '8px' }}>{description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <section className="section-padding">
                    <div className="container">
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#444' }}>Available Services</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '16px'
                        }}>
                            {children?.map((item, i) => (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(`/explore/${item.slug}`)}
                                    style={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '22px 26px', cursor: 'pointer',
                                        background: '#fff', borderRadius: '14px',
                                        border: '1px solid #f0f0f0',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                                        opacity: animateCards ? 1 : 0,
                                        transform: animateCards ? 'translateY(0)' : 'translateY(15px)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateX(8px)';
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(212,163,115,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.borderColor = '#f0f0f0';
                                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{
                                            width: '40px', height: '40px',
                                            background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                            borderRadius: '10px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <CheckCircle2 size={18} color="#2e7d32" />
                                        </div>
                                        <span style={{ fontWeight: 600, fontSize: '1rem' }}>{item.title}</span>
                                    </div>
                                    <ArrowRight size={16} color="#ccc" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // ===========================
    // SERVICE ITEM DETAIL VIEW (Leaf Node)
    // ===========================
    if (type === 'service_item') {
        const highlights = metadata?.highlights || [
            'Professional Coordination', 'Real-time Updates',
            'Premium Equipment', 'Dedicated Support',
            'Quality Guaranteed', '24/7 Availability'
        ];

        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 60px',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url("/images/unnamed (13).jpg") center/cover no-repeat',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: '-30%', left: '50%',
                        width: '600px', height: '600px',
                        background: 'radial-gradient(circle, rgba(212,163,115,0.08) 0%, transparent 70%)',
                        borderRadius: '50%', transform: 'translateX(-50%)'
                    }}></div>
                    <div className="container" style={{ position: 'relative' }}>
                        <BackButton light />
                        <h1 style={{
                            fontSize: '3rem', fontWeight: 800, color: '#fff',
                            marginBottom: '16px', lineHeight: 1.15
                        }}>{title}</h1>
                        {description && (
                            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: 1.7 }}>
                                {description}
                            </p>
                        )}
                    </div>
                </header>

                <section style={{ background: '#0a0a0a', padding: '80px 0 120px' }}>
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: gallery_images?.length > 0 ? '1fr 1fr' : '1fr',
                            gap: '80px', alignItems: 'start'
                        }}>
                            {/* Content Side */}
                            <div>
                                <h2 style={{
                                    color: 'var(--primary)', marginBottom: '24px',
                                    fontSize: '1.8rem', fontWeight: 700
                                }}>
                                    Experience Details
                                </h2>
                                <div style={{
                                    color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem',
                                    lineHeight: '1.9', marginBottom: '50px',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {content || `Our ${title} service ensures a flawless experience tailored to your needs.`}
                                </div>

                                <div style={{ marginBottom: '40px' }}>
                                    <h4 style={{
                                        color: '#fff', marginBottom: '20px',
                                        fontSize: '1.2rem', fontWeight: 600
                                    }}>Service Highlights</h4>
                                    <div style={{ display: 'grid', gap: '14px' }}>
                                        {highlights.map((h, i) => (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'center',
                                                gap: '14px', color: 'rgba(255,255,255,0.55)',
                                                padding: '12px 18px',
                                                background: 'rgba(255,255,255,0.03)',
                                                borderRadius: '10px',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}>
                                                <CheckCircle2 size={18} color="var(--primary)" />
                                                <span style={{ fontSize: '0.95rem' }}>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Link to="/contact" className="btn btn-primary" style={{
                                    padding: '16px 40px', display: 'inline-flex',
                                    alignItems: 'center', gap: '10px'
                                }}>
                                    <MessageCircle size={18} /> Get a Quote
                                </Link>
                            </div>

                            {/* Gallery Side */}
                            {gallery_images?.length > 0 && (
                                <div>
                                    <h2 style={{
                                        color: '#fff', marginBottom: '24px',
                                        fontSize: '1.8rem', fontWeight: 700
                                    }}>Showcase</h2>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '16px'
                                    }}>
                                        {gallery_images.map((img, i) => (
                                            <div
                                                key={img.id}
                                                onClick={() => setSelectedImage(img.image_path)}
                                                style={{
                                                    height: '250px', borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    gridColumn: i === 0 ? 'span 2' : 'span 1',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.3s'
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <img src={img.image_path} alt="Service"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* No gallery fallback */}
                            {(!gallery_images || gallery_images.length === 0) && (
                                <div>
                                    <h2 style={{
                                        color: '#fff', marginBottom: '24px',
                                        fontSize: '1.8rem', fontWeight: 700
                                    }}>Showcase</h2>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '16px'
                                    }}>
                                        <div style={{
                                            height: '250px', borderRadius: '16px',
                                            overflow: 'hidden',
                                            gridColumn: 'span 2',
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            <img src="/images/unnamed (13).jpg" alt="Service Showcase"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{
                                            height: '250px', borderRadius: '16px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            <img src="/images/unnamed (13).jpg" alt="Service Showcase"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{
                                            height: '250px', borderRadius: '16px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            <img src="/images/unnamed (13).jpg" alt="Service Showcase"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Image Lightbox */}
                {selectedImage && (
                    <div
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            background: 'rgba(0,0,0,0.9)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', padding: '40px'
                        }}
                    >
                        <img src={selectedImage} alt="Full view"
                            style={{ maxWidth: '90%', maxHeight: '90vh', borderRadius: '12px', objectFit: 'contain' }} />
                    </div>
                )}
            </div>
        );
    }

    // ===========================
    // CUSTOMIZED GIFT SOLUTIONS
    // ===========================
    if (slug === 'customized-gift-solutions') {
        const customizeOptions = metadata?.customize_options || [
            'Bespoke Jewelry', 'Engraved Accessories', 'Handwritten Notes',
            'Curated Treat Boxes', 'Themed Decorations', 'Event Favors'
        ];

        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 70px',
                    background: 'linear-gradient(135deg, #2d1a0e 0%, #4a2d1a 50%, #2d1a0e 100%)',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: '-30%', right: '-5%',
                        width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(212,163,115,0.15) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}></div>
                    <div className="container" style={{ position: 'relative' }}>
                        <BackButton light />
                        <span className="chip" style={{
                            display: 'inline-block', marginBottom: '20px',
                            background: 'rgba(212,163,115,0.2)', color: 'var(--primary)'
                        }}>Gifts</span>
                        <h1 style={{
                            fontSize: '3.5rem', fontWeight: 800, color: '#fff',
                            marginBottom: '16px', lineHeight: 1.1
                        }}>{title}</h1>
                        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.7 }}>
                            {description}
                        </p>
                    </div>
                </header>

                <section className="section-padding">
                    <div className="container">
                        {/* Gift Gallery */}
                        <div style={{ marginBottom: '80px' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '14px',
                                marginBottom: '40px'
                            }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    background: 'var(--secondary)', borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Gift size={22} color="var(--primary)" />
                                </div>
                                <h2 style={{ fontSize: '2rem' }}>Our Customized Gift Collection</h2>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '24px'
                            }}>
                                {children?.map((gift, i) => (
                                    <div key={gift.id} style={{
                                        background: '#fff', borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                                        transition: 'all 0.4s ease',
                                        opacity: animateCards ? 1 : 0,
                                        transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-6px)';
                                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
                                        }}
                                    >
                                        <div style={{
                                            height: '260px', position: 'relative',
                                            background: `linear-gradient(135deg, ${i % 2 === 0 ? '#fdf3e7' : '#f5e6d3'}, ${i % 2 === 0 ? '#f5e6d3' : '#fdf3e7'})`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {gift.image_path ? (
                                                <img src={gift.image_path} alt={gift.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <Gift size={60} color="rgba(212,163,115,0.3)" />
                                            )}
                                        </div>
                                        <div style={{ padding: '24px' }}>
                                            <h4 style={{ fontSize: '1.15rem', marginBottom: '8px', fontWeight: 700 }}>
                                                {gift.title}
                                            </h4>
                                            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                                {gift.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What We Can Customize */}
                        <div style={{ marginBottom: '80px' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '14px',
                                marginBottom: '40px'
                            }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    background: 'var(--secondary)', borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Sparkles size={22} color="var(--primary)" />
                                </div>
                                <h2 style={{ fontSize: '2rem' }}>What We Can Customize for You</h2>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '16px'
                            }}>
                                {customizeOptions.map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '14px',
                                        padding: '20px 24px',
                                        background: '#fdfaf6', borderRadius: '14px',
                                        border: '1px solid #f0e8de',
                                        transition: 'all 0.3s'
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'var(--primary-light)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = '#f0e8de';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <Sparkles size={18} color="var(--primary)" />
                                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Request Custom Gift CTA */}
                        <div style={{
                            background: 'linear-gradient(135deg, var(--primary) 0%, #c08b5c 100%)',
                            padding: '70px', borderRadius: '32px',
                            textAlign: 'center', color: '#fff',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute', top: '-40%', left: '-10%',
                                width: '300px', height: '300px',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }}></div>
                            <div style={{ position: 'relative' }}>
                                <Gift size={48} style={{ marginBottom: '20px', opacity: 0.9 }} />
                                <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '16px' }}>
                                    Request a Custom Gift
                                </h2>
                                <p style={{
                                    fontSize: '1.15rem', opacity: 0.9,
                                    maxWidth: '550px', margin: '0 auto 40px', lineHeight: 1.7
                                }}>
                                    Share your ideas with us and let's build something special. Our team is ready to assist you on WhatsApp.
                                </p>
                                <a
                                    href={`https://wa.me/${metadata?.whatsapp_number?.replace('+', '')}?text=${encodeURIComponent(metadata?.wa_message || 'Hello! I would like to request a custom gift.')}`}
                                    className="btn"
                                    style={{
                                        background: '#fff', color: 'var(--primary)',
                                        padding: '18px 50px', fontSize: '1.1rem',
                                        display: 'inline-flex', alignItems: 'center', gap: '14px',
                                        fontWeight: 700, boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle size={22} /> Connect on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // ===========================
    // PERSONAL SHOPPING & INTERNATIONAL DELIVERY
    // ===========================
    if (slug === 'personal-shopping-international-delivery') {
        const infoSections = children?.filter(c => c.type === 'info_section') || [];

        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 70px',
                    background: 'linear-gradient(135deg, #0e1a2d 0%, #1a2d4a 50%, #0e1a2d 100%)',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', bottom: '-30%', right: '-5%',
                        width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(212,163,115,0.12) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}></div>
                    <div className="container" style={{ position: 'relative' }}>
                        <BackButton light />
                        <span className="chip" style={{
                            display: 'inline-block', marginBottom: '20px',
                            background: 'rgba(212,163,115,0.2)', color: 'var(--primary)'
                        }}>Global Delivery</span>
                        <h1 style={{
                            fontSize: '3.5rem', fontWeight: 800, color: '#fff',
                            marginBottom: '16px', lineHeight: 1.1
                        }}>{title}</h1>
                        <p style={{
                            fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)',
                            maxWidth: '600px', lineHeight: 1.7
                        }}>
                            {description}
                        </p>
                    </div>
                </header>

                <section className="section-padding">
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 380px',
                            gap: '60px', alignItems: 'start'
                        }}>
                            {/* Info Sections */}
                            <div>
                                {infoSections.map((info, i) => (
                                    <div key={info.id} style={{
                                        marginBottom: '50px',
                                        padding: '40px',
                                        background: '#fff',
                                        borderRadius: '20px',
                                        border: '1px solid #f0f0f0',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                                        opacity: animateCards ? 1 : 0,
                                        transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `all 0.5s ease ${i * 0.15}s`
                                    }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '14px',
                                            marginBottom: '20px'
                                        }}>
                                            <div style={{
                                                width: '40px', height: '40px',
                                                background: 'var(--secondary)', borderRadius: '12px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                {i === 0 ? <Globe size={18} color="var(--primary)" /> :
                                                    i === 1 ? <Truck size={18} color="var(--primary)" /> :
                                                        i === 2 ? <Plane size={18} color="var(--primary)" /> :
                                                            <Star size={18} color="var(--primary)" />}
                                            </div>
                                            <h3 style={{
                                                fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700
                                            }}>{info.title}</h3>
                                        </div>
                                        <div style={{
                                            fontSize: '1.05rem', color: '#555',
                                            lineHeight: '1.9', whiteSpace: 'pre-line'
                                        }}>
                                            {info.content}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Sidebar Card */}
                            <div style={{ position: 'sticky', top: '120px' }}>
                                <div style={{
                                    padding: '40px', background: '#fff',
                                    borderRadius: '24px',
                                    border: '1px solid #f0f0f0',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
                                }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '16px',
                                        marginBottom: '24px'
                                    }}>
                                        <div style={{
                                            width: '56px', height: '56px',
                                            background: 'var(--secondary)', borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Globe size={26} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>International Shipping</h4>
                                            <p style={{ color: '#888', fontSize: '0.9rem' }}>
                                                Powered by {metadata?.delivery_partner || 'Our Partners'}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{
                                        padding: '20px', background: '#fdfaf6',
                                        borderRadius: '14px', marginBottom: '24px'
                                    }}>
                                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px', fontWeight: 500 }}>
                                            Trusted delivery features:
                                        </p>
                                        <ul style={{ display: 'grid', gap: '12px' }}>
                                            {['Secured Packaging', 'Live Tracking', 'Door-to-door Delivery',
                                                'Bulk Order Handling', 'Customs Clearance', '150+ Countries'].map((s, i) => (
                                                    <li key={i} style={{
                                                        display: 'flex', alignItems: 'center',
                                                        gap: '10px', fontSize: '0.88rem'
                                                    }}>
                                                        <CheckCircle2 size={15} color="var(--primary)" /> {s}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    <a
                                        href={`https://wa.me/${metadata?.whatsapp_number?.replace('+', '')}?text=${encodeURIComponent(metadata?.wa_message || 'Hello! I need your delivery service.')}`}
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%', padding: '16px',
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', gap: '10px',
                                            fontSize: '1rem'
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageCircle size={18} /> Request Service
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Fallback for any other type with children
    if (children && children.length > 0) {
        return (
            <div style={{ marginTop: '80px' }}>
                <header style={{
                    padding: '100px 0 60px',
                    background: 'var(--background)',
                    borderBottom: '1px solid #f0f0f0'
                }}>
                    <div className="container">
                        <BackButton />
                        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>{title}</h1>
                        {description && <p style={{ fontSize: '1.15rem', color: '#666', lineHeight: 1.7 }}>{description}</p>}
                    </div>
                </header>
                <section className="section-padding">
                    <div className="container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '20px'
                        }}>
                            {children.map(child => (
                                <div
                                    key={child.id}
                                    onClick={() => navigate(`/explore/${child.slug}`)}
                                    className="card"
                                    style={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '24px 28px', cursor: 'pointer',
                                        border: '1px solid #f0f0f0', transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(8px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{
                                            width: '40px', height: '40px',
                                            background: 'var(--secondary)', borderRadius: '10px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <ChevronRight size={18} color="var(--primary)" />
                                        </div>
                                        <span style={{ fontWeight: 600 }}>{child.title}</span>
                                    </div>
                                    <ArrowRight size={16} color="#ccc" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Fallback when data is not loaded or missing
    return (
        <div style={{ marginTop: '80px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#666' }}>Unable to Load Content</h2>
                <p style={{ color: '#999', marginBottom: '24px' }}>Please check your connection or try again later.</p>
                <button onClick={() => window.location.reload()} style={{
                    padding: '12px 28px',
                    background: 'var(--primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 600
                }}>
                    Refresh Page
                </button>
            </div>
        </div>
    );
};

export default ExploreUs;
