import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Typography, TextField } from '@mui/material';

interface UploadResponse {
  id: string;
}

const AddImage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<UploadResponse | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddImage = async () => {
    if (!imageFile) {
      setError(new Error('Aucun fichier sélectionné'));
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<UploadResponse>(
        'http://localhost:3000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setData(response.data);
      setImageFile(null); // Réinitialiser l'état après succès
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, padding: 3 }}>
      <TextField
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={handleFileChange}
        sx={{
          display: 'block',
          marginBottom: 2
        }}
      />
      <Button
        type="submit"
        onClick={handleAddImage}
        sx={{ marginTop: 2, backgroundColor: 'green' }}
        disabled={loading || !imageFile}
      >
        {loading ? 'Ajout en cours...' : 'Ajouter'}
      </Button>
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error.message || 'Une erreur est survenue.'}
        </Typography>
      )}
      {data && (
        <Typography color="primary" sx={{ marginTop: 2 }}>
          Image ajoutée avec l'ID: {data.id}
        </Typography>
      )}
    </Card>
  );
};

export default AddImage;
