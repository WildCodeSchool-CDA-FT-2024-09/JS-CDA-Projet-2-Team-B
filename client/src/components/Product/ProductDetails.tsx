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
  FormControlLabel,
  Card,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  GetAllBrandsDocument,
  useDeleteProductMutation,
  useGetAllCategoriesQuery,
  useGetAllCharacteristicQuery,
  useGetAllTagsQuery,
  useGetProductByIdQuery,
  useRestoreProductMutation,
  useUpdateProductMutation
} from '../../generated/graphql-types';
import { useLazyQuery } from '@apollo/client';
import { CustomSwitch } from '../../ui/Switch';
import axios from 'axios';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface ProductDetailsReq {
  name: string;
  reference: string;
  shortDescription: string;
  description: string;
  price: number;
  isPublished: boolean;
  categories?: { id: number; name: string }[] | null;
  tags?: { id: number; name: string }[] | null;
  brand: { id: number; name: string } | null;
  isActive: boolean;
  images?: { id: number; url: string; isMain: boolean }[];
  characteristicValues?:
    | {
        id: number;
        value: string;
        characteristic: {
          id: number;
          name: string;
        };
      }[]
    | null;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{
    productId: string;
    imageId: number;
  } | null>(null);
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: characteristicsData } = useGetAllCharacteristicQuery();
  const [getBrands, { data: brandsData }] = useLazyQuery(GetAllBrandsDocument);
  const { data: tagsData } = useGetAllTagsQuery();
  const [brandInputValue, setBrandInputValue] = useState('');
  const [displayProductDetails, setDisplayProductDetails] = useState(true);
  const [displayImagePreview, setDisplayImagePreview] = useState(false);
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
    tags: [],
    brand: null,
    isActive: true,
    images: []
  });

  const {
    loading,
    error: fetchError,
    data,
    refetch
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
          refetchQueries: ['getProductById']
        });
      } else {
        await deleteProduct({
          variables: { id: parseInt(id!) },
          refetchQueries: ['getProductById']
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
            tagIds: product.tags?.map((tag) => tag.id) || [],
            brand: product.brand!.id,
            characteristicValues: product.characteristicValues?.map((char) => ({
              characteristicId: char.characteristic.id,
              value: char.value
            }))
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
          isPublished: data.updateProduct.isPublished ?? true,
          categories: data.updateProduct.categories || [],
          tags: data.updateProduct.tags || [],
          brand: data.updateProduct.brand as { id: number; name: string },
          isActive: product.isActive,
          characteristicValues: data.updateProduct.characteristicValues || []
        });
        setError(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteImage = async (productId: string, imageId: number) => {
    setImageToDelete({ productId, imageId });
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return;

    try {
      const response = await axios.delete(
        `${BASE_URL}/products/${imageToDelete.productId}/images/${imageToDelete.imageId}`
      );

      if (response.data.status === 'success') {
        setProduct((prev) => ({
          ...prev,
          images:
            prev.images?.filter((img) => img.id !== imageToDelete.imageId) || []
        }));
        await refetch();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setError("Erreur lors de la suppression de l'image");
    } finally {
      setOpenDialog(false);
      setImageToDelete(null);
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
        tags: data.getProductById.tags || [],
        brand: data.getProductById.brand as { id: number; name: string },
        images: data.getProductById.images || [],
        isActive: !data.getProductById.deletedAt,
        characteristicValues: data.getProductById.characteristicValues || []
      });
    } else if (fetchError) {
      setError(fetchError.message);
    }
  }, [data, fetchError]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: '2rem',
          backgroundColor: '#f9f9f9',
          padding: '1rem 1.5rem 1rem 1.5rem',
          borderRadius: '8px 8px 0 0',
          width: '90%',
          marginTop: '1rem'
        }}
      >
        <Typography variant="h6">
          <strong>Informations produit</strong>
        </Typography>
        {displayProductDetails ? (
          <Typography>
            <KeyboardArrowUp
              onClick={() => setDisplayProductDetails((prev) => !prev)}
            />
          </Typography>
        ) : (
          <Typography>
            <KeyboardArrowDown
              onClick={() => setDisplayProductDetails((prev) => !prev)}
            />
          </Typography>
        )}
      </Box>
      {displayProductDetails && (
        <Box
          sx={{
            display: 'flex',
            width: '90%',
            marginLeft: '2rem',
            padding: 3,
            backgroundColor: '#f9f9f9',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 2px 0 rgba(0, 0, 0, 0.1)'
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%'
            }}
          >
            <FormControlLabel
              control={
                <CustomSwitch
                  checked={product.isActive}
                  onChange={handleSwitchChange}
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
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%'
              }}
            >
              <Box>
                <TextField
                  required
                  label="Nom du produit"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Nom"
                  fullWidth
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <TextField
                  disabled
                  label="Référence"
                  id="outlined-required"
                  name="reference"
                  value={product.reference}
                  onChange={handleChange}
                  placeholder="Reference"
                  sx={{ width: '40%' }}
                />
                <FormControl
                  sx={{
                    width: '55%'
                  }}
                >
                  <InputLabel id="status-label">
                    Statut de publication
                  </InputLabel>
                  <Select
                    labelId="status-label"
                    value={product.isPublished}
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
              </Box>
              <TextField
                label="Courte description"
                name="shortDescription"
                value={product.shortDescription}
                onChange={handleChange}
                placeholder="Courte description"
                fullWidth
                multiline
                rows={2}
              />
              <TextField
                label="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Description"
                fullWidth
                multiline
                rows={5}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <TextField
                  label="Prix (€)"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Prix (€)"
                  sx={{ width: '40%' }}
                />
                <FormControl sx={{ width: '55%' }}>
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
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              marginLeft: '2rem'
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Catégories
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {product.categories &&
                product.categories.length > 0 &&
                product.categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={category.name}
                    variant="filled"
                    color="primary"
                    sx={{
                      marginTop: '0.5rem'
                    }}
                    onDelete={() => {
                      setProduct((prev) => ({
                        ...prev,
                        categories:
                          prev.categories?.filter(
                            (cat) => cat.id !== category.id
                          ) || []
                      }));
                    }}
                  />
                ))}
            </Box>
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, marginTop: '1rem' }}
            >
              Tags
            </Typography>
            <FormControl fullWidth>
              <Autocomplete
                multiple
                options={tagsData?.getAllTags || []}
                getOptionLabel={(option) => option.name}
                value={[]}
                onChange={(_, newValue) => {
                  if (newValue.length > 0) {
                    const newTags = newValue.filter(
                      (newTag) =>
                        !product.tags?.some(
                          (existingTag) => existingTag.id === newTag.id
                        )
                    );

                    setProduct((prev) => ({
                      ...prev,
                      tags: [...(prev.tags || []), ...newTags]
                    }));
                  }
                }}
                filterOptions={(options) =>
                  options.filter(
                    (option) =>
                      !product.tags?.some((tag) => tag.id === option.id)
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Rechercher des tags"
                    size="small"
                  />
                )}
              />
            </FormControl>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {product.tags &&
                product.tags.length > 0 &&
                product.tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    variant="filled"
                    color="secondary"
                    sx={{
                      marginTop: '0.5rem'
                    }}
                    onDelete={() => {
                      setProduct((prev) => ({
                        ...prev,
                        tags: prev.tags?.filter((t) => t.id !== tag.id) || []
                      }));
                    }}
                  />
                ))}
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              marginLeft: '2rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Caractéristiques
            </Typography>
            <FormControl fullWidth>
              <Autocomplete
                options={characteristicsData?.getAllCharacteristic || []}
                getOptionLabel={(option) => option.name}
                value={null}
                onChange={(_, newValue) => {
                  if (newValue) {
                    if (
                      !product.characteristicValues?.some(
                        (char) => char.characteristic.id === newValue.id
                      )
                    ) {
                      setProduct((prev) => ({
                        ...prev,
                        characteristicValues: [
                          ...(prev.characteristicValues || []),
                          {
                            id: 0,
                            value: '',
                            characteristic: {
                              id: newValue.id,
                              name: newValue.name
                            }
                          }
                        ]
                      }));
                    }
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Ajouter une caractéristique"
                    size="small"
                    sx={{ marginBottom: '0.5rem' }}
                  />
                )}
              />
            </FormControl>
            {product.characteristicValues?.map((char) => (
              <Box
                key={char.characteristic.id}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  backgroundColor: 'background.paper',
                  p: 1,
                  borderRadius: 1,
                  paddingLeft: '1rem',
                  marginBottom: '0.5rem 0',
                  borderBottom: '0.5px solid'
                }}
              >
                <Typography sx={{ minWidth: 150, fontWeight: 'medium' }}>
                  {char.characteristic.name}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={char.value}
                  onChange={(e) => {
                    setProduct((prev) => ({
                      ...prev,
                      characteristicValues:
                        prev.characteristicValues?.map((c) =>
                          c.characteristic.id === char.characteristic.id
                            ? { ...c, value: e.target.value }
                            : c
                        ) || []
                    }));
                  }}
                  placeholder="Entrer une valeur"
                  disabled={loading}
                />
                <IconButton
                  onClick={() => {
                    setProduct((prev) => ({
                      ...prev,
                      characteristicValues: prev.characteristicValues?.filter(
                        (c) => c.characteristic.id !== char.characteristic.id
                      )
                    }));
                  }}
                  color="error"
                  size="small"
                  disabled={loading}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 'auto'
              }}
            >
              <Button
                variant="contained"
                disabled={updateLoading || !product.isActive}
                color="primary"
                type="submit"
                sx={{
                  alignSelf: 'flex-end'
                }}
              >
                Enregistrer
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          marginLeft: '2rem',
          backgroundColor: '#f9f9f9',
          padding: '1rem 1.5rem 1rem 1.5rem',
          borderRadius: '8px 8px 0 0',
          width: '90%',
          marginTop: '1rem',
          marginBottom: '1rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">
            <strong>Associer une image</strong>
          </Typography>
          {displayImagePreview ? (
            <Typography>
              <KeyboardArrowUp
                onClick={() => setDisplayImagePreview((prev) => !prev)}
              />
            </Typography>
          ) : (
            <Typography>
              <KeyboardArrowDown
                onClick={() => setDisplayImagePreview((prev) => !prev)}
              />
            </Typography>
          )}
        </Box>
        {displayImagePreview && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {product.images && product.images.length > 0 && (
              <Card
                sx={{
                  boxShadow: 'none',
                  backgroundColor: 'transparent',
                  marginTop: '5rem',
                  width: '100%',
                  maxWidth: '20rem'
                }}
              >
                <CardMedia
                  component="img"
                  height="auto"
                  image={
                    product.images.find((img) => img.isMain)?.url
                      ? `${BASE_URL}${product.images.find((img) => img.isMain)?.url}`
                      : `${BASE_URL}${product.images[0].url}`
                  }
                  alt="image du produit"
                />
                <Box
                  sx={{
                    borderRadius: '50%'
                  }}
                >
                  <IconButton
                    onClick={() =>
                      handleDeleteImage(id!, product.images![0].id)
                    }
                    size="small"
                    sx={{
                      '&:hover': {
                        color: 'error.main'
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            )}
          </Box>
        )}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirmer la suppression
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Êtes-vous sûr de vouloir supprimer cette image ? Cette action ne
              peut pas être annulée.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={confirmDelete} color="error" autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
