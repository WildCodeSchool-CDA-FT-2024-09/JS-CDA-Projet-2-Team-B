import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useCreateBrandMutation } from '../../generated/graphql-types';
import AddBrandImage from './AddBrandImage';
import { useOutletContext } from 'react-router-dom';

interface BrandReq {
  name: string;
  description: string;
}

export default function AddBrand() {
  const [brand, setBrand] = useState<BrandReq>({
    name: '',
    description: ''
  });
  const [createBrand, { loading, error }] = useCreateBrandMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [imageSelection, setImageSelection] = useState(false);
  const [brandId, setBrandId] = useState<number | null>(null);

  const { triggerRefresh } = useOutletContext<{ triggerRefresh: () => void }>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBrand((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!brand.name) {
      return;
    }

    try {
      const { data } = await createBrand({
        variables: {
          data: {
            name: brand.name,
            description: brand.description
          }
        }
      });

      if (data?.createBrand) {
        setBrand({
          name: '',
          description: ''
        });
        setSuccessMessage('Marque créée avec succès !');
        setImageSelection(true);
        setBrandId(data.createBrand.id);
      }

      triggerRefresh();
    } catch (err) {
      setSuccessMessage(null);
      console.error('Erreur lors de la création de la marque :', err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        margin: '10rem',
        marginLeft: '20rem',
        gap: '10rem'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          m: 1,
          width: '60ch',
          height: 'fit-content',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          maxWidth: 400,
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
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
          value={brand.name}
          onChange={handleChange}
          placeholder="Nom"
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
          required
          id="outlined-required"
          name="description"
          value={brand.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <Button
          variant="contained"
          disabled={loading}
          color="primary"
          type="submit"
          sx={{
            width: '20ch',
            alignSelf: 'flex-end'
          }}
        >
          Enregistrer
        </Button>
        {successMessage && (
          <Typography
            color="success.main"
            variant="body2"
            sx={{
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            {successMessage}
          </Typography>
        )}
        {error && (
          <Typography
            color="error.main"
            variant="body2"
            sx={{
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            Une erreur s'est produite : {error.message}
          </Typography>
        )}
      </Box>
      {imageSelection && (
        <AddBrandImage
          brandId={brandId}
          setIsModifying={setImageSelection}
          refetch={() => {}}
        />
      )}
    </Box>
  );
}
