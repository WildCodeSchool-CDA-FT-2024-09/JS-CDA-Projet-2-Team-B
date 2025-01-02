import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  Autocomplete,
  Chip,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  GetAllBrandsDocument,
  GetAllProductsDocument,
  useCreateNewProductMutation,
  useGetAllCategoriesQuery
} from '../generated/graphql-types';
import { useLazyQuery } from '@apollo/client';

export default function CreationProduct() {
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const [getBrands, { data: brandsData }] = useLazyQuery(GetAllBrandsDocument);
  const [formData, setFormData] = useState({
    name: '',
    reference: '',
    shortDescription: '',
    description: '',
    price: 0,
    isPublished: true,
    categories: [] as Array<{ id: number; name: string }>,
    brand: null as { id: number; name: string } | null
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>('');
  const [createProduct, { loading }] = useCreateNewProductMutation();
  const [brandInputValue, setBrandInputValue] = useState('');
  const [brandOptions, setBrandOptions] = useState<
    Array<{ id: number; name: string }>
  >([]);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const {
      name,
      reference,
      shortDescription,
      description,
      price,
      categories,
      brand,
      isPublished
    } = formData;

    if (!name || !reference) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (price < 0) {
      setError('Le prix doit être un nombre positif.');
      return;
    }

    try {
      await createProduct({
        variables: {
          data: {
            name,
            reference,
            shortDescription,
            description,
            price,
            isPublished,
            categoryIds: categories.map((cat) => cat.id),
            brand: brand ? brand.id : null
          }
        },
        update(cache, { data }) {
          if (data?.createNewProduct) {
            const existingProducts = cache.readQuery<{
              getAllProducts: Array<{
                id: number;
                name: string;
                price: number;
                reference: string;
                shortDescription: string;
                description: string;
                isPublished: boolean;
              }>;
            }>({
              query: GetAllProductsDocument
            });

            cache.writeQuery({
              query: GetAllProductsDocument,
              data: {
                getAllProducts: [
                  ...(existingProducts?.getAllProducts || []),
                  data.createNewProduct
                ]
              }
            });
          }
        }
      });

      setSuccessMessage('Produit créé avec succès !');
      setFormData({
        name: '',
        reference: '',
        shortDescription: '',
        description: '',
        price: 0,
        isPublished: true,
        categories: [],
        brand: null
      });
    } catch (err) {
      setSuccessMessage(null);
      console.error('Erreur lors de la création du produit :', err);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, padding: 3 }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nom du produit"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Référence"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Courte description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Prix (€)"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
            <Autocomplete
              multiple
              options={
                categoriesData?.getAllCategories?.filter(
                  (cat) =>
                    !formData.categories.some(
                      (selected) => selected.id === cat.id
                    )
                ) || []
              }
              getOptionLabel={(option) => option.name}
              value={[]}
              onChange={(_, newValue) => {
                if (newValue.length > 0) {
                  const lastSelected = newValue[newValue.length - 1];

                  if (
                    !formData.categories.some(
                      (cat) => cat.id === lastSelected.id
                    )
                  ) {
                    setFormData((prev) => ({
                      ...prev,
                      categories: [...prev.categories, lastSelected]
                    }));
                  }
                }
              }}
              filterOptions={(options) =>
                options.filter(
                  (option) =>
                    !formData.categories.some((cat) => cat.id === option.id)
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Sélectionner une catégorie"
                  size="small"
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {formData.categories.length > 0 ? (
              formData.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  onDelete={() => {
                    setFormData((prev) => ({
                      ...prev,
                      categories: prev.categories.filter(
                        (cat) => cat.id !== category.id
                      )
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
                Aucune catégorie sélectionnée
              </Typography>
            )}
          </Box>
          <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
            <Autocomplete
              options={brandOptions}
              getOptionLabel={(option) => option.name}
              value={formData.brand}
              onChange={(_, newValue) =>
                setFormData((prev) => ({
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
              value={formData.isPublished ? 'true' : 'false'}
              onChange={(event) => {
                setFormData((prev) => ({
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
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ marginTop: 2, backgroundColor: 'green' }}
          >
            {loading ? 'Création en cours...' : 'Ajouter le Produit'}
          </Button>
        </Box>

        {successMessage && (
          <Typography color="success.main" variant="body2">
            {successMessage}
          </Typography>
        )}
        {error && (
          <Typography color="error.main" variant="body2">
            Une erreur s'est produite : {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
