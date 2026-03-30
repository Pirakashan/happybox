import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gift, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import authService from '../utils/authService';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ 
            ...form, 
            [name]: type === 'checkbox' ? checked : value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!form.email || !form.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await authService.login(form.email, form.password);
            authService.setAuthData(res.token, res.user);
            if (form.rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', form.email);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url("http://localhost:8000/assets/images/hero_premium.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative',
            padding: '24px',
            fontFamily: 'Outfit, sans-serif',
            overflow: 'hidden'
        }}>
            {/* Blurred Background Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 0
            }}></div>
            
            <div style={{
                width: '100%',
                maxWidth: '480px',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo and Title Section */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <Link to="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '24px',
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: '#1a1a1a',
                        textDecoration: 'none'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'linear-gradient(135deg, var(--primary) 0%, rgba(212,163,115,0.8) 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Gift size={28} color="#fff" />
                        </div>
                        Happy Box
                    </Link>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#1a1a1a',
                        marginBottom: '8px',
                        letterSpacing: '-0.5px'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{
                        color: '#666',
                        fontSize: '1rem',
                        lineHeight: 1.6
                    }}>
                        Sign in to your account to manage your orders and surprises
                    </p>
                </div>

                {/* Login Card */}
                <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                    padding: '48px 40px',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    {/* Error Message */}
                    {error && (
                        <div style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '14px 16px',
                            borderRadius: '10px',
                            marginBottom: '24px',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px'
                        }}>
                            <span style={{ marginTop: '2px' }}>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                color: '#1a1a1a'
                            }}>
                                Email Address
                            </label>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Mail size={18} style={{
                                    position: 'absolute',
                                    left: '14px',
                                    color: '#999'
                                }} />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="you@example.com"
                                    style={{
                                        paddingLeft: '46px',
                                        paddingRight: '14px',
                                        paddingTop: '12px',
                                        paddingBottom: '12px',
                                        fontSize: '0.95rem',
                                        border: '1.5px solid #e5e7eb',
                                        borderRadius: '10px',
                                        width: '100%',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--primary)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(212,163,115,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '8px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px'
                            }}>
                                <label style={{
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    color: '#1a1a1a'
                                }}>
                                    Password
                                </label>
                            </div>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <Lock size={18} style={{
                                    position: 'absolute',
                                    left: '14px',
                                    color: '#999'
                                }} />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="••••••••"
                                    style={{
                                        paddingLeft: '46px',
                                        paddingRight: '46px',
                                        paddingTop: '12px',
                                        paddingBottom: '12px',
                                        fontSize: '0.95rem',
                                        border: '1.5px solid #e5e7eb',
                                        borderRadius: '10px',
                                        width: '100%',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--primary)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(212,163,115,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#999',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '4px',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                                >
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '28px',
                            marginTop: '16px'
                        }}>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={form.rememberMe}
                                onChange={handleChange}
                                style={{
                                    cursor: 'pointer',
                                    width: '18px',
                                    height: '18px',
                                    accentColor: 'var(--primary)'
                                }}
                            />
                            <label htmlFor="rememberMe" style={{
                                fontSize: '0.9rem',
                                color: '#666',
                                cursor: 'pointer',
                                userSelect: 'none'
                            }}>
                                Remember me
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px 24px',
                                background: loading ? 'rgba(212,163,115,0.5)' : 'linear-gradient(135deg, var(--primary) 0%, rgba(212,163,115,0.9) 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: '0 8px 24px rgba(212,163,115,0.3)',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = '0 12px 32px rgba(212,163,115,0.4)')}
                            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,163,115,0.3)')}
                        >
                            {loading ? (
                                <>
                                    <span style={{ display: 'inline-block', animation: 'spin 0.6s linear infinite' }}>⏳</span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                </div>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                input:disabled {
                    background-color: #f9fafb !important;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default Login;
