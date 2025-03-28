import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { PhoneInput } from '../PhoneInput';

interface UserFormProps {
  onSubmit: () => void;
  initialData?: {
    educator_firstname: string;
    educator_lastname: string;
    educator_dayhome_name: string;
    educator_address: string;
    educator_city: string;
    educator_province: string;
    user_email: string;
    role: string;
  };
  mode: 'add' | 'edit';
}

export default function UserForm({ onSubmit, initialData, mode }: UserFormProps) {
  const [formData, setFormData] = useState({
    educator_firstname: initialData?.educator_firstname || '',
    educator_lastname: initialData?.educator_lastname || '',
    educator_dayhome_name: initialData?.educator_dayhome_name || '',
    educator_address: initialData?.educator_address || '',
    educator_city: initialData?.educator_city || '',
    educator_province: initialData?.educator_province || '',
    user_email: initialData?.user_email || '',
    role: initialData?.role || 'educator'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'add') {
        const { error: insertError } = await supabase
          .from('dimuser')
          .insert([formData]);

        if (insertError) throw insertError;
      } else {
        const { error: updateError } = await supabase
          .from('dimuser')
          .update(formData)
          .eq('user_email', initialData?.user_email);

        if (updateError) throw updateError;
      }

      onSubmit();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="educator_firstname" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="educator_firstname"
            name="educator_firstname"
            value={formData.educator_firstname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="educator_lastname" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="educator_lastname"
            name="educator_lastname"
            value={formData.educator_lastname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          required
          disabled={mode === 'edit'}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
        />
      </div>

      <div>
        <label htmlFor="educator_dayhome_name" className="block text-sm font-medium text-gray-700 mb-1">
          Day Home Name
        </label>
        <input
          type="text"
          id="educator_dayhome_name"
          name="educator_dayhome_name"
          value={formData.educator_dayhome_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="educator_address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          id="educator_address"
          name="educator_address"
          value={formData.educator_address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="educator_city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="educator_city"
            name="educator_city"
            value={formData.educator_city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="educator_province" className="block text-sm font-medium text-gray-700 mb-1">
            Province
          </label>
          <input
            type="text"
            id="educator_province"
            name="educator_province"
            value={formData.educator_province}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="educator">Educator</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving...' : mode === 'add' ? 'Create User' : 'Update User'}
        </button>
      </div>
    </form>
  );
}
