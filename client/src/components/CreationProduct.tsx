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
  useGetAllCategoriesQuery,
  useGetAllTagsQuery
} from '../generated/graphql-types';
import { useLazyQuery } from '@apollo/client';

type newProduct = {
  name: string;
  reference: string;
  shortDescription: string;
  description: string;
  price: number;
  brand: { id: number; name: string } | null;
  categories: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
  isPublished: boolean;
};

type Props = {
  handleProductId: (id: number) => void;
  block: boolean;
};

const initialValue: newProduct = {
  name: '',
  reference: '',
  shortDescription: '',
  description: '',
  price: null,
  brand: null as { id: number; name: string } | null,
  categories: [] as Array<{ id: number; name: string }>,
  tags: [] as Array<{ id: number; name: string }>,
  isPublished: true
};

export default function CreationProduct({ handleProductId, block }: Props) {
  const [formProduct, setFormProduct] = useState(initialValue);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>('');
  const [createProduct, { loading }] = useCreateNewProductMutation();
  const [brandInputValue, setBrandInputValue] = useState('');
  const [brandOptions, setBrandOptions] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: tagsData } = useGetAllTagsQuery();
  const [getBrands, { data: brandsData }] = useLazyQuery(GetAllBrandsDocument);

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
    if (!block) {
      const { name, value } = event.target;
      setFormProduct((prev) => ({
        ...prev,
        [name]:
          name === 'price' ? (value === '' ? '' : parseFloat(value)) : value
      }));
    } else {
      setError('Veuillez choisir une image avant de passer à la suite');
    }
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
      tags,
      brand,
      isPublished
    } = formProduct;

    if (!name || !reference) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (typeof price === 'number' && price < 0) {
      setError('Le prix doit être un nombre positif.');
      return;
    }

    try {
      const { data } = await createProduct({
        variables: {
          data: {
            name,
            reference,
            shortDescription,
            description,
            price,
            isPublished,
            categoryIds: categories.map((cat) => cat.id),
            tagIds: tags.map((tag) => tag.id),
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

      setFormProduct({
        name: '',
        reference: '',
        shortDescription: '',
        description: '',
        price: 0,
        isPublished: true,
        categories: [],
        tags: [],
        brand: null
      });
      if (data?.createNewProduct?.id) {
        setSuccessMessage(
          'Produit créé avec succès ! Veuillez maintenant ajouter des images '
        );
        handleProductId(data?.createNewProduct?.id);
      }
    } catch (err) {
      setSuccessMessage(null);
      console.error('Erreur lors de la création du produit :', err);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, padding: 3, margin: 'auto', marginTop: 5 }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nom du produit"
            name="name"
            value={formProduct.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Référence"
            name="reference"
            value={formProduct.reference}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Courte description"
            name="shortDescription"
            value={formProduct.shortDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formProduct.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Prix (€)"
            name="price"
            type="number"
            value={formProduct.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{
              '& input[type=number]': {
                '-moz-appearance': 'textfield',
                '-webkit-appearance': 'none',
                margin: 0
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none'
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none'
              }
            }}
          />
          <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
            <Autocomplete
              multiple
              options={
                categoriesData?.getAllCategories?.filter(
                  (cat) =>
                    !formProduct.categories.some(
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
                    !formProduct.categories.some(
                      (cat) => cat.id === lastSelected.id
                    )
                  ) {
                    setFormProduct((prev) => ({
                      ...prev,
                      categories: [...prev.categories, lastSelected]
                    }));
                  }
                }
              }}
              filterOptions={(options) =>
                options.filter(
                  (option) =>
                    !formProduct.categories.some((cat) => cat.id === option.id)
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
            {formProduct.categories.length > 0 ? (
              formProduct.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  onDelete={() => {
                    setFormProduct((prev) => ({
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
              multiple
              options={
                tagsData?.getAllTags?.filter(
                  (tag) =>
                    !formProduct.tags.some((selected) => selected.id === tag.id)
                ) || []
              }
              getOptionLabel={(option) => option.name}
              value={[]}
              onChange={(_, newValue) => {
                if (newValue.length > 0) {
                  const lastSelected = newValue[newValue.length - 1];

                  if (
                    !formProduct.tags.some((tag) => tag.id === lastSelected.id)
                  ) {
                    setFormProduct((prev) => ({
                      ...prev,
                      tags: [...prev.tags, lastSelected]
                    }));
                  }
                }
              }}
              filterOptions={(options) =>
                options.filter(
                  (option) =>
                    !formProduct.tags.some((tag) => tag.id === option.id)
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Sélectionner un tag"
                  size="small"
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {formProduct.tags.length > 0 ? (
              formProduct.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  onDelete={() => {
                    setFormProduct((prev) => ({
                      ...prev,
                      tags: prev.tags.filter((t) => t.id !== tag.id)
                    }));
                  }}
                  sx={{
                    backgroundColor: '#e3f2fd',
                    borderRadius: '20px',
                    margin: '4px',
                    padding: '4px 8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: '#e3f2fd'
                    },
                    '& .MuiChip-label': {
                      color: 'text.primary'
                    },
                    '& .MuiChip-deleteIcon': {
                      color: '#1976d2',
                      '&:hover': {
                        color: '#1976d2',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        borderRadius: '50%'
                      }
                    }
                  }}
                />
              ))
            ) : (
              <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Aucun tag sélectionné
              </Typography>
            )}
          </Box>
          <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
            <Autocomplete
              options={brandOptions}
              getOptionLabel={(option) => option.name}
              value={formProduct.brand}
              onChange={(_, newValue) =>
                setFormProduct((prev) => ({
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
              value={formProduct.isPublished ? 'true' : 'false'}
              onChange={(event) => {
                setFormProduct((prev) => ({
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
