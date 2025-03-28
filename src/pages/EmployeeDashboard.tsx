import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { LogOut, Users, Calendar, AlertTriangle, Home, Eye, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import UserForm from '../components/forms/UserForm';
import ChildForm from '../components/forms/ChildForm';
import DailyLoginForm from '../components/forms/DailyLoginForm';
import IncidentForm from '../components/forms/IncidentForm';
import UsersTable from '../components/tables/UsersTable';
import ChildrenTable from '../components/tables/ChildrenTable';
import DailyLoginsTable from '../components/tables/DailyLoginsTable';
import IncidentsTable from '../components/tables/IncidentsTable';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeView, setActiveView] = useState<string>('users');
  const [mode, setMode] = useState<'view' | 'add' | 'edit'>('view');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) {
        navigate('/employee-login');
        return;
      }
      setUser(user);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/employee-login', { state: { message: 'Successfully logged out' } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to the Employee Dashboard</h1>
            <p className="text-gray-600">
              Select a category below to manage day home providers, children, daily logins, or incidents.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users Management Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <Users className="w-8 h-8 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">Educators</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage day home providers and their information</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setActiveView('users'); setMode('view'); }}
                className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Eye size={16} />
                <span>View</span>
              </button>
              <button
                onClick={() => { setActiveView('users'); setMode('add'); }}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Children Management Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <Home className="w-8 h-8 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">Children</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage children records and assignments</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setActiveView('children'); setMode('view'); }}
                className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Eye size={16} />
                <span>View</span>
              </button>
              <button
                onClick={() => { setActiveView('children'); setMode('add'); }}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Daily Logins Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <Calendar className="w-8 h-8 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">Daily Logins</h2>
            </div>
            <p className="text-gray-600 mb-4">Track attendance and daily activities</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setActiveView('daily-logins'); setMode('view'); }}
                className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Eye size={16} />
                <span>View</span>
              </button>
              <button
                onClick={() => { setActiveView('daily-logins'); setMode('add'); }}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Incidents Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-teal-600" />
              <h2 className="text-xl font-bold text-gray-800">Incidents</h2>
            </div>
            <p className="text-gray-600 mb-4">Monitor and manage reported incidents</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setActiveView('incidents'); setMode('view'); }}
                className="flex items-center justify-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Eye size={16} />
                <span>View</span>
              </button>
              <button
                onClick={() => { setActiveView('incidents'); setMode('add'); }}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
              {activeView === 'users' ? 'Educators' : activeView} {mode === 'view' ? 'List' : mode === 'add' ? 'Creation' : 'Management'}
            </h2>
            {/* Dynamic content based on activeView and mode */}
            <div className="space-y-6">
              {mode === 'view' && activeView === 'users' && <UsersTable />}
              {mode === 'view' && activeView === 'children' && <ChildrenTable />}
              {mode === 'view' && activeView === 'daily-logins' && <DailyLoginsTable />}
              {mode === 'view' && activeView === 'incidents' && <IncidentsTable />}
              {mode === 'add' && (
                <>
                  {activeView === 'users' && (
                    <UserForm 
                      mode="add" 
                      onSubmit={() => {
                        setMode('view');
                        setActiveView('users');
                      }} 
                    />
                  )}
                  {activeView === 'children' && (
                    <ChildForm 
                      mode="add" 
                      onSubmit={() => {
                        setMode('view');
                        setActiveView('children');
                      }} 
                    />
                  )}
                  {activeView === 'daily-logins' && (
                    <DailyLoginForm 
                      mode="add" 
                      onSubmit={() => {
                        setMode('view');
                        setActiveView('daily-logins');
                      }} 
                    />
                  )}
                  {activeView === 'incidents' && (
                    <IncidentForm 
                      mode="add" 
                      onSubmit={() => {
                        setMode('view');
                        setActiveView('incidents');
                      }} 
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
