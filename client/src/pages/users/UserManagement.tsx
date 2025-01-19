import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
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
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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

    const isValidDate = (dateStr: string): boolean => {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Format DD/MM/YYYY
      if (!regex.test(dateStr)) return false;
      const [day, month, year] = dateStr.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    };

    if (!isValidDate(data.starting_date)) {
      setError("La date de début n'est pas valide.");
      fetchUsers();
      return;
    }

    if (!isValidDate(data.ending_date)) {
      setError("La date de fin n'est pas valide.");
      fetchUsers();
      return;
    }

    // Converting date format from DD/MM/YYYY to YYYY-MM-DD
    const parseDate = (dateStr: string): string => {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
    };

    data.starting_date = parseDate(data.starting_date);
    data.ending_date = parseDate(data.ending_date);

    await axiosInstance.post('/auth/users', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    fetchUsers();
  };

  const getLastId = (): number => {
    const maxIdUser = users.reduce((maxUser, currentUser) =>
      (currentUser.id || 0) > (maxUser.id || 0) ? currentUser : maxUser
    );

    return maxIdUser.id || 0;
  };

  const handleAddClick = () => {
    setError(null);
    setSuccessMessage(null);

    const newUser: UserRow = {
      id: getLastId() + 1,
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
      <Box sx={{ display: 'flex', marginTop: '10px', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleAddClick()}
        >
          Ajouter un utilisateur
        </Button>
        {error ? (
          <Typography sx={{ color: 'error.main', marginLeft: '10px' }}>
            {error}
          </Typography>
        ) : (
          ''
        )}
        {successMessage && (
          <Typography sx={{ color: 'success' }}>{successMessage}</Typography>
        )}
      </Box>
    </Box>
  );
}
