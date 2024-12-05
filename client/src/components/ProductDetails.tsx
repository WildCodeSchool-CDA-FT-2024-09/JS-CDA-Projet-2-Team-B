import { Box, TextField, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation
} from '../generated/graphql-types';

interface ProductDetailsReq {
  name: string;
  reference: string;
  shortDescription: string;
  description: string;
  price: number;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>('');
  const [product, setProduct] = useState<ProductDetailsReq>({
    name: '',
    reference: '',
    shortDescription: '',
    description: '',
    price: 0
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
    const { name, value, type } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value
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
            price: product.price
          }
        }
      });

      if (data?.updateProduct) {
        setProduct(data.updateProduct);
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
        shortDescription: data.getProductById.shortDescription,
        description: data.getProductById.description,
        price: data.getProductById.price
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
        required
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
