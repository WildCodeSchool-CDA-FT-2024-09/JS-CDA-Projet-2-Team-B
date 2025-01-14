import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { userColumns } from '../../utils/userColumns';
import { useAuth } from '../../context/AuthContext';
import { createAxiosInstance } from '../../services/axios.instance';

export type UserRow = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  starting_date: string;
  ending_date: string;
  isNew?: boolean;
};

export default function UserManagement() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const { logout } = useAuth();

  const axiosInstance = createAxiosInstance(logout);

  const fetchUsers = async () => {
    const response = await axiosInstance.get('/auth/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveClick = async (data: UserRow) => {
    delete data.id;
    delete data.isNew;

    await axiosInstance.post('/auth/users', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    fetchUsers();
  };

  const handleAddClick = () => {
    const newUser: UserRow = {
      id: users.length + 1,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      starting_date: '',
      ending_date: '',
      isNew: true
    };
    setUsers([...users, newUser]);
  };

  return (
    <Box sx={{ height: 'auto', width: 'auto', margin: '2%' }}>
      <DataGrid
        rows={users}
        columns={userColumns(handleSaveClick)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleAddClick()}
        >
          Ajouter un utilisateur
        </Button>
      </Box>
    </Box>
  );
}
