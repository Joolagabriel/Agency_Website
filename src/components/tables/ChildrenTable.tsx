import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit, Save, X } from 'lucide-react';

export default function ChildrenTable() {
  const [children, setChildren] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    address: '',
    city: '',
    province: '',
    country: ''
  });

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
        child_dob,
        child_age,
        child_address,
        child_city,
        child_province,
        educator_firstname,
        educator_lastname,
        educator_dayhome_name
      `)
      .not('child_firstname', 'is', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching children:', error);
      return;
    }

    setChildren(data || []);
  };

  const startEditing = (child: any) => {
    setEditingId(child.child_id);
    setEditForm({
      firstname: child.firstname,
      lastname: child.lastname,
      dob: child.dob,
      address: child.address,
      city: child.city,
      province: child.province,
      country: child.country
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({
      firstname: '',
      lastname: '',
      dob: '',
      address: '',
      city: '',
      province: '',
      country: ''
    });
  };

  const handleSave = async (childId: string) => {
    const { error } = await supabase
      .from('dimchild')
      .update(editForm)
      .eq('child_id', childId);

    if (error) {
      console.error('Error updating child:', error);
      return;
    }

    setEditingId(null);
    fetchChildren();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Children Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day Home</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {children.map(child => (
                <tr key={child.child_id}>
                  {editingId === child.child_id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.child_firstname}
                          onChange={(e) => setEditForm({ ...editForm, child_firstname: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                          placeholder="First Name"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {child.educator_dayhome_name}
                          <div className="text-xs text-gray-500">
                            {child.educator_firstname} {child.educator_lastname}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="date"
                          value={editForm.dob}
                          onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editForm.address}
                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            placeholder="Address"
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={editForm.city}
                              onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                              className="w-24 px-2 py-1 border rounded"
                              placeholder="City"
                            />
                            <input
                              type="text"
                              value={editForm.province}
                              onChange={(e) => setEditForm({ ...editForm, province: e.target.value })}
                              className="w-24 px-2 py-1 border rounded"
                              placeholder="Province"
                            />
                            <input
                              type="text"
                              value={editForm.country}
                              onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                              className="w-24 px-2 py-1 border rounded"
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {child.child_firstname} {child.child_lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {child.educator_dayhome_name}
                          <div className="text-xs text-gray-500">
                            {child.educator_firstname} {child.educator_lastname}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{child.age} years</div>
                        <div className="text-xs text-gray-500">Born: {new Date(child.child_dob).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <p>{child.child_address}</p>
                          <p>{child.child_city}, {child.child_province}</p>
                        </div>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4">
                    {editingId === child.child_id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave(child.child_id)}
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
                        onClick={() => startEditing(child)}
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