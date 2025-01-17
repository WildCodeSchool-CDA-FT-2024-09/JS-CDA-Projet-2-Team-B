import { Box, Button, CardMedia } from '@mui/material';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
  image?: {
    id: number;
    url: string;
  } | null;
  isModifying: boolean;
  setIsModifying: (value: boolean) => void;
  refetch: () => void;
};

export default function DisplayBrandImage({
  image,
  isModifying,
  setIsModifying,
  refetch
}: Props) {
  const handleClick = () => {
    setIsModifying(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/upload/brands', {
        data: { image_id: image?.id }
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '250px'
        }}
      >
        {image && !isModifying && (
          <CardMedia
            component="img"
            height="100%"
            image={`${BASE_URL}${image.url}`}
            sx={{
              display: 'flex',
              maxWidth: '150px',
              height: 'auto',
              margin: '0 auto',
              borderRadius: '5px',
              marginTop: '10px'
            }}
            alt="logo de la marque"
          />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={{
              marginTop: '20px',
              borderRadius: '10px'
            }}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleDelete}
            color="primary"
            sx={{
              marginTop: '20px',
              borderRadius: '10px'
            }}
          >
            Supprimer
          </Button>
        </Box>
      </Box>
    </>
  );
}
