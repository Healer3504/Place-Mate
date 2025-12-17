// src/pages/Applications.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Building2, Calendar, DollarSign, MapPin, X, Save } from "lucide-react";
import theme from "../theme";

const statusColors = {
  Applied: { bg: '#E3F2FD', text: '#1976D2', border: '#1976D2' },
  Interviewing: { bg: '#FFF3E0', text: '#F57C00', border: '#F57C00' },
  Offered: { bg: '#E8F5E9', text: '#388E3C', border: '#388E3C' },
  Rejected: { bg: '#FFEBEE', text: '#D32F2F', border: '#D32F2F' },
  Accepted: { bg: '#E8F5E9', text: '#2E7D32', border: '#2E7D32' }
};

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    appliedDate: '',
    status: 'Applied',
    notes: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('applications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
    window.dispatchEvent(new Event('applicationsUpdated'));
  }, [applications]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.position) {
      alert('Please fill in Company and Position');
      return;
    }

    if (editingApp) {
      setApplications(applications.map(app => 
        app.id === editingApp.id ? { ...formData, id: editingApp.id } : app
      ));
    } else {
      setApplications([...applications, { ...formData, id: Date.now() }]);
    }

    resetForm();
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setFormData(app);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      salary: '',
      appliedDate: '',
      status: 'Applied',
      notes: ''
    });
    setEditingApp(null);
    setShowModal(false);
  };

  const getStatusCount = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  return (
    <div className="min-h-screen p-6" style={{ background: theme.milk }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: theme.espresso }}>
            Applications
          </h1>
          <p style={{ color: theme.mocha }}>
            Manage your job applications and track your progress
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${theme.accent.caramel}, ${theme.accent.cinnamon})` }}
        >
          <Plus size={20} />
          Add Application
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {['Applied', 'Interviewing', 'Offered', 'Accepted', 'Rejected'].map((status) => (
          <div
            key={status}
            className="p-4 rounded-xl shadow-md"
            style={{ 
              background: statusColors[status].bg,
              border: `2px solid ${statusColors[status].border}`
            }}
          >
            <div className="text-sm font-semibold" style={{ color: statusColors[status].text }}>
              {status}
            </div>
            <div className="text-3xl font-bold mt-2" style={{ color: statusColors[status].text }}>
              {getStatusCount(status)}
            </div>
          </div>
        ))}
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
          <Building2 size={64} className="mx-auto mb-4 opacity-30" style={{ color: theme.mocha }} />
          <h3 className="text-xl font-semibold mb-2" style={{ color: theme.mocha }}>
            No applications yet
          </h3>
          <p className="mb-4" style={{ color: theme.cappuccino }}>
            Start tracking your job applications by clicking "Add Application"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: theme.espresso }}>
                    {app.company}
                  </h3>
                  <p className="text-sm" style={{ color: theme.mocha }}>
                    {app.position}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(app)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                    style={{ color: theme.accent.cinnamon }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2 rounded-lg hover:bg-red-50"
                    style={{ color: '#D32F2F' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: statusColors[app.status].bg,
                    color: statusColors[app.status].text
                  }}
                >
                  {app.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                {app.location && (
                  <div className="flex items-center gap-2" style={{ color: theme.mocha }}>
                    <MapPin size={16} />
                    <span>{app.location}</span>
                  </div>
                )}
                {app.salary && (
                  <div className="flex items-center gap-2" style={{ color: theme.mocha }}>
                    <DollarSign size={16} />
                    <span>{app.salary}</span>
                  </div>
                )}
                {app.appliedDate && (
                  <div className="flex items-center gap-2" style={{ color: theme.mocha }}>
                    <Calendar size={16} />
                    <span>{new Date(app.appliedDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {app.notes && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.foam }}>
                  <p className="text-xs" style={{ color: theme.cappuccino }}>
                    {app.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.foam }}>
              <h2 className="text-2xl font-bold" style={{ color: theme.espresso }}>
                {editingApp ? 'Edit Application' : 'Add New Application'}
              </h2>
              <button onClick={resetForm} className="p-2 rounded-lg hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    style={{ borderColor: theme.foam }}
                    placeholder="e.g., Google"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    style={{ borderColor: theme.foam }}
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    style={{ borderColor: theme.foam }}
                    placeholder="e.g., Bangalore"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                    Salary
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    style={{ borderColor: theme.foam }}
                    placeholder="e.g., ₹10-15 LPA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                    Applied Date
                  </label>
                  <input
                    type="date"
                    name="appliedDate"
                    value={formData.appliedDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    style={{ borderColor: theme.foam }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    style={{ borderColor: theme.foam }}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.mocha }}>
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none resize-none"
                  style={{ borderColor: theme.foam }}
                  placeholder="Any notes..."
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t" style={{ borderColor: theme.foam }}>
              <button
                onClick={resetForm}
                className="flex-1 px-6 py-3 rounded-xl font-semibold border-2"
                style={{ borderColor: theme.accent.caramel, color: theme.accent.cinnamon }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${theme.accent.caramel}, ${theme.accent.cinnamon})` }}
              >
                <Save size={20} />
                {editingApp ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;