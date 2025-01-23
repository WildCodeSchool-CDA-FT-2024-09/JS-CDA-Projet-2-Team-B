import Card from '@mui/material/Card';
import { Link as RouterLink } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia, Link as MUILink } from '@mui/material';
import { Grid } from '@mui/system';

const styleButton = {
  padding: '4px 10px',
  borderRadius: '5px',
  margin: 0.6,
  color: 'primary.contrastText',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontFamily: "'Roboto', sans-serif"
};

type Brand = {
  id: number;
  name: string;
  description: string;
  deletedAt: Date | null;
  image?: {
    id: number;
    url: string;
  } | null;
  refetch: () => void;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function BrandCard({ id, name, image }: Brand) {
  return (
    <Card
      sx={{
        minWidth: '12%',
        minHeight: '45%',
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 1,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2">
          {image && (
            <CardMedia
              component="img"
              height="100%"
              image={`${BASE_URL}${image.url}`}
              style={{
                maxWidth: '80px',
                maxHeight: '100px',
                minWidth: '80px',
                minHeight: '50px',
                width: 'auto',
                height: 'auto',
                margin: '0 auto'
              }}
              alt="logo de la marque"
            />
          )}
        </Typography>
      </CardContent>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}
      >
        <MUILink
          component={RouterLink}
          to={`/brand/${id}/edit`}
          sx={{ ...styleButton, backgroundColor: 'green' }}
        >
          Modifier
        </MUILink>
      </Grid>
    </Card>
  );
}
