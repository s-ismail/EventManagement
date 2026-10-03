import React from 'react';
import { Link } from 'react-router-dom';

const EntityTable = ({ data, columns, onDelete, onUpdate }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column, index) => (
              <td key={index} className="px-6 py-4 whitespace-nowrap">
                {column.accessor(item)}
              </td>
            ))}
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Link to={onUpdate(item.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                Edit
              </Link>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntityTable;

