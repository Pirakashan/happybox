import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Music2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 'bold' }}>Happy Box</h2>
            <p>Delivering happiness wrapped in love. We are dedicated to making every occasion a memory that lasts forever.</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61578348689564&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/happybox.lk_?igsh=NWcybnV4aHpmeG9t" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={18} /></a>
              <a href="https://www.tiktok.com/@happybox.lk?_r=1&_t=ZS-94mYfBKSt88" target="_blank" rel="noopener noreferrer" className="social-icon"><Music2 size={18} /></a>
            </div>
          </div>
          <div className="footer-links">
            <h4 style={{ fontFamily: 'Outfit' }}>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/about">About us </Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4 style={{ fontFamily: 'Outfit' }}>Gift Occasions</h4>
            <ul>
              <li><Link to="/events/birthday">Birthdays</Link></li>
              <li><Link to="/events/wedding">Weddings</Link></li>
              <li><Link to="/events/valentine">Valentine's Day</Link></li>
              <li><Link to="/events/graduation">Graduations</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4 style={{ fontFamily: 'Outfit' }}>Contact Support</h4>
            <ul>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} /> happyboxlanka@gmail.com
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} /> +94 11 234 5678
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} /> Raja street, Atchuvely, Jaffna
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Happy Box Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
