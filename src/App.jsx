import React, { useState } from 'react';
import Tabs from './components/Tabs';
import DynamicForm from './components/DynamicForm';
import DataTable from './components/DataTable';

function App() {
  const [activeTab, setActiveTab] = useState('prospects');
  const [editingRecord, setEditingRecord] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEditingRecord(null); // Reset editing state when changing tabs
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    // Scroll to form for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmitComplete = () => {
    setEditingRecord(null); // Reset editing state after form submission
    // Trigger a refresh of the data table
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">React Supabase CRUD Application</h1>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <DynamicForm
        tableName={activeTab}
        editingRecord={editingRecord}
        onSubmitComplete={handleFormSubmitComplete}
      />
      <DataTable
        tableName={activeTab}
        onEdit={handleEdit}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}

export default App;
