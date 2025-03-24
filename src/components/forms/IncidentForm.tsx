import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface IncidentFormProps {
  onSubmit: () => void;
  mode: 'add' | 'edit';
}

export default function IncidentForm({ onSubmit, mode }: IncidentFormProps) {
  const [formData, setFormData] = useState({
    child_id: '',
    incidentnotes: '',
    occurrencedatetime: '',
    totaloccurrencehrs: '',
    occurrencelocation: '',
    "911Called": false,
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
      .from('dimchild')
      .select(`
        child_id,
        firstname,
        lastname,
        dimuser:user_email (
          dayhomename
        )
      `);

    if (error) {
      console.error('Error fetching children:', error);
      return;
    }

    setChildren(data || []);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : 
                 e.target.type === 'number' ? parseFloat(e.target.value) : 
                 e.target.value;
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

      const incidentData = {
        ...formData,
        user_email: childData.user_email,
        occurrencedatetime: new Date(formData.occurrencedatetime).toISOString()
      };

      const { error: insertError } = await supabase
        .from('incidents')
        .insert([incidentData]);

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
            <option key={child.child_id} value={child.child_id}>
              {child.firstname} {child.lastname} ({child.dimuser.dayhomename})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="occurrencedatetime" className="block text-sm font-medium text-gray-700 mb-1">
          Occurrence Date & Time
        </label>
        <input
          type="datetime-local"
          id="occurrencedatetime"
          name="occurrencedatetime"
          value={formData.occurrencedatetime}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="occurrencelocation" className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          id="occurrencelocation"
          name="occurrencelocation"
          value={formData.occurrencelocation}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="incidentnotes" className="block text-sm font-medium text-gray-700 mb-1">
          Incident Notes
        </label>
        <textarea
          id="incidentnotes"
          name="incidentnotes"
          value={formData.incidentnotes}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="totaloccurrencehrs" className="block text-sm font-medium text-gray-700 mb-1">
          Total Hours
        </label>
        <input
          type="number"
          id="totaloccurrencehrs"
          name="totaloccurrencehrs"
          value={formData.totaloccurrencehrs}
          onChange={handleChange}
          step="0.25"
          min="0"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="911Called"
          name="911Called"
          checked={formData["911Called"]}
          onChange={handleChange}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label htmlFor="911Called" className="text-sm font-medium text-gray-700">
          911 Was Called
        </label>
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
          {loading ? 'Saving...' : 'Add Incident'}
        </button>
      </div>
    </form>
  );
}