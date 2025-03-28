import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit, Save, X } from 'lucide-react';

export default function IncidentsTable() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    incidentnotes: '',
    occurrencedatetime: '',
    totaloccurrencehrs: '',
    occurrencelocation: '',
    "911Called": false
  });

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    const { data, error } = await supabase
      .from('incidents')
      .select()
      .order('occurrence_datetime', { ascending: false });

    if (error) {
      console.error('Error fetching incidents:', error);
      return;
    }

    setIncidents(data || []);
  };

  const startEditing = (incident: any) => {
    setEditingId(incident.inci_id);
    setEditForm({
      incidentnotes: incident.incidentnotes,
      occurrencedatetime: new Date(incident.occurrencedatetime).toISOString().slice(0, 16),
      totaloccurrencehrs: incident.totaloccurrencehrs,
      occurrencelocation: incident.occurrencelocation,
      "911Called": incident["911Called"]
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({
      incidentnotes: '',
      occurrencedatetime: '',
      totaloccurrencehrs: '',
      occurrencelocation: '',
      "911Called": false
    });
  };

  const handleSave = async (incidentId: string) => {
    const { error } = await supabase
      .from('incidents')
      .update(editForm)
      .eq('inci_id', incidentId);

    if (error) {
      console.error('Error updating incident:', error);
      return;
    }

    setEditingId(null);
    fetchIncidents();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Incidents Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day Home</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map(incident => (
                <tr key={incident.inci_id}>
                  {editingId === incident.inci_id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="datetime-local"
                          value={editForm.occurrencedatetime}
                          onChange={(e) => setEditForm({ ...editForm, occurrencedatetime: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {incident.dimchild.child_firstname} {incident.dimchild.child_lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {incident.child_firstname} {incident.child_lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <textarea
                            value={editForm.incidentnotes}
                            onChange={(e) => setEditForm({ ...editForm, incidentnotes: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            rows={3}
                          />
                          <input
                            type="text"
                            value={editForm.occurrencelocation}
                            onChange={(e) => setEditForm({ ...editForm, occurrencelocation: e.target.value })}
                            className="w-full px-2 py-1 border rounded"
                            placeholder="Location"
                          />
                          <input
                            type="number"
                            value={editForm.totaloccurrencehrs}
                            onChange={(e) => setEditForm({ ...editForm, totaloccurrencehrs: e.target.value })}
                            className="w-24 px-2 py-1 border rounded"
                            step="0.25"
                            placeholder="Hours"
                          />
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editForm["911Called"]}
                              onChange={(e) => setEditForm({ ...editForm, "911Called": e.target.checked })}
                              className="mr-2"
                            />
                            <span className="text-sm">911 Called</span>
                          </div>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(incident.occurrencedatetime).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {incident.dimchild.child_firstname} {incident.dimchild.child_lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {incident.child_firstname} {incident.child_lastname}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <p className="font-medium">Notes:</p>
                          <p className="whitespace-pre-wrap">{incident.incidentnotes}</p>
                          <p className="mt-2">
                            <span className="font-medium">Location:</span> {incident.occurrencelocation}
                          </p>
                          <p>
                            <span className="font-medium">Duration:</span> {incident.totaloccurrencehrs} hours
                          </p>
                          {incident["911Called"] && (
                            <p className="text-red-600 font-medium mt-2">911 Was Called</p>
                          )}
                        </div>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4">
                    {editingId === incident.inci_id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave(incident.inci_id)}
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
                        onClick={() => startEditing(incident)}
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
