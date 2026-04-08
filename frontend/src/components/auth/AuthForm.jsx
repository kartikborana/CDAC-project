import React from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

const AuthForm = ({
    isLogin,
    formData,
    errors,
    loading,
    apiError,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleSubmit,
    toggleMode,
}) => (
    <div className="form-panel">
        <div className="form-header">
            <h1 className="form-title">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h1>
            <p className="form-subtitle">
                {isLogin
                    ? 'Sign in to access your account'
                    : 'Create a customer account to order food'}
            </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                name="name"
                                className={`form-input ${errors.name ? 'error' : ''}`}
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <div className="input-wrapper">
                            <Phone className="input-icon" size={20} />
                            <input
                                type="tel"
                                name="phone"
                                className={`form-input ${errors.phone ? 'error' : ''}`}
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                </div>
            )}

            <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                    <Mail className="input-icon" size={20} />
                    <input
                        type="email"
                        name="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                    <Lock className="input-icon" size={20} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className={`form-input ${errors.password ? 'error' : ''}`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {!isLogin && (
                <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon" size={20} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <span className="error-message">{errors.confirmPassword}</span>
                    )}
                </div>
            )}

            {apiError && (
                <div
                    className="error-message"
                    style={{
                        padding: '0.75rem',
                        background: '#FEE2E2',
                        borderRadius: '8px',
                        border: '1px solid #EF4444',
                        textAlign: 'center',
                    }}
                >
                    {apiError}
                </div>
            )}

            <button
                type="submit"
                className="submit-btn"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
                {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>

            {/* Divider */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0'
            }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
                <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 500 }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
            </div>

            {/* Google OAuth Button */}
            <button
                type="button"
                onClick={() => window.location.href = process.env.REACT_APP_OAUTH_URL || 'http://localhost:8080/oauth2/authorization/google'}
                style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#1e293b',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}
            >
                {/* Google SVG icon */}
                <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                Continue with Google
            </button>
        </form>

        <div className="form-footer">
            <span className="toggle-text">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <a className="toggle-link" onClick={toggleMode}>
                {isLogin ? 'Sign Up' : 'Sign In'}
            </a>
        </div>

        {isLogin && (
            <div className="demo-credentials">
                <div className="demo-title">🔑 Demo Credentials (for testing)</div>
                <div className="demo-item"><strong>Customer:</strong> customer@demo.com / pass123</div>
                <div className="demo-item">
                    <strong>Staff:</strong> staff@demo.com / pass123{' '}
                    <em style={{ fontSize: '0.8rem' }}>(added by admin)</em>
                </div>
                <div className="demo-item">
                    <strong>Admin:</strong> admin@demo.com / pass123{' '}
                    <em style={{ fontSize: '0.8rem' }}>(admin only)</em>
                </div>
            </div>
        )}
    </div>
);

export default AuthForm;
