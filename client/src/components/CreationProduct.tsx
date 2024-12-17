import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  GetAllProductsDocument,
  useCreateNewProductMutation
} from '../generated/graphql-types';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1
});

const CombinedComponent: React.FC = () => {
  // État pour les champs du produit
  const [formData, setFormData] = useState({
    name: '',
    reference: '',
    shortDescription: '',
    description: '',
    price: 0
  });

  // État pour les IDs des images
  const [imageIds, setImageIds] = useState<number[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [createProduct] = useCreateNewProductMutation();

  // Gestion des changements dans le formulaire
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  // Upload de l'image dès sa sélection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file)); // Prévisualisation
      const formData = new FormData();
      formData.append('image', file);

      try {
        setLoading(true);
        const response = await axios.post<{ id: string }>(
          'http://localhost:3000/upload',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setImageIds((prev) => [...prev, parseInt(response.data.id, 10)]);
      } catch {
        setError("Erreur lors de l'upload de l'image.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Soumission du formulaire pour créer le produit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { name, reference, shortDescription, description, price } = formData;
    if (!name || !reference || price < 0) {
      setError(
        'Veuillez remplir tous les champs obligatoires avec des valeurs valides.'
      );
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
            imageIds
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
              }>;
            }>({ query: GetAllProductsDocument });

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
        price: 0
      });
      setImageIds([]);
    } catch {
      setError('Erreur lors de la création du produit.');
    }
  };

  return (
    <Card sx={{ maxWidth: 600, padding: 3, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Ajouter un Produit
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Champs du produit */}
          <TextField
            label="Nom du produit"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Référence"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Courte description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Prix (€)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          {/* Gestion des images */}
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Ajouter des Images
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Choisir une image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Prévisualisation"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                border: '1px solid #ccc',
                borderRadius: 1,
                marginBottom: 2
              }}
            />
          )}

          {/* Soumission du produit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ backgroundColor: 'green' }}
          >
            {loading ? 'Création en cours...' : 'Créer le Produit'}
          </Button>
        </Box>

        {/* Messages de succès ou d'erreur */}
        {successMessage && (
          <Typography
            color="success.main"
            variant="body2"
            sx={{ marginTop: 2 }}
          >
            {successMessage}
          </Typography>
        )}
        {error && (
          <Typography color="error.main" variant="body2" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CombinedComponent;
