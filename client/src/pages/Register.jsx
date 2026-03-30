import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gift, Eye, EyeOff } from 'lucide-react';
import authService from '../utils/authService';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setErrors({});
        try {
            const res = await authService.register(form);
            authService.setAuthData(res.token, res.user);
            navigate('/dashboard');
        } catch (err) {
            if (err.errors) {
                setErrors(err.errors);
            } else {
                setError(err.message || 'Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fieldError = (name) => errors[name] ? (
        <p style={{ color: '#d32f2f', fontSize: '0.8rem', marginTop: '4px' }}>{errors[name][0]}</p>
    ) : null;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url("http://localhost:8000/assets/images/hero_1.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            padding: '24px'
        }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)' }}></div>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '550px', padding: '50px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Link to="/" className="logo" style={{ justifyContent: 'center', marginBottom: '32px', fontSize: '2rem' }}>
                    <Gift size={32} color="var(--primary)" /> Happy Box
                </Link>
                <h1 style={{ marginBottom: '12px', fontSize: '2.2rem' }}>Create Account</h1>
                <p style={{ color: '#888', marginBottom: '40px' }}>Join the community of joy and surprise</p>

                {error && (
                    <div style={{ background: '#fff0f0', border: '1px solid #ffcdd2', color: '#d32f2f', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', marginBottom: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>First Name</label>
                            <input type="text" name="first_name" value={form.first_name} onChange={handleChange} className="form-control" placeholder="John" required />
                            {fieldError('first_name')}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Last Name</label>
                            <input type="text" name="last_name" value={form.last_name} onChange={handleChange} className="form-control" placeholder="Doe" required />
                            {fieldError('last_name')}
                        </div>
                    </div>
                    <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="name@company.com" required />
                        {fieldError('email')}
                    </div>
                    <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Minimum 6 characters" required />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {fieldError('password')}
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '18px', marginBottom: '24px', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 0 }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
