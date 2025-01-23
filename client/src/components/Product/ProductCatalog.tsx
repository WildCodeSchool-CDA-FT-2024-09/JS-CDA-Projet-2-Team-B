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
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price?: number;
  reference: string;
  shortDescription?: string;
  description?: string;
}

export default function Catalog() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  });
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
    { field: 'price', headerName: 'Prix (€)', width: 100 },
    { field: 'reference', headerName: 'Référence', width: 200 },
    {
      field: 'shortDescription',
      headerName: 'Description courte',
      width: 400
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 450
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
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
          padding: '2rem'
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Liste des produits
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pagination
          />
        </Box>
      </Box>
    </>
  );
}
