import Card from '@mui/material/Card';
import { Link as RouterLink } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link as MUILink } from '@mui/material';
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
  logo: string;
  deletedAt: Date | null;
  refetch: () => void;
};

export default function BrandCard({ id, name, logo }: Brand) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 4
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          {name}
        </Typography>
        <Typography variant="body2"> {logo}</Typography>
      </CardContent>
      <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
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
