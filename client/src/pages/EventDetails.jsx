import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const eventConfig = {
    birthday: {
        title: 'Birthday Collection',
        desc: 'Make their big day even brighter with our curated birthday surprises.',
        img: 'file:///C:/Users/Asus/.gemini/antigravity/brain/9ec46643-4154-4a9d-85b4-b960a63f3fc0/event_birthday_1772090972450.png'
    },
    wedding: {
        title: 'Wedding Collection',
        desc: 'Elegant and graceful gift choices for the newly married couple.',
        img: 'file:///C:/Users/Asus/.gemini/antigravity/brain/9ec46643-4154-4a9d-85b4-b960a63f3fc0/event_wedding_1772091008964.png'
    },
    valentine: {
        title: "Valentine's Collection",
        desc: 'Express your deepest feelings with our romantic Valentine boxes.',
        img: 'file:///C:/Users/Asus/.gemini/antigravity/brain/9ec46643-4154-4a9d-85b4-b960a63f3fc0/event_valentine_full_1772091338809.png'
    },
    graduation: {
        title: 'Graduation Day',
        desc: 'Congratulate the new graduate with style and sophistication.',
        img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000'
    },
    surprise: {
        title: 'Surprise Delivery',
        desc: 'Unpredictable joy delivered right to their doorstep.',
        img: 'https://images.unsplash.com/photo-1512909006721-3d6018887183?q=80&w=2000'
    },
    corporate: {
        title: 'Corporate Gifting',
        desc: 'Professional excellence in every appreciation box.',
        img: 'https://images.unsplash.com/photo-1511149755252-b5058c0c39ed?q=80&w=2000'
    }
};

const EventDetails = () => {
    const { type } = useParams();
    const currentEvent = eventConfig[type] || eventConfig.birthday;
    
    const [formData, setFormData] = useState({
        date: '',
        time: 'Morning (9 AM - 12 PM)',
        message: '',
        recipient: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Happiness is on its way! Thank you for choosing Happy Box (React Version).');
        console.log(formData);
    };

    const scrollToOrder = () => {
        document.getElementById('order-section').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ marginTop: '80px' }}>
            {/* Event Banner */}
            <section style={{ height: '400px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img 
                    src={currentEvent.img} 
                    alt={currentEvent.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: -1 }} 
                />
                <div style={{ background: 'rgba(0,0,0,0.4)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>
                <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                    <h1 style={{ fontSize: '4rem', marginBottom: '16px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{currentEvent.title}</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>{currentEvent.desc}</p>
                </div>
            </section>

            {/* Gift Gallery */}
            <section className="section-padding">
                <div className="container">
                    <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>Pick Your Happy Box</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        <GiftCard 
                            name="The Luxury Treat" 
                            price="35.00" 
                            desc="Premium artisan chocolates and personalized card." 
                            img="file:///C:/Users/Asus/.gemini/antigravity/brain/9ec46643-4154-4a9d-85b4-b960a63f3fc0/gift_set_1_1772091074588.png" 
                            onClick={scrollToOrder}
                        />
                        <GiftCard name="Golden Elegance" price="55.00" desc="Gold-themed accessories and organic candles." img="https://images.unsplash.com/photo-1549465220-1d8c9d9c6703?q=80&w=2000" onClick={scrollToOrder} />
                        <GiftCard name="Sweet Serenity" price="42.00" desc="Comfort items and premium sweets for relaxing." img="https://images.unsplash.com/photo-1549467793-ee6a4ad688b1?q=80&w=2000" onClick={scrollToOrder} />
                        <GiftCard name="Signature Box" price="65.00" desc="Our most popular box with a mix of best sellers." img="https://images.unsplash.com/photo-1511149755252-b5058c0c39ed?q=80&w=2000" onClick={scrollToOrder} />
                    </div>
                </div>
            </section>

            {/* Order Form */}
            <section id="order-section" className="section-padding" style={{ backgroundColor: 'var(--secondary)' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="card" style={{ padding: '50px' }}>
                        <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Confirm Your Surprise</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div className="form-group">
                                    <label>Delivery Date</label>
                                    <input type="date" name="date" className="form-control" required value={formData.date} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Preferred Time</label>
                                    <select name="time" className="form-control" value={formData.time} onChange={handleInputChange}>
                                        <option>Morning (9 AM - 12 PM)</option>
                                        <option>Afternoon (1 PM - 5 PM)</option>
                                        <option>Evening (6 PM - 9 PM)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Surprise Message (Optional)</label>
                                <textarea name="message" className="form-control" rows="4" placeholder="Write a heartfelt note..." value={formData.message} onChange={handleInputChange}></textarea>
                            </div>

                            <h3 style={{ margin: '40px 0 24px', paddingTop: '20px', borderTop: '1px solid #eee' }}>Delivery Address</h3>
                            
                            <div className="form-group">
                                <label>Recipient Name</label>
                                <input type="text" name="recipient" className="form-control" placeholder="Who is receiving?" required value={formData.recipient} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Street Address</label>
                                <input type="text" name="address" className="form-control" placeholder="Street name" required value={formData.address} onChange={handleInputChange} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                                <input type="text" name="city" className="form-control" placeholder="City" required value={formData.city} onChange={handleInputChange} />
                                <input type="text" name="state" className="form-control" placeholder="State" required value={formData.state} onChange={handleInputChange} />
                                <input type="text" name="zip" className="form-control" placeholder="Zip" required value={formData.zip} onChange={handleInputChange} />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem', marginTop: '30px' }}>Place Your Order</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

const GiftCard = ({ name, price, desc, img, onClick }) => (
    <div className="card" style={{ padding: '24px' }}>
        <div style={{ background: 'var(--background)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '24px', height: '200px' }}>
            <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h3 style={{ marginBottom: '8px' }}>{name}</h3>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>{desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)' }}>${price}</span>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={onClick}>Order Now</button>
        </div>
    </div>
);

export default EventDetails;
