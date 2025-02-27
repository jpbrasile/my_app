import React, { useState, useEffect } from 'react';
import { fetchTableData, deleteRecord } from '../utils/supabaseClient';
import FilterInput from './FilterInput';

const DataTable = ({ tableName, onEdit, refreshTrigger }) => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filterField, setFilterField] = useState('all');
  const [fields, setFields] = useState([]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTableData(tableName);
      setRecords(data);
      setFilteredRecords(data);

      // Extract field names for the filter dropdown
      if (data.length > 0) {
        setFields(Object.keys(data[0]));
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tableName, refreshTrigger]);

  useEffect(() => {
    // Apply filtering when filterText or filterField changes
    if (!filterText.trim()) {
      setFilteredRecords(records);
      return;
    }

    const filtered = records.filter(record => {
      if (filterField === 'all') {
        // Search in all fields
        return Object.values(record).some(value =>
          value !== null && String(value).toLowerCase().includes(filterText.toLowerCase())
        );
      } else {
        // Search in specific field
        const value = record[filterField];
        return value !== null && String(value).toLowerCase().includes(filterText.toLowerCase());
      }
    });

    setFilteredRecords(filtered);
  }, [filterText, filterField, records]);

  const handleEdit = (record) => {
    if (onEdit) {
      onEdit(record);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setIsLoading(true);
      try {
        await deleteRecord(tableName, id);
        await loadData(); // Refresh data after deletion
      } catch (err) {
        setError('Failed to delete record. Please try again.');
        console.error('Error deleting record:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading && records.length === 0) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (records.length === 0) {
    return <div className="text-center py-4">No records found. Create one using the form above.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Records</h2>

      <FilterInput
        filterText={filterText}
        onFilterChange={setFilterText}
        filterField={filterField}
        onFilterFieldChange={setFilterField}
        fields={fields}
      />

      <div className="mb-2 text-sm text-gray-500">
        Showing {filteredRecords.length} of {records.length} records
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-gray-50">
            <tr>
              {records.length > 0 && Object.keys(records[0]).map((key) => (
                <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {key}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                {Object.values(record).map((value, idx) => (
                  <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {value !== null ? String(value) : ''}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(record)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
