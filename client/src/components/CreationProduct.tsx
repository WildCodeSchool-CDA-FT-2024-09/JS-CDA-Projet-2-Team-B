import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useCreateNewProductMutation } from '../generated/graphql-types';

export default function CreationProduct() {
  const [formData, setFormData] = useState({
    name: '',
    reference: '',
    shortDescription: '',
    description: '',
    price: ''
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createProduct, { loading, error }] = useCreateNewProductMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { name, reference, shortDescription, description, price } = formData;

    try {
      await createProduct({
        variables: {
          data: {
            name,
            reference,
            shortDescription,
            description,
            price: parseFloat(price)
          }
        }
      });
      setSuccessMessage('Produit créé avec succès !');
      setFormData({
        name: '',
        reference: '',
        shortDescription: '',
        description: '',
        price: ''
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
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
            Une erreur s'est produite : {error.message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
