import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import authService from '../utils/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.forgotPassword(email);
            setSent(true);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
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
            background: 'var(--background)',
            padding: '24px'
        }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '60px', textAlign: 'center' }}>
                <Link to="/" className="logo" style={{ justifyContent: 'center', marginBottom: '40px', fontSize: '2rem' }}>
                    <Gift size={32} color="var(--primary)" /> Happy Box
                </Link>

                {!sent ? (
                    <>
                        <div style={{ width: '80px', height: '80px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                            <Mail size={36} color="var(--primary)" />
                        </div>

                        <h1 style={{ marginBottom: '12px', fontSize: '2rem' }}>Forgot Password?</h1>
                        <p style={{ color: '#888', marginBottom: '40px', fontSize: '1rem' }}>
                            No worries! Enter your email address and we'll send you instructions to reset your password.
                        </p>

                        {error && (
                            <div style={{ background: '#fff0f0', border: '1px solid #ffcdd2', color: '#d32f2f', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                    className="form-control"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                style={{ width: '100%', padding: '16px', marginBottom: '24px', opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div style={{ width: '80px', height: '80px', background: '#e8f5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                            <CheckCircle2 size={40} color="#2e7d32" />
                        </div>

                        <h1 style={{ marginBottom: '12px', fontSize: '2rem' }}>Check Your Email</h1>
                        <p style={{ color: '#888', marginBottom: '40px', fontSize: '1rem', maxWidth: '350px', margin: '0 auto 40px' }}>
                            We've sent password reset instructions to <strong style={{ color: '#333' }}>{email}</strong>. Please check your inbox and spam folder.
                        </p>

                        <button
                            onClick={() => { setSent(false); setEmail(''); }}
                            className="btn btn-outline"
                            style={{ width: '100%', padding: '16px', marginBottom: '24px' }}
                        >
                            Try another email
                        </button>
                    </>
                )}

                <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600, marginTop: '16px' }}>
                    <ArrowLeft size={18} /> Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
