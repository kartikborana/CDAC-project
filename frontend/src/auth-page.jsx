import React, { useState } from 'react';
import { authAPI, handleAPIError } from './api-service';
import authStyles from './components/auth/AuthStyles';
import BrandPanel from './components/auth/BrandPanel';
import AuthForm from './components/auth/AuthForm';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const loginResponse = await authAPI.login(formData.email, formData.password);

        try {
          const userDetails = await authAPI.getCurrentUser();

          if (onLogin) {
            onLogin({
              email: userDetails.email,
              role: userDetails.role?.toLowerCase() || 'customer',
              name: userDetails.name,
              id: userDetails.id,
              token: loginResponse.token
            });
          }
        } catch (userError) {
          console.warn('Could not fetch user details:', userError);
          if (onLogin) {
            onLogin({
              email: formData.email,
              role: 'customer',
              name: formData.email.split('@')[0],
              token: loginResponse.token
            });
          }
        }
      } else {
        let userData;

        try {
          userData = await authAPI.register({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
          });

          try {
            const loginResponse = await authAPI.login(formData.email, formData.password);
            const frontendRole = userData.role?.toLowerCase() || 'customer';

            if (onLogin) {
              onLogin({
                email: userData.email,
                role: frontendRole,
                name: userData.name,
                id: userData.id,
                token: loginResponse.token
              });
            }
          } catch (loginError) {
            console.error('Auto-login after registration failed:', loginError);
            setApiError('Registration successful, but automatic login failed. Please try logging in manually.');
            setLoading(false);
          }
        } catch (registrationError) {
          console.error('Registration failed:', registrationError);
          setApiError(handleAPIError(registrationError));
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setApiError(handleAPIError(error));
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="auth-page">
      <style>{authStyles}</style>

      <div className="auth-container">
        <BrandPanel />
        <AuthForm
          isLogin={isLogin}
          formData={formData}
          errors={errors}
          loading={loading}
          apiError={apiError}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          toggleMode={toggleMode}
        />
      </div>
    </div>
  );
};

export default AuthPage;