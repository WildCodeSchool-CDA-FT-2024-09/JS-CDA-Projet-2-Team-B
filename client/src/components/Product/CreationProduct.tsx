import React, { useEffect, useState } from 'react';
import {
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
  MenuItem,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  GetAllBrandsDocument,
  GetAllProductsDocument,
  useCreateNewProductMutation,
  useGetAllCategoriesQuery,
  useGetAllCharacteristicQuery,
  useGetAllTagsQuery
} from '../../generated/graphql-types';
import { useLazyQuery } from '@apollo/client';

type ProductCharacteristic = {
  characteristicId: number;
  name: string;
  value: string;
};

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
  characteristics: ProductCharacteristic[];
};

type Props = {
  handleProductId: (id: number) => void;
  block: boolean;
  resetForm?: boolean;
};

const initialValue: newProduct = {
  name: '',
  reference: '',
  shortDescription: '',
  description: '',
  price: '',
  brand: null as { id: number; name: string } | null,
  categories: [] as Array<{ id: number; name: string }>,
  tags: [] as Array<{ id: number; name: string }>,
  isPublished: true,
  characteristics: []
};

export default function CreationProduct({
  handleProductId,
  block,
  resetForm
}: Props) {
  const [formProduct, setFormProduct] = useState(initialValue);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>('');
  const [createProduct, { loading }] = useCreateNewProductMutation();
  const [brandInputValue, setBrandInputValue] = useState('');
  const [brandOptions, setBrandOptions] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: characteristicsData, loading: loadingCharacteristics } =
    useGetAllCharacteristicQuery();
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

  useEffect(() => {
    if (resetForm) {
      setFormProduct(initialValue);
    }
  }, [resetForm]);

  const handleAddCharacteristic = (characteristic: {
    id: number;
    name: string;
  }) => {
    if (
      !formProduct.characteristics.some(
        (c) => c.characteristicId === characteristic.id
      )
    ) {
      setFormProduct((prev) => ({
        ...prev,
        characteristics: [
          ...prev.characteristics,
          {
            characteristicId: characteristic.id,
            name: characteristic.name,
            value: ''
          }
        ]
      }));
    }
  };

  const handleCharacteristicValueChange = (
    characteristicId: number,
    value: string
  ) => {
    setFormProduct((prev) => ({
      ...prev,
      characteristics: prev.characteristics.map((char) =>
        char.characteristicId === characteristicId ? { ...char, value } : char
      )
    }));
  };

  const handleRemoveCharacteristic = (characteristicId: number) => {
    setFormProduct((prev) => ({
      ...prev,
      characteristics: prev.characteristics.filter(
        (char) => char.characteristicId !== characteristicId
      )
    }));
  };

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
            brand: brand ? brand.id : null,
            characteristicValues: formProduct.characteristics.map((char) => ({
              characteristicId: char.characteristicId,
              value: char.value
            }))
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
    <Box
      sx={{
        maxWidth: 1200,
        margin: 'auto',
        marginTop: 5,
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Nom du produit"
              name="name"
              value={formProduct.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Référence"
              name="reference"
              value={formProduct.reference}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Courte description"
              name="shortDescription"
              value={formProduct.shortDescription}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formProduct.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={1}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Prix (€)"
              name="price"
              type="number"
              value={formProduct.price}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
              <Autocomplete
                options={
                  characteristicsData?.getAllCharacteristic?.filter(
                    (char) =>
                      !formProduct.characteristics.some(
                        (c) => c.characteristicId === char.id
                      )
                  ) || []
                }
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ajouter une caractéristique"
                    placeholder="Sélectionner une caractéristique"
                  />
                )}
                onChange={(_, newValue) => {
                  if (newValue) {
                    handleAddCharacteristic(newValue);
                  }
                }}
                disabled={loading || loadingCharacteristics}
              />
            </FormControl>
          </Box>

          {formProduct.characteristics.map((char) => (
            <Box
              key={char.characteristicId}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundColor: 'background.paper',
                p: 2,
                borderRadius: 1
              }}
            >
              <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>
                {char.name}
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={char.value}
                onChange={(e) =>
                  handleCharacteristicValueChange(
                    char.characteristicId,
                    e.target.value
                  )
                }
                placeholder="Entrer une valeur"
                disabled={loading}
              />
              <IconButton
                onClick={() =>
                  handleRemoveCharacteristic(char.characteristicId)
                }
                color="error"
                size="small"
                disabled={loading}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <FormControl fullWidth>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
          <FormControl fullWidth>
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
          <FormControl fullWidth>
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
          <FormControl fullWidth>
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
            sx={{ backgroundColor: 'green' }}
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
            {successMessage}
          </Typography>
        )}
      </CardContent>
    </Box>
  );
}
