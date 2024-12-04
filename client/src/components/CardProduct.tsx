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
  name: string;
  price: number;
  reference: string;
  shortDescription: string;
  description: string;
};

export default function CardProduct({
  name,
  price,
  reference,
  shortDescription,
  description
}: Products) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 4
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          {name}
        </Typography>
        <Typography variant="body2"> {reference}</Typography>
        <Typography variant="body2"> {price}</Typography>
        <Typography variant="body2"> {shortDescription}</Typography>
        <Typography variant="body2"> {description}</Typography>
      </CardContent>
      <Grid sx={{ display: 'flex', justifyContent: 'end', marginRight: 1 }}>
        <MUILink
          component={RouterLink}
          to="/"
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
