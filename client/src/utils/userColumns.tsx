import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { ControlPoint } from '@mui/icons-material';
import { UserRow } from '../pages/users/UserManagement';

interface ColumnsProps {
  handleSaveClick: (e: UserRow) => void;
}

export const userColumns = (
  handleSaveClick: ColumnsProps['handleSaveClick']
): GridColDef<UserRow>[] => [
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
    editable: true,
    valueGetter: (value, row) => {
      const date = row.starting_date ? new Date(row.starting_date) : null;
      return date ? new Intl.DateTimeFormat('fr-FR').format(date) : '';
    }
  },
  {
    field: 'ending_date',
    headerName: 'Date de fin',
    width: 110,
    editable: true,
    valueGetter: (value, row) => {
      const date = row.ending_date ? new Date(row.ending_date) : '';
      return date ? new Intl.DateTimeFormat('fr-FR').format(date) : '';
    }
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
