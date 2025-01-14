import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GetAllProductsDocument } from '../../generated/graphql-types';
import CardProduct from './CardProduct';

interface Product {
  id: number;
  name: string;
  price?: number;
  reference: string;
  shortDescription?: string;
  description?: string;
}

export default function Catalog() {
  const { loading, error, data } = useQuery(GetAllProductsDocument);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Erreur GraphQL :', error);
    return <p>Error : {error.message}</p>;
  }

  const rows: GridRowsProp =
    data?.getAllProducts.map((produit: Product) => ({
      id: produit.id,
      name: produit.name,
      price: produit.price || 'Non spécifié',
      reference: produit.reference,
      shortDescription: produit.shortDescription || 'Aucune description courte',
      description: produit.description || ''
    })) || [];

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', width: 200 },
    { field: 'price', headerName: 'Prix (€)', width: 150 },
    { field: 'reference', headerName: 'Référence', width: 200 },
    {
      field: 'shortDescription',
      headerName: 'Description courte',
      width: 250
    },
    {
      field: 'Description',
      headerName: 'Description',
      width: 300
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (Product: GridRenderCellParams) => (
        <CardProduct
          id={Product.row.id}
          name={Product.row.name}
          price={Product.row.price}
          reference={Product.row.reference}
          shortDescription={Product.row.shortDescription}
          description={Product.row.description}
          compact
        />
      ),
      sortable: false
    }
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Liste des produits
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
              marginBottom: 1
            }}
          />
        </Box>
      </Box>
    </>
  );
}
