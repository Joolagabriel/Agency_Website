import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit, Save, X, UserCheck } from 'lucide-react';

export default function UsersTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    educator_firstname: '',
    educator_lastname: '',
    educator_dayhome_name: '',
    educator_address: '',
    educator_city: '',
    educator_province: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('dimuser')
      .select('*')
      .eq('role', 'educator')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    setUsers(data || []);
  };

  const startEditing = (user: any) => {
    setEditingId(user.user_email);
    setEditForm({
      educator_firstname: user.educator_firstname,
      educator_lastname: user.educator_lastname,
      educator_dayhome_name: user.educator_dayhome_name,
      educator_address: user.educator_address,
      educator_city: user.educator_city,
      educator_province: user.educator_province
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({
      educator_firstname: '',
      educator_lastname: '',
      educator_dayhome_name: '',
      educator_address: '',
      educator_city: '',
      educator_province: ''
    });
  };

  const handleSave = async (user_email: string) => {
    const { error } = await supabase
      .from('dimuser')
      .update(editForm)
      .eq('user_email', user_email);

    if (error) {
      console.error('Error updating user:', error);
      return;
    }

    setEditingId(null);
    fetchUsers();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Educators Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day Home</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.user_email}>
                  {editingId === user.user_email ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.educator_firstname}
                          onChange={(e) => setEditForm({ ...editForm, educator_firstname: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                          placeholder="First Name"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={editForm.educator_lastname}
                            onChange={(e) => setEditForm({ ...editForm, educator_lastname: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            placeholder="Last Name"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.educator_dayhome_name}
                          onChange={(e) => setEditForm({ ...editForm, educator_dayhome_name: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                          placeholder="Day Home Name"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editForm.educator_address}
                            onChange={(e) => setEditForm({ ...editForm, educator_address: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            placeholder="Address"
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={editForm.educator_city}
                              onChange={(e) => setEditForm({ ...editForm, educator_city: e.target.value })}
                              className="w-24 px-2 py-1 border rounded"
                              placeholder="City"
                            />
                            <input
                              type="text"
                              value={editForm.educator_province}
                              onChange={(e) => setEditForm({ ...editForm, educator_province: e.target.value })}
                              className="w-24 px-2 py-1 border rounded"
                              placeholder="Province"
                            />
                          </div>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.educator_firstname} {user.educator_lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {user.educator_dayhome_name}
                          <div className="text-xs text-gray-500">
                            <UserCheck className="inline-block w-4 h-4 mr-1 text-teal-600" />
                            Verified Educator
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{user.user_email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.educator_address && (
                            <p>{user.educator_address}</p>
                          )}
                          <p>{user.educator_city}, {user.educator_province}</p>
                        </div>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4">
                    {editingId === user.user_email ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave(user.user_email)}
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
                        onClick={() => startEditing(user)}
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
