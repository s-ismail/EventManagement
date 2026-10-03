import React, { useState, useEffect } from 'react';
import EntityTable from '../../components/admin/EntityTable';
import userService from '../../api/userService';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const columns = [
    { header: 'Username', accessor: user => user.username },
    { header: 'Email', accessor: user => user.email },
    { header: 'Full Name', accessor: user => user.fullName },
    { header: 'Role', accessor: user => user.role },
  ];

  return (
    <div className="admin-users-page container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      <EntityTable
        data={users}
        columns={columns}
        onDelete={handleDelete}
        onUpdate={(id) => `/admin/users/update/${id}`}
      />
    </div>
  );
};

export default AdminUsersPage;

