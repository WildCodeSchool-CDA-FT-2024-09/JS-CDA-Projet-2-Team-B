import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Add, ControlPoint } from '@mui/icons-material';
import axios from 'axios';

export type UserRow = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  starting_date: string;
  ending_date: string;
  isNew?: boolean;
};

// Pour test, à supprimer après la mise en place du fetch
const rows: UserRow[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '123456789',
    starting_date: '2025-01-01',
    ending_date: '2025-12-31'
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone: '987654321',
    starting_date: '2024-06-01',
    ending_date: '2024-12-31'
  },
  {
    id: 3,
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '564738291',
    starting_date: '2023-05-15',
    ending_date: '2023-10-15'
  },
  {
    id: 4,
    first_name: 'Bob',
    last_name: 'Williams',
    email: 'bob.williams@example.com',
    phone: '192837465',
    starting_date: '2023-01-01',
    ending_date: '2023-12-31'
  },
  {
    id: 5,
    first_name: 'Charlie',
    last_name: 'Brown',
    email: 'charlie.brown@example.com',
    phone: '314159265',
    starting_date: '2025-06-01',
    ending_date: '2025-12-31'
  }
];

export default function UserManagement() {
  const [users, setUsers] = useState<UserRow[]>(rows);

  const columns: GridColDef<UserRow>[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      valueGetter: (value, row) => {
        if (!row.starting_date || !row.ending_date) {
          return '';
        }
        const today = new Date();
        const startDate = new Date(row.starting_date);
        const endDate = new Date(row.ending_date);
        return startDate <= today && today <= endDate ? 'Actif' : 'Inactif';
      }
    },
    {
      field: 'first_name',
      headerName: 'Prénom',
      width: 150,
      editable: true
    },
    {
      field: 'last_name',
      headerName: 'Nom',
      width: 150,
      editable: true
    },
    {
      field: 'full_name',
      headerName: 'Nom complet',
      description:
        'Cette colonne est générée par les colonnes "Prénom" et "Nom" et ne peut pas être triée.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.first_name || ''} ${row.last_name || ''}`
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true
    },
    {
      field: 'phone',
      headerName: 'nº téléphone',
      width: 110,
      editable: true
    },
    {
      field: 'starting_date',
      headerName: 'Date de début',
      width: 110,
      editable: true
    },
    {
      field: 'ending_date',
      headerName: 'Date de fin',
      width: 110,
      editable: true
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (e) => {
        if (e.row.isNew) {
          return [
            <GridActionsCellItem
              icon={<ControlPoint />}
              label="Save"
              onClick={() => handleSaveClick(e.row)}
            />
          ];
        }
        return [];
      }
    }
  ];

  const handleSaveClick = async (e: UserRow) => {
    const { id, isNew, ...dataCleaned } = e;

    try {
      await axios.post('/auth/users', dataCleaned, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            isNew: !isNew
          };
        }
        return user;
      });
      setUsers(updatedUsers);
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
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        pageSizeOptions={[10]}
        checkboxSelection
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
