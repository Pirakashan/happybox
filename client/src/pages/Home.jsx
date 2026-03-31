import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Star, Quote } from 'lucide-react';
import exploreService from '../utils/exploreService';


const Home = () => {
  const [categories, setCategories] = useState([]);

  const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace('/api', '');

  useEffect(() => {
    // Reveal animation logic
    const sections = document.querySelectorAll('.section-padding, .hero-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(sec => observer.observe(sec));

    // Fetch main categories for the "Celebrate" section
    exploreService.getRootSections()
      .then(res => setCategories((Array.isArray(res) ? res : res.data || []).slice(0, 3)))
      .catch(err => console.error(err));



    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '100px 0 60px', background: '#fafafa' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '80px' }}>
          <div className="hero-text animate-fade-in" style={{ opacity: 1 }}>
            <h1 style={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: '1.2', marginBottom: '24px', color: '#1a1a1a', letterSpacing: '-0.5px' }}>
              Turn Your<br />Moments<br />Into Magic<br />with <span style={{ color: 'var(--primary)', fontWeight: 700 }}>HappyBox.lk</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#555', marginBottom: '40px', maxWidth: '500px', lineHeight: '1.7', fontWeight: 500 }}>
              We specialize in complete event planning, customized gift solutions, and reliable personal shopping services. Whether you are in Sri Lanka or living abroad, our team manages every detail with care and professionalism — ensuring seamless experiences and meaningful celebrations.
            </p>
            <div className="hero-btns" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link to="/events" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: '50px', fontWeight: 600 }}>Explore Us</Link>
              <Link to="/about" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: '50px', fontWeight: 600, color: 'var(--primary)', border: '2px solid var(--primary)', background: 'transparent' }}>Learn More</Link>
            </div>
          </div>
          <div className="hero-image-container" style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
              background: '#fff'
            }}>
              <img
                src="http://localhost:8000/assets/images/hero_premium.png"
                alt="Premium Happy Box"
                style={{ width: '100%', display: 'block', borderRadius: '28px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Our Core Services</h2>
            <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>From event planning to international delivery, we handle everything with care.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {categories.map((cat) => (
              <EventItem
                key={cat.id}
                title={cat.title}
                img={cat.image_path}
                desc={cat.description}
                slug={cat.slug}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/events" className="btn btn-primary">Explore Us</Link>
          </div>
        </div>
      </section>





    </div>
  );
};

const EventItem = ({ title, img, desc, slug }) => {
  const customImages = {
    'event-planning-coordination': '/images/WhatsApp Image.jpeg',
    'customized-gift-solutions': '/images/WhatsApp Image 2026-03-10 at 13.06.56.jpeg',
    'personal-shopping-international-delivery': '/images/global.jpeg'
  };

  const displayImg = img || customImages[slug] || '/api/placeholder/400/300';

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ height: '250px', overflow: 'hidden' }}>
        <img src={displayImg} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '12px' }}>{title}</h3>
        <p style={{ color: '#666', marginBottom: '24px', fontSize: '0.95rem' }}>{desc}</p>
        <Link to={`/explore/${slug}`} className="btn btn-outline" style={{ width: '100%' }}>Explore More</Link>
      </div>
    </div>
  );
};



export default Home;
