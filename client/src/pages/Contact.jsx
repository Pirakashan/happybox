import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendMessage = (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        // Format the message for WhatsApp
        const whatsappMessage = `Hello HappyBox,\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;

        // WhatsApp Business number for HappyBox
        const phoneNumber = '94719995559'; // WhatsApp compatible format

        // Open WhatsApp Web with pre-filled message
        const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Reset form
        setFormData({
            fullName: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div style={{ marginTop: '80px' }}>
            <header style={{ 
                padding: '120px 0', 
                background: 'url("http://localhost:8000/assets/images/contact_banner.png") center/cover no-repeat',
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
                    <span className="chip" style={{ marginBottom: '20px', display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>Contact Us</span>
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '24px', color: '#fff', letterSpacing: '-1px', fontWeight: 800 }}>Get in Touch</h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontSize: '1.25rem', lineHeight: '1.8', margin: '0' }}>Have questions? We're here to help you spread the joy.</p>
                </div>
            </header>

            <section className="section-padding" style={{ padding: '80px 0 100px', backgroundColor: '#fafbfc' }}>
                <div className="container">
                    {/* Caption Section */}
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#1a1a1a' }}>We'd Love to Hear From You</h2>
                        <p style={{ color: '#666', fontSize: '1.15rem', lineHeight: '1.8' }}>
                            Whether you need help planning your next big event, finding the perfect customized gift, or managing arrangements from overseas, our dedicated team is just a message away. Let's make something amazing together!
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '60px', alignItems: 'start' }}>
                        <div className="card" style={{ padding: '50px', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ marginBottom: '32px' }}>Send us a Message</h2>
                            <form onSubmit={handleSendMessage}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Full Name" 
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Email Address" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Subject" 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '24px' }} 
                                    required
                                />
                                <textarea 
                                    className="form-control" 
                                    rows="6" 
                                    placeholder="Message" 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    style={{ marginBottom: '32px' }}
                                    required
                                ></textarea>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Send Message</button>
                            </form>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{ borderRadius: '24px', overflow: 'hidden', height: '300px', marginBottom: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                                <img
                                    src="http://localhost:8000/assets/images/about_team.png"
                                    alt="Expert Support"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="contact-info">
                                <InfoCard icon={<MapPin size={24} />} title="Address" desc="Raja street, Atchuvely, Jaffna" color="#f8f9fa" iconColor="var(--primary)" />
                                <InfoCard icon={<Phone size={24} />} title="Phone Number" desc="+94 11 234 5678" color="#f8f9fa" iconColor="var(--primary)" />
                                <InfoCard icon={<Mail size={24} />} title="Email Address" desc="happyboxlanka@gmail.com" color="#f8f9fa" iconColor="var(--primary)" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const InfoCard = ({ icon, title, desc, color, iconColor }) => (
    <div className="card" style={{ padding: '40px', marginBottom: '30px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ width: '50px', height: '50px', background: color, color: iconColor, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div>
                <h3 style={{ marginBottom: '8px' }}>{title}</h3>
                <p style={{ color: '#666' }}>{desc}</p>
            </div>
        </div>
    </div>
);

export default Contact;
