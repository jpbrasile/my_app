import React from 'react';

const FilterInput = ({ filterText, onFilterChange, filterField, onFilterFieldChange, fields }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Filter records..."
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="md:w-1/3">
        <select
          value={filterField}
          onChange={(e) => onFilterFieldChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="all">All Fields</option>
          {fields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterInput;
