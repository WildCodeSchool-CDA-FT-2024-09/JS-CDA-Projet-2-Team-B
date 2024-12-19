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

type newProduct = {
  name: string;
  reference: string;
  shortDescription: string;
  description: string;
  price: number;
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
  price: 0
};

export default function CreationProduct({ handleProductId, block }: Props) {
  const [formData, setFormData] = useState<newProduct>(initialValue);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>('');
  const [createProduct, { loading }] = useCreateNewProductMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!block) {
      const { name, value } = event.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || 0 : value
      }));
    } else {
      setError('Veuillez choisir une image avant de passer à la suite');
    }
  };

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
      const { data } = await createProduct({
        variables: {
          data: {
            name,
            reference,
            shortDescription,
            description,
            price
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

      // Verrouillage du produit (bouton ADD")
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
            Une erreur s'est produite : {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
