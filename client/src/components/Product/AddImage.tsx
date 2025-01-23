import React, { useState } from 'react';
import { Button, Typography, Box, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createAxiosInstance } from '../../services/axios.instance';
import { useAuth } from '../../context/AuthContext';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface UploadResponse {
  id: string;
}

type Props = {
  productId: number;
  onImageAdded: () => void;
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

const AddImage = ({ productId, handleBlock, onImageAdded }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<UploadResponse | null>(null);
  const [displayStepTwo, setDisplayStepTwo] = useState<boolean>(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMain, setIsMain] = useState<boolean>(false);
  const { logout } = useAuth();

  const axiosInstance = createAxiosInstance(logout);

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
      const response = await axiosInstance.post<UploadResponse>(
        '/upload/products',
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
      setIsMain(false);

      onImageAdded();

      const isBlocked = false;
      handleBlock(isBlocked);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          marginLeft: '2rem',
          backgroundColor: '#f9f9f9',
          padding: '1rem 1.5rem 1rem 1.5rem',
          borderRadius: '8px 8px 0 0',
          width: '90%',
          marginTop: '1rem'
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
          {displayStepTwo ? (
            <Typography>
              <KeyboardArrowUp
                onClick={() => setDisplayStepTwo((prev) => !prev)}
              />
            </Typography>
          ) : (
            <Typography>
              <KeyboardArrowDown
                onClick={() => setDisplayStepTwo((prev) => !prev)}
              />
            </Typography>
          )}
        </Box>
        {displayStepTwo && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              sx={{
                width: '15rem',
                marginBottom: '1rem'
              }}
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

            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="Prévisualisation"
                sx={{
                  display: 'flex',
                  maxWidth: '25%',
                  padding: '1rem',
                  height: 'auto',
                  marginBottom: 2,
                  borderRadius: 1,
                  border: '1px solid #ccc'
                }}
              />
            )}
            <Button
              type="submit"
              onClick={handleAddImage}
              sx={{
                marginTop: 2,
                backgroundColor: 'green',
                color: 'white',
                width: '15rem',
                '&.Mui-disabled': {
                  backgroundColor: 'grey',
                  color: 'white'
                }
              }}
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
              <Typography color="success" sx={{ marginTop: 2 }}>
                Image ajoutée avec succès
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default AddImage;
