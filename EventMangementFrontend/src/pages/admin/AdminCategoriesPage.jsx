import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EntityTable from '../../components/admin/EntityTable';
import categoryService from '../../api/categoryService';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  };

  const columns = [
    { header: 'Name', accessor: category => category.name },
    { header: 'Description', accessor: category => category.description },
  ];

  return (
    <div className="admin-categories-page container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Manage Categories</h1>
      <Link
        to="/admin/categories/add"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
      >
        Add New Category
      </Link>
      <EntityTable
        data={categories}
        columns={columns}
        onDelete={handleDelete}
        onUpdate={(id) => `/admin/categories/update/${id}`}
      />
    </div>
  );
};

export default AdminCategoriesPage;

