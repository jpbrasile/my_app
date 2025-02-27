import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        className={`px-4 py-2 rounded ${activeTab === 'prospects' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => onTabChange('prospects')}
      >
        Prospects
      </button>
      <button
        className={`px-4 py-2 rounded ${activeTab === 'entreprises' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => onTabChange('entreprises')}
      >
        Entreprises
      </button>
    </div>
  );
};

export default Tabs;
