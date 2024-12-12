import CardProduct from '../components/CardProduct';
import Grid from '@mui/material/Grid2';
import { useGetAllProductsQuery } from '../generated/graphql-types';
import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import debounce from 'lodash/debounce';

export default function Catalog() {
  const [searchProduct, setSearchProduct] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchProduct);
  const { loading, error, data } = useGetAllProductsQuery({
    variables: { search: debouncedSearch },
    fetchPolicy: 'cache-and-network'
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(event.target.value);
  };

  useEffect(() => {
    const debounced = debounce(() => setDebouncedSearch(searchProduct), 300);
    debounced();
    return () => {
      debounced.cancel();
    };
  }, [searchProduct]);

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
        {data?.getAllProducts.map((produit) => (
          <CardProduct
            key={produit.id}
            id={produit.id}
            name={produit.name}
            price={produit.price}
            reference={produit.reference}
            shortDescription={produit.shortDescription}
            description={produit.description}
          />
        ))}
      </Grid>
    </>
  );
}
