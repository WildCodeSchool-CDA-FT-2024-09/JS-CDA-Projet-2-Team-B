import {
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  FormControl,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  GetAllBrandsDocument,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useGetProductByIdQuery,
  useRestoreProductMutation,
  useUpdateProductMutation
} from '../generated/graphql-types';
import { useLazyQuery } from '@apollo/client';
import { CustomSwitch } from '../ui/Switch';

interface ProductDetailsReq {
  name: string;
  reference: string;
  shortDescription: string;
  description: string;
  price: number;
  isPublished: boolean;
  categories?: { id: number; name: string }[] | null;
  brand: { id: number; name: string } | null;
  isActive: boolean;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>('');
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const [getBrands, { data: brandsData }] = useLazyQuery(GetAllBrandsDocument);
  const [brandInputValue, setBrandInputValue] = useState('');
  const [deleteProduct] = useDeleteProductMutation();
  const [restoreProduct] = useRestoreProductMutation();

  const [brandOptions, setBrandOptions] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [updateProduct, { loading: updateLoading }] =
    useUpdateProductMutation();
  const [product, setProduct] = useState<ProductDetailsReq>({
    name: '',
    reference: '',
    shortDescription: '',
    description: '',
    price: 0,
    isPublished: true,
    categories: [],
    brand: null,
    isActive: true
  });

  const {
    loading,
    error: fetchError,
    data
  } = useGetProductByIdQuery({
    variables: { getProductByIdId: parseInt(id!), includeDeleted: true }
  });

  useEffect(() => {
    if (brandInputValue !== '') {
      getBrands({ variables: { search: brandInputValue } });
    } else {
      setBrandOptions([]);
    }
  }, [brandInputValue, getBrands]);

  useEffect(() => {
    if (brandsData?.getAllBrands) {
      setBrandOptions(brandsData.getAllBrands);
    }
  }, [brandsData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSwitchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = e.target.checked;

    try {
      if (isActive) {
        await restoreProduct({
          variables: { id: parseInt(id!) },
          refetchQueries: ['GetProductById']
        });
      } else {
        await deleteProduct({
          variables: { id: parseInt(id!) },
          refetchQueries: ['GetProductById']
        });
      }

      setProduct((prev) => ({
        ...prev,
        isActive
      }));
    } catch (err) {
      console.error('Error updating product status:', err);
      setProduct((prev) => ({
        ...prev,
        isActive: !isActive
      }));
    }
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
            isPublished: product.isPublished,
            categoryIds: product.categories?.map((cat) => cat.id) || [],
            brand: product.brand!.id
          }
        }
      });

      if (!product.isActive) {
        await deleteProduct({
          variables: { id: parseInt(id!) }
        });
      }

      if (data?.updateProduct) {
        setProduct({
          name: data.updateProduct.name,
          reference: data.updateProduct.reference,
          shortDescription: data.updateProduct.shortDescription ?? '',
          description: data.updateProduct.description ?? '',
          price: data.updateProduct.price ?? 0,
          isPublished: data.updateProduct.isPublished ?? true,
          categories: data.updateProduct.categories || [],
          brand: data.updateProduct.brand as { id: number; name: string },
          isActive: product.isActive
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
        isPublished: data.getProductById.isPublished,
        categories: data.getProductById.categories || [],
        brand: data.getProductById.brand as { id: number; name: string },
        isActive: !data.getProductById.deletedAt
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
      <FormControlLabel
        control={
          <CustomSwitch
            checked={product.isActive}
            onChange={handleSwitchChange} // Nouvelle fonction
          />
        }
        label={
          <Typography
            sx={{
              color: product.isActive ? 'success.main' : 'error.main',
              fontWeight: 'bold'
            }}
          >
            {product.isActive ? 'Activé' : 'Désactivé'}
          </Typography>
        }
        sx={{ mt: 2, mb: 2 }}
      />
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
                marginTop: '4px',
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
      <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
        <Autocomplete
          options={brandOptions}
          getOptionLabel={(option) => option.name}
          value={product.brand}
          onChange={(_, newValue) =>
            setProduct((prev) => ({
              ...prev,
              brand: newValue
            }))
          }
          inputValue={brandInputValue}
          onInputChange={(_, newInputValue) => {
            setBrandInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sélectionner une marque"
              placeholder="Rechercher une marque"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label">Statut de publication</InputLabel>
        <Select
          labelId="status-label"
          value={product.isPublished ? 'true' : 'false'}
          onChange={(event) => {
            setProduct((prev) => ({
              ...prev,
              isPublished: event.target.value === 'true'
            }));
          }}
          label="Statut de publication"
        >
          <MenuItem value="false">Non publié</MenuItem>
          <MenuItem value="true">Publié</MenuItem>
        </Select>
      </FormControl>

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
