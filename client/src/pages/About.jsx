import React from 'react';
import { Target, Eye, ShieldCheck, Zap, Heart, Leaf, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div style={{ marginTop: '80px' }}>
      <header style={{ 
        padding: '120px 0', 
        background: 'url("http://localhost:8000/assets/images/about_banner.png") center/cover no-repeat',
        position: 'relative',
        minHeight: '45vh',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1
        }}></div>
        <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 2 }}>
          <span className="chip" style={{ marginBottom: '20px', display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>About Us</span>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '24px', color: '#fff', letterSpacing: '-1px', fontWeight: 800 }}>HappyBox.lk</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '650px', fontSize: '1.25rem', lineHeight: '1.8', margin: '0' }}>
            A Sri Lanka–based event planning and customized gifting company dedicated to creating meaningful celebrations and reliable service experiences.
          </p>
        </div>
      </header>

      <section className="section-padding" style={{ backgroundColor: '#fff', position: 'relative' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div className="intro-image-container" style={{ position: 'relative' }}>
            <div style={{ borderRadius: '40px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
              <img
                src="http://localhost:8000/assets/images/event_planning.png"
                alt="HappyBox Event Planning"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
          <div className="intro-text">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Who We Are</h2>
            <p style={{ color: '#666', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
              We serve both clients within Sri Lanka and Sri Lankans living abroad who wish to organize events, send gifts, or manage special arrangements from overseas. Our focus is simple: deliver quality, trust, and memorable moments.
            </p>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px', marginTop: '40px' }}>Our Story</h2>
            <p style={{ color: '#666', marginBottom: '16px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              HappyBox.lk was founded with the vision of connecting people across distances. We recognized that many Sri Lankans living abroad wanted a trusted team in Sri Lanka to manage their family events, celebrations, and important purchases with professionalism and care.
            </p>
            <p style={{ color: '#666', marginBottom: '24px', fontSize: '1.05rem', lineHeight: '1.8' }}>
              From intimate birthday surprises to large-scale events and personal shopping services, we built our company around reliability, transparency, and attention to detail.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#fafbfc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div className="card" style={{ padding: '50px', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--primary)' }}>
              <Target size={40} color="var(--primary)" style={{ marginBottom: '24px' }} />
              <h2 style={{ marginBottom: '16px' }}>Our Mission</h2>
              <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.6' }}>
                To provide seamless event planning, customized gift solutions, and dependable purchase & delivery services that bring families and loved ones closer — no matter where they are in the world.
              </p>
            </div>
            <div className="card" style={{ padding: '50px', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--accent)' }}>
              <Eye size={40} color="var(--accent)" style={{ marginBottom: '24px' }} />
              <h2 style={{ marginBottom: '16px' }}>Our Vision</h2>
              <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.6' }}>
                To become a trusted and recognized brand in Sri Lanka for event management and overseas coordination services, delivering excellence through professionalism, creativity, and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>What Makes Us Different</h2>
            <p style={{ color: '#666' }}>We focus on professionalism, creativity, and integrity in every task.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              "Personalized service tailored to each client",
              "Strong local vendor network",
              "Transparent communication and updates",
              "Support for international clients",
              "End-to-end event coordination",
              "Secure and reliable purchasing & delivery",
              "Commitment to quality and punctuality"
            ].map((item, index) => (
              <div key={index} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'white' }}>
                <CheckCircle size={24} color="var(--primary)" />
                <span style={{ fontWeight: 500, color: '#444' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
