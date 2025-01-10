import CardProduct from '../components/CardProduct';
import Grid from '@mui/material/Grid2';
import { GetAllProductsDocument } from '../generated/graphql-types';
import { useEffect, useState, ChangeEvent } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Typography
} from '@mui/material';
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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { loading, error, data, refetch } = useQuery(GetAllProductsDocument, {
    variables: {
      search: searchProduct,
      brands: selectedBrands
    }
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(event.target.value);
    refetch({ search: event.target.value, brands: selectedBrands });
  };

  const handleBrandChange = (
    event: ChangeEvent<HTMLInputElement>,
    brand: string
  ) => {
    setSelectedBrands((prev) =>
      event.target.checked
        ? [...prev, brand]
        : prev.filter((name) => name !== brand)
    );
  };

  useEffect(() => {
    console.info('Variables envoyées a la requete', {
      search: searchProduct,
      brands: selectedBrands
    });
    refetch({
      search: searchProduct,
      brands: selectedBrands
    });
  }, [searchProduct, selectedBrands, refetch]);

  console.info('Données chargées :', data?.getAllProducts);

  if (loading) return <p> loading </p>;
  if (error) {
    console.error('error GraphQL :', error);
    return <p> Error :{error.message} </p>;
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Box
            sx={{
              width: '100%',
              padding: 2,
              backgroundColor: '#f5f5f5',
              marginTop: 15
            }}
          >
            <Typography variant="h6">Filtrer par marque</Typography>
            <FormGroup>
              {['Apple', 'Samsung', 'Dell', 'HP', 'Seagate', 'Canon'].map(
                (brand) => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand)}
                        onChange={(event) => handleBrandChange(event, brand)}
                        name={brand}
                      />
                    }
                    label={brand}
                  />
                )
              )}
            </FormGroup>
          </Box>
        </Box>
        <Box sx={{ width: '80%' }}>
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
        </Box>
      </Box>
    </>
  );
}
