import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { userColumns } from '../../utils/userColumns';
import Cookies from 'js-cookie';
import axios from 'axios';

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

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('access_token');

      const response = await axios.get('/auth/users', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveClick = async (data: UserRow) => {
    delete data.id;
    delete data.isNew;

    try {
      await axios.post('/auth/users', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      fetchUsers();
    } catch (e) {
      console.error(e);
    }
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
