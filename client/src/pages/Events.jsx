import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'birthday', title: 'Birthday', img: 'file:///C:/Users/Asus/.gemini/antigravity/brain/9ec46643-4154-4a9d-85b4-b960a63f3fc0/event_birthday_1772090972450.png', desc: 'Curated birthday surprises filled with joy.' },
  { id: 'wedding', title: 'Wedding', img: 'file:///C:/Users/Asus/.gemini/antigravity/brain/9ec46643-4154-4a9d-85b4-b960a63f3fc0/event_wedding_1772091008964.png', desc: 'Elegant and timeless gifts for couples.' },
  { id: 'valentine', title: "Valentine's Day", img: 'file:///C:/Users/Asus/.gemini/antigravity/brain/9ec46643-4154-4a9d-85b4-b960a63f3fc0/event_valentine_full_1772091338809.png', desc: 'Express your feelings with luxury treats.' },
  { id: 'graduation', title: 'Graduation Day', img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000', desc: 'Congratulate the graduate with style.' },
  { id: 'surprise', title: 'Surprise Delivery', img: 'https://images.unsplash.com/photo-1512909006721-3d6018887183?q=80&w=2000', desc: 'Unpredictable happiness delivered home.' },
  { id: 'corporate', title: 'Corporate Gifting', img: 'https://images.unsplash.com/photo-1511149755252-b5058c0c39ed?q=80&w=2000', desc: 'Appreciating partnerships with luxury.' },
];

const eventGroups = [
  {
    title: 'Personal Celebrations',
    items: ['Weddings', 'Engagement Ceremonies', 'Birthdays (Kids & Adults)', 'Anniversaries', 'Surprise Parties', 'Private Parties', 'Proposal Setups']
  },
  {
    title: 'Traditional & Cultural Events',
    items: ['Puberty Ceremonies', 'House Opening / Housewarming', 'Religious Ceremonies', 'Family Get-Togethers']
  },
  {
    title: 'Corporate & Business Events',
    items: ['Shop Openings', 'Business Launches', 'Annual Meetings', 'Corporate Parties', 'Award Ceremonies', 'Conferences & Seminars']
  }
];

const Events = () => {
  return (
    <div style={{ marginTop: '80px' }}>
      <header style={{ padding: '80px 0', backgroundColor: 'var(--secondary)', textAlign: 'center' }}>
        <div className="container animate-fade-in">
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Events We Plan</h1>
          <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Plan unforgettable events with our expert services.</p>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {categories.map((cat) => (
              <div key={cat.id} className="card event-card" style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ height: '300px', position: 'relative' }}>
                  <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '30px' }}>
                  <h2 style={{ marginBottom: '12px' }}>{cat.title}</h2>
                  <p style={{ color: '#666', marginBottom: '24px', fontSize: '1rem' }}>{cat.desc}</p>
                  <Link to={cat.id === 'birthday' ? '/events-we-plan' : `/events/${cat.id}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>{cat.id === 'birthday' ? 'View Events' : 'View Gifts'}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events-we-plan" className="section-padding" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Events We Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {eventGroups.map((group) => (
              <div key={group.title} className="card" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>{group.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {group.items.map((item) => (
                    <li key={item} style={{ marginBottom: '10px', fontSize: '1rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
