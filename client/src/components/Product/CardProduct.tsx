import Card from '@mui/material/Card';
import { Link as RouterLink } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link as MUILink } from '@mui/material';
import { Grid } from '@mui/system';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

type Products = {
  id: number;
  name: string;
  price: number;
  reference: string;
  shortDescription: string;
  description: string;
  compact?: boolean;
};

export default function CardProduct({
  id,
  name,
  price,
  reference,
  shortDescription,
  description,
  compact = false
}: Products) {
  return (
    <Card sx={{ border: 'none', boxShadow: 'none', textDecoration: 'none' }}>
      {!compact && (
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2"> {reference}</Typography>
          <Typography variant="body2"> {price}</Typography>
          <Typography variant="body2"> {shortDescription}</Typography>
          <Typography variant="body2"> {description}</Typography>
        </CardContent>
      )}
      <Grid container justifyContent="center">
        <MUILink
          component={RouterLink}
          to={`/product/${id}/edit`}
          sx={{ marginTop: '0.5rem' }}
        >
          <ModeEditIcon
            sx={{
              color: 'green',
              fontSize: '1.8rem'
            }}
          />
        </MUILink>
      </Grid>
    </Card>
  );
}
