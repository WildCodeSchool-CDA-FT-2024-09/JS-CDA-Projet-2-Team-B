import CardProduct from '../components/CardProduct';
import Grid from '@mui/material/Grid2';
import { GetAllProductsDocument } from '../generated/graphql-types';
import { useEffect, useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useQuery } from '@apollo/client';

interface Product {
  id: number;
  name: string;
  price?: number;
  reference: string;
  shortDescription?: string;
  description?: string;
}

export default function Catalog() {
  const [searchProduct, setSearchProduct] = useState('');

  const { loading, error, data } = useQuery(GetAllProductsDocument);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(event.target.value);
  };

  useEffect(() => {}, [searchProduct]);

  console.info('Données chargées :', data?.getAllProducts);

  if (loading) return <p> loading </p>;
  if (error) return <p> error : </p>;

  return (
    <>
      <TextField
        label="Rechercher un Produit"
        variant="outlined"
        margin="normal"
        value={searchProduct}
        onChange={handleChange}
        sx={{
          display: 'flex',
          width: '20%',
          marginLeft: 90,
          marginTop: 6
        }}
      />

      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 6,
          marginRight: 10,
          justifyContent: 'right'
        }}
      >
        {data?.getAllProducts.map((produit: Product) => (
          <CardProduct
            key={produit.id}
            id={produit.id}
            name={produit.name}
            price={produit.price ?? 0}
            reference={produit.reference}
            shortDescription={produit.shortDescription ?? ''}
            description={produit.description ?? ''}
          />
        ))}
      </Grid>
    </>
  );
}
