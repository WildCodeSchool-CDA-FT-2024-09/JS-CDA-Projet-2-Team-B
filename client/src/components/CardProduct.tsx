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

type Products = {
  id: number;
  name: string;
  price: number;
  reference: string;
  shortDescription: string;
  description: string;
  compact?: boolean; // Ajout de cette prop
};

export default function CardProduct({
  id,
  name,
  price,
  reference,
  shortDescription,
  description,
  compact = false // Valeur par défaut
}: Products) {
  return (
    <Card
      sx={{
        maxWidth: compact ? '100%' : 300,
        margin: compact ? 0 : 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: compact ? 0 : 4,
        padding: compact ? 0 : 1
      }}
    >
      {!compact && (
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {name}
          </Typography>
          <Typography variant="body2"> {reference}</Typography>
          <Typography variant="body2"> {price}</Typography>
          <Typography variant="body2"> {shortDescription}</Typography>
          <Typography variant="body2"> {description}</Typography>
        </CardContent>
      )}
      <Grid
        sx={{ display: 'flex', justifyContent: 'end', margin: compact ? 0 : 1 }}
      >
        <MUILink
          component={RouterLink}
          to={`/product/${id}/edit`}
          sx={{ ...styleButton, backgroundColor: 'green' }}
        >
          Modifier
        </MUILink>
        <MUILink
          component={RouterLink}
          to="/"
          sx={{ ...styleButton, backgroundColor: 'info.main' }}
        >
          Activer
        </MUILink>
      </Grid>
    </Card>
  );
}
