import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Typography, Box, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { Check } from '@mui/icons-material';

interface UploadResponse {
  id: string;
}

type Props = {
  productId: number;

  handleBlock: (isBlock: boolean) => void;
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

const AddImage = ({ productId, handleBlock }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<UploadResponse | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMain, setIsMain] = useState<boolean>(false);

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
    formData.append('product_id', productId.toString());
    formData.append('isMain', isMain.toString());

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<UploadResponse>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setData(response.data);
      setImageFile(null);
      setImagePreview(null);
      const isBlocked = false;
      handleBlock(isBlocked);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        padding: 3,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        marginTop: 5
      }}
    >
      <Typography>Ajouter une Image</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
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
            maxWidth: '60%',
            height: 'auto',
            marginBottom: 2,
            borderRadius: 1,
            border: '1px solid #ccc'
          }}
        />
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/*<Box sx={{ marginBottom: 2 }}>
          <Typography>Product ID</Typography>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Entrer l'ID du produit"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        </Box>*/}

        <Box sx={{ marginBottom: 2 }}>
          <Typography>Image principale ?</Typography>
          <input
            type="checkbox"
            checked={isMain}
            onChange={(e) => setIsMain(e.target.checked)}
            style={{ marginTop: '8px' }}
          />
        </Box>
      </Box>

      <Button
        type="submit"
        onClick={handleAddImage}
        sx={{
          marginTop: 2,
          backgroundColor: 'green',
          color: 'white'
        }}
        disabled={loading || !imageFile}
      >
        {loading ? 'Ajout en cours...' : 'Ajouter +'}
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
    </Card>
  );
};

export default AddImage;
