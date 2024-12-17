import {
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  FormControl,
  Autocomplete
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetAllCategoriesQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation
} from '../generated/graphql-types';

interface ProductDetailsReq {
  name: string;
  reference: string;
  shortDescription: string;
  description: string;
  price: number;
  categories?: { id: number; name: string }[] | null;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>('');
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const [product, setProduct] = useState<ProductDetailsReq>({
    name: '',
    reference: '',
    shortDescription: '',
    description: '',
    price: 0,
    categories: []
  });

  const {
    loading,
    error: fetchError,
    data
  } = useGetProductByIdQuery({
    variables: { getProductByIdId: parseInt(id!) }
  });

  const [updateProduct, { loading: updateLoading }] =
    useUpdateProductMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.reference || !product.name) {
      setError('Veuillez remplir les champs obligatoires.');
      return;
    }

    try {
      const { data } = await updateProduct({
        variables: {
          data: {
            id: parseInt(id!),
            name: product.name,
            reference: product.reference,
            shortDescription: product.shortDescription,
            description: product.description,
            price: product.price,
            categoryIds: product.categories?.map((cat) => cat.id) || []
          }
        }
      });

      if (data?.updateProduct) {
        setProduct({
          name: data.updateProduct.name,
          reference: data.updateProduct.reference,
          shortDescription: data.updateProduct.shortDescription ?? '',
          description: data.updateProduct.description ?? '',
          price: data.updateProduct.price ?? 0,
          categories: data.updateProduct.categories || []
        });
        setError(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (data?.getProductById) {
      setProduct({
        name: data.getProductById.name,
        reference: data.getProductById.reference,
        shortDescription: data.getProductById.shortDescription || '',
        description: data.getProductById.description || '',
        price: data.getProductById.price || 0,
        categories: data.getProductById.categories || []
      });
    } else if (fetchError) {
      setError(fetchError.message);
    }
  }, [data, fetchError]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        m: 1,
        width: '60ch',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxWidth: 400,
        margin: '0 auto'
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        sx={{
          marginLeft: '2px',
          fontWeight: 'bold'
        }}
      >
        Nom
      </Typography>
      <TextField
        required
        id="outlined-required"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Nom"
      />
      <Typography
        sx={{
          marginLeft: '2px',
          fontWeight: 'bold'
        }}
      >
        Reference
      </Typography>
      <TextField
        disabled
        id="outlined-required"
        name="reference"
        value={product.reference}
        onChange={handleChange}
        placeholder="Reference"
      />
      <Typography
        sx={{
          marginLeft: '2px',
          fontWeight: 'bold'
        }}
      >
        Courte description
      </Typography>
      <TextField
        name="shortDescription"
        value={product.shortDescription}
        onChange={handleChange}
        placeholder="Courte description"
      />
      <Typography
        sx={{
          marginLeft: '2px',
          fontWeight: 'bold'
        }}
      >
        Description
      </Typography>
      <TextField
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <Typography
        sx={{
          marginLeft: '2px',
          fontWeight: 'bold'
        }}
      >
        Prix
      </Typography>
      <TextField
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Prix"
      />
      <Typography sx={{ marginLeft: '2px', fontWeight: 'bold' }}>
        Catégorie
      </Typography>
      <FormControl fullWidth>
        <Autocomplete
          multiple
          options={categoriesData?.getAllCategories || []}
          getOptionLabel={(option) => option.name}
          value={[]} // Il faut qu'on le garde toujours vide car on gère l'ajout nous-mêmes
          onChange={(_, newValue) => {
            if (newValue.length > 0) {
              const newCategories = newValue.filter(
                (newCat) =>
                  !product.categories?.some(
                    (existingCat) => existingCat.id === newCat.id
                  )
              );

              setProduct((prev) => ({
                ...prev,
                categories: [...(prev.categories || []), ...newCategories]
              }));
            }
          }}
          filterOptions={(options) =>
            options.filter(
              (option) =>
                !product.categories?.some((cat) => cat.id === option.id)
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Rechercher des catégories"
              size="small"
            />
          )}
        />
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          minHeight: '40px',
          padding: '8px',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {product.categories && product.categories.length > 0 ? (
          product.categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              variant="filled"
              color="primary"
              onDelete={() => {
                setProduct((prev) => ({
                  ...prev,
                  categories:
                    prev.categories?.filter((cat) => cat.id !== category.id) ||
                    []
                }));
              }}
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: '20px',
                margin: '4px',
                padding: '4px 8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: '#f5f5f5'
                },
                '& .MuiChip-label': {
                  color: 'text.primary'
                },
                '& .MuiChip-deleteIcon': {
                  color: '#d32f2f',
                  '&:hover': {
                    color: '#d32f2f',
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    borderRadius: '50%'
                  }
                }
              }}
            />
          ))
        ) : (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Aucune catégorie associée
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        disabled={updateLoading}
        color="primary"
        type="submit"
        sx={{
          width: '20ch',
          alignSelf: 'flex-end'
        }}
      >
        Enregistrer
      </Button>
    </Box>
  );
}
