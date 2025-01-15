import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAuth } from '../../context/AuthContext';
import { createAxiosInstance } from '../../services/axios.instance';

interface UploadResponse {
  id: string;
}

type Props = {
  brandId: number | null;
  setIsModifying: (value: boolean) => void;
  refetch: () => void;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1
});

const AddBrandImage = ({ brandId, setIsModifying, refetch }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<UploadResponse | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { logout } = useAuth();

  const axiosInstance = createAxiosInstance(logout);

  const handleClick = () => {
    setIsModifying(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddImage = async () => {
    if (!imageFile) {
      setError(new Error('Aucun fichier sélectionné'));
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('brand_id', brandId!.toString());

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.patch<UploadResponse>(
        '/upload/brands',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setData(response.data);
      setImageFile(null);
      setImagePreview(null);
      refetch();
      setIsModifying(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Erreur Axios :', e.response?.data || e.message);
        setError(e.response?.data.message || 'Une erreur est survenue.');
      }
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem'
      }}
    >
      <Typography>Ajouter une Image</Typography>
      <Box>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{
            borderRadius: '10px'
          }}
        >
          Choisir un fichier
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
            display: 'flex',
            maxWidth: '200px',
            height: 'auto'
          }}
        />
      )}

      <Button
        type="submit"
        onClick={handleAddImage}
        sx={{
          marginTop: 2,
          backgroundColor: 'green',
          borderRadius: '10px',
          padding: '5px 20px',
          color: 'white',
          '&:disabled': {
            backgroundColor: 'darkgrey',
            color: 'black'
          }
        }}
        disabled={loading || !imageFile}
      >
        {loading ? 'Ajout en cours...' : 'Ajouter'}
      </Button>
      <Button
        onClick={handleClick}
        sx={{
          marginTop: 1,
          backgroundColor: 'red',
          borderRadius: '10px',
          padding: '5px 20px',
          color: 'white',
          '&:disabled': {
            backgroundColor: 'darkgrey',
            color: 'black'
          }
        }}
      >
        Annuler
      </Button>

      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error.message || 'Une erreur est survenue.'}
        </Typography>
      )}

      {data && (
        <Typography color="primary" sx={{ marginTop: 2 }}>
          Image ajoutée avec succès {data.id}
        </Typography>
      )}
    </Box>
  );
};

export default AddBrandImage;
