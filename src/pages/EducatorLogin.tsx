import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function EducatorLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    dayhomename: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState(location.state?.message || '');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        if (error.message === 'Email not confirmed') {
          setMessage('Please check your email to confirm your account before logging in.');
        } else {
          throw error;
        }
        return;
      }

      if (data.user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleMode = () => {
    setIsSigningUp(!isSigningUp);
    setError('');
    setMessage('');
    setFormData({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      dayhomename: ''
    });
  };

  const handleSignUp = async () => {
    setError('');
    setMessage('');

    if (!formData.firstname || !formData.lastname || !formData.dayhomename) {
      setError('All fields are required');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    });
    
    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      // Create user profile in dimuser table
      const { error: profileError } = await supabase
        .from('dimuser')
        .insert([{
          user_id: data.user.id,
          firstname: formData.firstname,
          lastname: formData.lastname,
          dayhomename: formData.dayhomename,
          address: '',  // These can be updated later
          city: '',
          province: '',
          country: ''
        }]);

      if (profileError) {
        setError('Failed to create user profile. Please contact support.');
        return;
      }

      setMessage('Please check your email for a confirmation link. You must confirm your email before logging in.');
      setFormData({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        dayhomename: ''
      });
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center text-teal-700 mb-8">
              {isSigningUp ? 'Create Educator Account' : 'Educator Login'}
            </h1>
            
            {message && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                <p className="text-sm">{message}</p>
              </div>
            )}
            
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={isSigningUp ? (e) => { e.preventDefault(); handleSignUp(); } : handleSubmit} className="space-y-6">
              {isSigningUp && (
                <>
                  <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="dayhomename" className="block text-sm font-medium text-gray-700 mb-1">
                      Day Home Name
                    </label>
                    <input
                      type="text"
                      id="dayhomename"
                      name="dayhomename"
                      value={formData.dayhomename}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your password (min 6 characters)"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isSigningUp ? 'Sign Up' : 'Login'}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {isSigningUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    {isSigningUp ? 'Login' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Forgot your login credentials? Contact your agency consultant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
