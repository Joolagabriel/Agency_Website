import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, LogOut, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const navigate = useNavigate();
  const [children, setChildren] = useState<any[]>([]);
  const [showTimeEntry, setShowTimeEntry] = useState(false);
  const [timeEntry, setTimeEntry] = useState({
    starttime: '',
    endtime: '',
    loginstartnotes: '',
    loginendnotes: '',
    child_id: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        navigate('/educator-login');
        return;
      }
      
      // Fetch children associated with the user
      const { data: childrenData, error: childrenError } = await supabase
        .from('dimchild')
        .select('child_id, firstname, lastname')
        .eq('user_email', user.email);

      if (childrenError) {
        console.error('Error fetching children:', childrenError);
        return;
      }

      setChildren(childrenData || []);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/educator-login', { state: { message: 'Successfully logged out' } });
  };

  const handleTimeEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user?.email) return;

    // Validate end time is after start time
    if (timeEntry.endtime && new Date(timeEntry.endtime) <= new Date(timeEntry.starttime)) {
      setError('End time must be after start time');
      return;
    }

    const { error } = await supabase
      .from('daily_logins')
      .insert([
        {
          user_email: user.email,
          ...timeEntry,
          starttime: new Date(timeEntry.starttime).toISOString(),
          endtime: timeEntry.endtime ? new Date(timeEntry.endtime).toISOString() : null
        }
      ]);

    if (error) {
      console.error('Error saving time entry:', error);
      setError('Failed to save time entry. Please try again.');
      return;
    }

    setShowTimeEntry(false);
    setTimeEntry({
      starttime: '',
      endtime: '',
      loginstartnotes: '',
      loginendnotes: '',
      child_id: ''
    });
  };

  return (
    <div className="min-h-screen bg-sky-50 py-8">
      <div className="container mx-auto px-4 mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-700">Educator Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Time Entry Button */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              onClick={() => setShowTimeEntry(true)}
              className="flex items-center space-x-2 text-teal-600 hover:text-teal-700"
            >
              <Clock size={24} />
              <span>New Time Entry</span>
            </button>
          </div>
        </div>

        {/* Time Entry Modal */}
        {showTimeEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">New Time Entry</h2>
              <form onSubmit={handleTimeEntry} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={timeEntry.starttime}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, starttime: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={timeEntry.endtime}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, endtime: e.target.value }))}
                    min={timeEntry.starttime}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Child
                  </label>
                  <select
                    value={timeEntry.child_id}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, child_id: e.target.value }))}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select a child</option>
                    {children.map(child => (
                      <option key={child.child_id} value={child.child_id}>
                        {child.firstname} {child.lastname}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={timeEntry.loginstartnotes}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, loginstartnotes: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Notes
                  </label>
                  <textarea
                    value={timeEntry.loginendnotes}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, loginendnotes: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    disabled={!timeEntry.endtime}
                    placeholder={!timeEntry.endtime ? "Add end time to enable end notes" : ""}
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowTimeEntry(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
