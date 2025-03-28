import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface DailyLoginFormProps {
  onSubmit: () => void;
  mode: 'add' | 'edit';
}

export default function DailyLoginForm({ onSubmit, mode }: DailyLoginFormProps) {
  const [formData, setFormData] = useState({
    child_id: '',
    starttime: '',
    endtime: '',
    loginstartnotes: '',
    loginendnotes: '',
    totaldayhrs: '',
    dailyedugovtrate: '',
    daystatus: 'active',
    user_email: ''
  });
  const [children, setChildren] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChildren();
  }, []);
  
  const fetchChildren = async () => {
    const { data, error } = await supabase
      .from('dimuser')
      .select(`
        user_email,
        child_firstname,
        child_lastname,
        educator_firstname,
        educator_lastname,
        educator_dayhome_name
      `)
      .not('child_firstname', 'is', null)
      .eq('role', 'educator');

    if (error) {
      console.error('Error fetching children:', error);
      return;
    }

    setChildren(data || []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Get the user_email for the selected child
      const { data: childData } = await supabase
        .from('dimchild')
        .select('user_email')
        .eq('child_id', formData.child_id)
        .single();

      if (!childData) throw new Error('Child not found');

      const loginData = {
        ...formData,
        user_email: childData.user_email,
        starttime: new Date(formData.starttime).toISOString(),
        endtime: formData.endtime ? new Date(formData.endtime).toISOString() : null
      };

      const { error: insertError } = await supabase
        .from('daily_logins')
        .insert([loginData]);

      if (insertError) throw insertError;

      onSubmit();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="child_id" className="block text-sm font-medium text-gray-700 mb-1">
          Child
        </label>
        <select
          id="child_id"
          name="child_id"
          value={formData.child_id}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="">Select a child</option>
          {children.map(child => (
            <option key={child.user_email} value={child.user_email}>
              {child.child_firstname} {child.child_lastname} ({child.educator_dayhome_name})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="starttime" className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="starttime"
            name="starttime"
            value={formData.starttime}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="endtime" className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endtime"
            name="endtime"
            value={formData.endtime}
            onChange={handleChange}
            min={formData.starttime}
            disabled={!formData.starttime}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="loginstartnotes" className="block text-sm font-medium text-gray-700 mb-1">
          Start Notes
        </label>
        <textarea
          id="loginstartnotes"
          name="loginstartnotes"
          value={formData.loginstartnotes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="loginendnotes" className="block text-sm font-medium text-gray-700 mb-1">
          End Notes
        </label>
        <textarea
          id="loginendnotes"
          name="loginendnotes"
          value={formData.loginendnotes}
          onChange={handleChange}
          rows={3}
          disabled={!formData.endtime}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="totaldayhrs" className="block text-sm font-medium text-gray-700 mb-1">
            Total Hours
          </label>
          <input
            type="number"
            id="totaldayhrs"
            name="totaldayhrs"
            value={formData.totaldayhrs}
            onChange={handleChange}
            step="0.25"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="dailyedugovtrate" className="block text-sm font-medium text-gray-700 mb-1">
            Daily Rate
          </label>
          <input
            type="number"
            id="dailyedugovtrate"
            name="dailyedugovtrate"
            value={formData.dailyedugovtrate}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="daystatus" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="daystatus"
            name="daystatus"
            value={formData.daystatus}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
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
          {loading ? 'Saving...' : 'Add Login'}
        </button>
      </div>
    </form>
  );
}
