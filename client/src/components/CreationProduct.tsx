import React, { useState } from 'react';

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import {
  GetAllProductsDocument,
  useCreateNewProductMutation
} from '../generated/graphql-types';
import axios from 'axios';

export default function CreationProduct() {
  // État pour le formulaire de produit
  const [formData, setFormData] = useState({
    name: '',
    reference: '',
    shortDescription: '',
    description: '',
    price: 0
  });

  // État pour les IDs des images
  const [imageIds, setImageIds] = useState<string[]>([]);

  // Messages de succès/erreur
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>('');
  const [loading, setLoading] = useState(false);

  const [createProduct] = useCreateNewProductMutation();

  // Gestion des changements dans les champs du formulaire
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  // Gestion de l'ajout des images
  const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const response = await axios.post<{ id: string }>(
        'http://localhost:3000/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setImageIds((prev) => [...prev, response.data.id]); // Ajouter l'ID de l'image
    } catch (err) {
      console.error("Erreur lors de l'upload de l'image :", err);
      setError("Erreur lors de l'upload de l'image.");
    } finally {
      setLoading(false);
    }
  };

  // Soumission du formulaire pour créer le produit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { name, reference, shortDescription, description, price } = formData;

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
      setImageIds([]); // Réinitialiser les images après succès
    } catch (err) {
      setError('Erreur lors de la création du produit.');
      console.error('Erreur :', err);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, padding: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Ajouter un Produit
        </Typography>
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
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Ajouter des Images
          </Typography>
          <TextField
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleAddImage}
            sx={{ display: 'block', marginBottom: 2 }}
          />
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
