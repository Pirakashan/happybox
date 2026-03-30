import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Briefcase, ChevronRight, Sparkles } from 'lucide-react';

const eventGroups = [
  {
    title: 'Personal Celebrations',
    icon: Heart,
    items: [
      'Weddings',
      'Engagement Ceremonies',
      'Birthdays (Kids & Adults)',
      'Anniversaries',
      'Surprise Parties',
      'Private Parties',
      'Proposal Setups'
    ]
  },
  {
    title: 'Traditional & Cultural Events',
    icon: Star,
    items: [
      'Puberty Ceremonies',
      'House Opening / Housewarming',
      'Religious Ceremonies',
      'Family Get-Togethers'
    ]
  },
  {
    title: 'Corporate & Business Events',
    icon: Briefcase,
    items: [
      'Shop Openings',
      'Business Launches',
      'Annual Meetings',
      'Corporate Parties',
      'Award Ceremonies',
      'Conferences & Seminars'
    ]
  }
];

const EventsWePlan = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(0);

  return (
    <div style={{ marginTop: '80px', background: 'linear-gradient(135deg, #f8f6f3 0%, #fff 100%)', minHeight: '100vh' }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        pointerEvents: 'none',
        zIndex: '0',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-200px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 163, 115, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '-150px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(212, 163, 115, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .event-category-card {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* Enhanced Hero Section */}
      <section style={{ position: 'relative', zIndex: '1', paddingTop: '80px', paddingBottom: '100px', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '60px'
          }}>
            {/* Left Content */}
            <div>
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center', 
                gap: '12px',
                background: 'rgba(212, 163, 115, 0.1)',
                paddingLeft: '16px',
                paddingRight: '20px',
                paddingTop: '10px',
                paddingBottom: '10px',
                borderRadius: '50px',
                marginBottom: '32px',
                border: '1px solid rgba(212, 163, 115, 0.3)'
              }}>
                <Sparkles size={18} color="var(--primary)" />
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'var(--primary)'
                }}>
                  Exceptional Event Planning
                </span>
              </div>
              
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                marginBottom: '24px',
                lineHeight: '1.1',
                color: '#1a1a1a',
                letterSpacing: '-0.5px'
              }}>
                Celebrate Every <span style={{ color: 'var(--primary)' }}>Moment</span> with Excellence
              </h1>
              
              <p style={{
                fontSize: '1.15rem',
                color: '#666',
                maxWidth: '550px',
                lineHeight: '1.8',
                fontWeight: '500',
                marginBottom: '40px'
              }}>
                From intimate gatherings to grand celebrations, we orchestrate every detail to create unforgettable memories. Your vision, our expertise—crafted to perfection.
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '32px'
              }}>
                <button
                  onClick={() => navigate('/contact')}
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
                    boxShadow: '0 8px 25px rgba(212, 163, 115, 0.3)'
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
                  Start Planning
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => navigate('/gallery')}
                  style={{
                    background: 'transparent',
                    color: 'var(--primary)',
                    padding: '14px 36px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    border: '2px solid var(--primary)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 163, 115, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  View Gallery
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(212, 163, 115, 0.2)'
              }}>
                <div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    color: 'var(--primary)',
                    marginBottom: '4px'
                  }}>
                    1000+
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#888',
                    fontWeight: '600',
                    margin: '0'
                  }}>
                    Events Planned
                  </p>
                </div>
                <div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    color: 'var(--primary)',
                    marginBottom: '4px'
                  }}>
                    99%
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#888',
                    fontWeight: '600',
                    margin: '0'
                  }}>
                    Satisfied Clients
                  </p>
                </div>
                <div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    color: 'var(--primary)',
                    marginBottom: '4px'
                  }}>
                    10+
                  </div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#888',
                    fontWeight: '600',
                    margin: '0'
                  }}>
                    Years Experience
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual Element */}
            <div style={{
              position: 'relative',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Decorative cards showcase */}
              <div style={{
                position: 'absolute',
                width: '280px',
                height: '350px',
                background: 'linear-gradient(135deg, rgba(212, 163, 115, 0.15) 0%, rgba(212, 163, 115, 0.05) 100%)',
                border: '2px solid rgba(212, 163, 115, 0.2)',
                borderRadius: '20px',
                padding: '30px',
                transform: 'rotate(-5deg) translateX(-40px) translateY(-20px)',
                boxShadow: '0 15px 40px rgba(212, 163, 115, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '20px',
                zIndex: 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Heart size={24} color="var(--primary)" />
                  <span style={{ fontWeight: '700', color: '#1a1a1a' }}>Intimate Moments</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Star size={24} color="var(--primary)" />
                  <span style={{ fontWeight: '700', color: '#1a1a1a' }}>Memorable Celebrations</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Briefcase size={24} color="var(--primary)" />
                  <span style={{ fontWeight: '700', color: '#1a1a1a' }}>Corporate Excellence</span>
                </div>
              </div>

              <div style={{
                position: 'absolute',
                width: '280px',
                height: '350px',
                background: 'linear-gradient(135deg, var(--primary) 0%, rgba(212, 163, 115, 0.85) 100%)',
                borderRadius: '20px',
                padding: '30px',
                color: '#fff',
                transform: 'rotate(8deg) translateX(40px) translateY(40px)',
                boxShadow: '0 25px 60px rgba(212, 163, 115, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '16px',
                zIndex: 2
              }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.9 }}>Your Perfect Event</div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0', lineHeight: '1.2' }}>Crafted to Perfection</h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.85, margin: '0', lineHeight: '1.5' }}>
                  Expert planning, creative execution, and unforgettable moments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ position: 'relative', zIndex: '1', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Event Categories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '80px'
          }}>
            {eventGroups.map((group, index) => {
              const IconComponent = group.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={group.title}
                  className="event-category-card"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card Container */}
                  <div style={{
                    background: isHovered ? '#fff' : '#fafaf8',
                    borderRadius: '16px',
                    padding: '36px',
                    border: '1px solid',
                    borderColor: isHovered ? 'var(--primary)' : '#e8e8e8',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isHovered ? '0 20px 40px rgba(212, 163, 115, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
                  }}>
                    {/* Background accent */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '120px',
                      height: '120px',
                      background: `rgba(212, 163, 115, ${isHovered ? 0.12 : 0.06})`,
                      borderRadius: '50%',
                      transform: 'translate(30%, -30%)',
                      transition: 'all 0.4s ease'
                    }}></div>

                    {/* Icon with gradient background */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, var(--primary) 0%, rgba(212, 163, 115, 0.8) 100%)`,
                      borderRadius: '12px',
                      marginBottom: '24px',
                      transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                      transition: 'all 0.4s ease'
                    }}>
                      <IconComponent size={32} color="#fff" strokeWidth={2} />
                    </div>

                    {/* Title and description */}
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      marginBottom: '8px',
                      color: '#1a1a1a',
                      lineHeight: '1.3',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {group.title}
                    </h2>
                    
                    <div style={{
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--primary) 0%, rgba(212, 163, 115, 0.3) 100%)',
                      borderRadius: '2px',
                      marginBottom: '20px',
                      transition: 'width 0.4s ease',
                      width: isHovered ? '60px' : '40px'
                    }}></div>

                    {/* Items count */}
                    <p style={{
                      fontSize: '0.95rem',
                      color: '#888',
                      marginBottom: '24px',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {group.items.length} Event Types
                    </p>

                    {/* Items List */}
                    <ul style={{
                      listStyle: 'none',
                      padding: '0',
                      margin: '0',
                      flex: 1,
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {group.items.map((item, itemIndex) => (
                        <li
                          key={item}
                          style={{
                            marginBottom: '12px',
                            paddingLeft: '24px',
                            position: 'relative',
                            color: '#555',
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            fontWeight: '500',
                            opacity: isHovered ? 1 : 0.8,
                            transform: isHovered ? 'translateX(0)' : 'translateX(-4px)',
                            transition: `all 0.3s ease ${itemIndex * 0.05}s`
                          }}
                        >
                          <ChevronRight 
                            size={16} 
                            style={{
                              position: 'absolute',
                              left: '0',
                              top: '2px',
                              color: 'var(--primary)',
                              opacity: isHovered ? 1 : 0.5,
                              transition: 'all 0.3s ease'
                            }} 
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Arrow indicator */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '20px',
                      color: 'var(--primary)',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      Learn more
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why Choose Us Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212, 163, 115, 0.08) 0%, rgba(212, 163, 115, 0.03) 100%)',
            borderRadius: '20px',
            padding: '60px 40px',
            border: '2px solid rgba(212, 163, 115, 0.2)',
            marginBottom: '60px'
          }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '800',
                marginBottom: '12px',
                textAlign: 'center',
                color: '#1a1a1a'
              }}>
                Why Choose Our Event Planning?
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#666',
                textAlign: 'center',
                marginBottom: '40px',
                lineHeight: '1.7'
              }}>
                With years of experience and a passion for excellence, we transform your vision into reality with attention to every detail and unwavering dedication to your satisfaction.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '32px'
              }}>
                {[
                  { label: 'Professional Team', value: '50+' },
                  { label: 'Events Planned', value: '1000+' },
                  { label: 'Client Satisfaction', value: '99%' },
                  { label: 'Years Experience', value: '10+' }
                ].map((stat, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '800',
                      color: 'var(--primary)',
                      marginBottom: '8px'
                    }}>
                      {stat.value}
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#888',
                      fontWeight: '600',
                      margin: '0'
                    }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, rgba(212, 163, 115, 0.9) 100%)',
            borderRadius: '20px',
            padding: '70px 40px',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background pattern */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: '2.5rem',
                marginBottom: '16px',
                fontWeight: '800',
                lineHeight: '1.3'
              }}>
                Ready to Create Something Extraordinary?
              </h2>
              <p style={{
                fontSize: '1.1rem',
                marginBottom: '40px',
                opacity: '0.95',
                maxWidth: '600px',
                margin: '0 auto 40px',
                lineHeight: '1.7'
              }}>
                Let our expert team bring your vision to life. Contact us today to start planning your perfect event.
              </p>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  background: '#fff',
                  color: 'var(--primary)',
                  padding: '16px 48px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                Get in Touch
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsWePlan;
