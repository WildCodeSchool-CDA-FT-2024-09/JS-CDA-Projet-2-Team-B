import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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
  nom: string;
  reference: string;
  categorie: string;
  description: string;
};

export default function CardProduct({
  nom,
  reference,
  categorie,
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
          {nom}
        </Typography>
        <Typography variant="body2"> {reference}</Typography>
        <Typography variant="body2"> {categorie}</Typography>
        <Typography variant="body2"> {description}</Typography>
      </CardContent>
      <Grid sx={{ display: 'flex', justifyContent: 'end', marginRight: 1 }}>
        <Link href="/" sx={{ ...styleButton, backgroundColor: 'green' }}>
          Modifier
        </Link>
        <Link href="/" sx={{ ...styleButton, backgroundColor: 'info.main' }}>
          Activer
        </Link>
      </Grid>
    </Card>
  );
}
