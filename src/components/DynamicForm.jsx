import React, { useState, useEffect } from 'react';
import { fetchTableData, createRecord, updateRecord } from '../utils/supabaseClient';

const DynamicForm = ({ tableName, editingRecord, onSubmitComplete }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch fields when table changes
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTableData(tableName);
        if (data.length > 0) {
          // Filter out id field and any fields we don't want users to edit directly
          const fieldNames = Object.keys(data[0]).filter(field => field !== 'id' && field !== 'created_at');
          setFields(fieldNames);
        } else {
          // If no data exists yet, we need a fallback approach
          // This could be hardcoded fields or a schema query
          setFields([]);
        }
      } catch (err) {
        setError('Failed to fetch table structure. Please try again.');
        console.error('Error fetching table structure:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    // Reset form when table changes
    if (!editingRecord) {
      setFormData({});
    }
  }, [tableName]);

  // Update form when editing record changes
  useEffect(() => {
    if (editingRecord) {
      // Create a copy of the editing record, excluding fields we don't want in the form
      const formValues = { ...editingRecord };
      delete formValues.id; // Remove ID from form data
      delete formValues.created_at; // Remove created_at if it exists
      setFormData(formValues);
    } else {
      setFormData({});
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (editingRecord) {
        await updateRecord(tableName, editingRecord.id, formData);
        setSuccess(`Record updated successfully!`);
      } else {
        await createRecord(tableName, formData);
        setSuccess(`Record created successfully!`);
      }

      // Reset form and notify parent component
      setFormData({});
      if (onSubmitComplete) {
        onSubmitComplete();
      }
    } catch (error) {
      setError(`Failed to ${editingRecord ? 'update' : 'create'} record. Please try again.`);
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);

      // Clear success message after 3 seconds
      if (success) {
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  const handleCancel = () => {
    setFormData({});
    if (onSubmitComplete) {
      onSubmitComplete();
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingRecord ? 'Edit Record' : 'Create New Record'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field} className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        <div className="flex space-x-2 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : editingRecord ? 'Update' : 'Create'}
          </button>

          {editingRecord && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
