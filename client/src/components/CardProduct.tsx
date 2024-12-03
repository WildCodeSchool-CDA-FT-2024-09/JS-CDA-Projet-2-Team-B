import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CardProduct() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <p> Hello </p>
      <CardContent>
        <Typography variant="body2"> Nom du produit</Typography>
        <Typography variant="body2"> Ref du produit</Typography>
        <Typography variant="body2"> Categorie du produit</Typography>
        <Typography variant="body2"> Description du produit</Typography>
      </CardContent>
    </Card>
  );
}
