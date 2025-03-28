import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit, Save, X } from 'lucide-react';

export default function DailyLoginsTable() {
  const [logins, setLogins] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    starttime: new Date().toISOString().slice(0, 16),
    endtime: '',
    login_start_notes: '',
    login_end_notes: '',
    total_day_hrs: '',
    daily_edu_govt_rate: '',
    day_status: 'active'
  });

  useEffect(() => {
    fetchLogins();
  }, []);

  const fetchLogins = async () => {
    const { data, error } = await supabase
      .from('daily_logins')
      .select(`
        *,
        dimuser:user_email (
          educator_firstname,
          educator_lastname,
          educator_dayhome_name
        )
      `)
      .order('starttime', { ascending: false });

    if (error) {
      console.error('Error fetching daily logins:', error);
      return;
    }

    setLogins(data || []);
  };

  const startEditing = (login: any) => {
    setEditingId(login.login_id);
    setEditForm({
      starttime: login.starttime ? new Date(login.starttime).toISOString().slice(0, 16) : '',
      endtime: login.endtime ? new Date(login.endtime).toISOString().slice(0, 16) : '',
      login_start_notes: login.login_start_notes || '',
      login_end_notes: login.login_end_notes || '',
      total_day_hrs: login.total_day_hrs || '',
      daily_edu_govt_rate: login.daily_edu_govt_rate || '',
      day_status: login.day_status || 'active'
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({
      starttime: '',
      endtime: '',
      login_start_notes: '',
      login_end_notes: '',
      total_day_hrs: '',
      daily_edu_govt_rate: '',
      day_status: 'active'
    });
  };

  const handleSave = async (loginId: string) => {
    const updateData = {
      starttime: new Date(editForm.starttime).toISOString(),
      endtime: editForm.endtime ? new Date(editForm.endtime).toISOString() : null,
      login_start_notes: editForm.login_start_notes,
      login_end_notes: editForm.login_end_notes,
      total_day_hrs: editForm.total_day_hrs ? parseFloat(editForm.total_day_hrs) : null,
      daily_edu_govt_rate: editForm.daily_edu_govt_rate ? parseFloat(editForm.daily_edu_govt_rate) : null,
      day_status: editForm.day_status
    };

    const { error } = await supabase
      .from('daily_logins')
      .update(updateData)
      .eq('login_id', loginId);

    if (error) {
      console.error('Error updating daily login:', error);
      return;
    }

    setEditingId(null);
    fetchLogins();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Logins Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date/Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date/Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day Home</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours & Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logins.map(login => (
                <tr key={login.login_id}>
                  {editingId === login.login_id ? (
                    <>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <input
                            type="datetime-local"
                            value={editForm.starttime}
                            onChange={(e) => setEditForm({ ...editForm, starttime: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            required
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <input
                            type="datetime-local"
                            value={editForm.endtime}
                            onChange={(e) => setEditForm({ ...editForm, endtime: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            min={editForm.starttime}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {login.child_firstname} {login.child_lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {login.dimuser?.educator_dayhome_name || 'No Day Home Assigned'}
                          <div className="text-xs text-gray-500">
                            {login.dimuser ? `${login.dimuser.educator_firstname} ${login.dimuser.educator_lastname}` : 'No Educator Info'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <textarea
                            value={editForm.login_start_notes}
                            onChange={(e) => setEditForm({ ...editForm, login_start_notes: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            placeholder="Start Notes"
                            rows={2}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <textarea
                            value={editForm.login_end_notes}
                            onChange={(e) => setEditForm({ ...editForm, login_end_notes: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            placeholder="End Notes"
                            rows={2}
                            disabled={!editForm.endtime}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              value={editForm.total_day_hrs}
                              onChange={(e) => setEditForm({ ...editForm, total_day_hrs: e.target.value })}
                              className="w-24 px-2 py-1 border rounded"
                              step="0.25"
                              placeholder="Hours"
                            />
                            <input
                              type="number"
                              value={editForm.daily_edu_govt_rate}
                              onChange={(e) => setEditForm({ ...editForm, daily_edu_govt_rate: e.target.value })}
                              className="w-24 px-2 py-1 border rounded"
                              step="0.01"
                              placeholder="Rate"
                            />
                          </div>
                          <select
                            value={editForm.day_status}
                            onChange={(e) => setEditForm({ ...editForm, day_status: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                          >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(login.starttime).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {login.endtime ? new Date(login.endtime).toLocaleString() : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {login.child_firstname} {login.child_lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {login.dimuser?.educator_dayhome_name || 'No Day Home Assigned'}
                          <div className="text-xs text-gray-500">
                            {login.dimuser ? `${login.dimuser.educator_firstname} ${login.dimuser.educator_lastname}` : 'No Educator Info'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <p className="whitespace-pre-wrap">{login.login_start_notes || '-'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <p className="whitespace-pre-wrap">{login.login_end_notes || '-'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <p>Hours: {login.total_day_hrs || 'N/A'}</p>
                          <p>Rate: ${login.daily_edu_govt_rate || '0.00'}</p>
                          <p>
                            Status:
                            <span className={`
                                ml-1
                                ${login.day_status === 'active' ? 'text-green-600' : ''}
                                ${login.day_status === 'completed' ? 'text-blue-600' : ''}
                                ${login.day_status === 'cancelled' ? 'text-red-600' : ''}
                            `}>
                              {login.day_status}
                            </span>
                          </p>
                        </div>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4">
                    {editingId === login.login_id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave(login.login_id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Save size={20} />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(login)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
