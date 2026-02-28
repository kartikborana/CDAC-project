import React, { useEffect } from 'react';

/**
 * OAuthCallback — handles the redirect from backend after Google login.
 * 
 * Flow:
 *   Google → Backend (issues JWT) → Redirects to /oauth2/success?token=<jwt>
 *   This component reads ?token from URL, stores in localStorage, calls onLogin()
 */
const OAuthCallback = ({ onLogin }) => {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            try {
                // Decode the JWT payload (middle part between the two dots)
                const payloadBase64 = token.split('.')[1];
                const payload = JSON.parse(atob(payloadBase64));

                const role = (payload.role || 'CUSTOMER').toLowerCase();
                const email = payload.sub;          // email is stored as JWT subject
                const userId = payload.user_id;

                // Store token exactly like normal login does
                localStorage.setItem('token', token);

                // Call the same onLogin handler used by normal login
                if (onLogin) {
                    onLogin({ token, role, email, id: userId });
                }
            } catch (err) {
                console.error('Failed to parse OAuth token:', err);
                // Redirect back to login if token is malformed
                window.location.href = '/';
            }
        } else {
            // No token in URL — something went wrong
            console.error('No token found in OAuth callback URL');
            window.location.href = '/';
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#0f172a',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            gap: '16px'
        }}>
            <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid rgba(255,255,255,0.1)',
                borderTop: '4px solid #f97316',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: '18px', fontWeight: 500, margin: 0 }}>
                Signing you in with Google...
            </p>
        </div>
    );
};

export default OAuthCallback;
