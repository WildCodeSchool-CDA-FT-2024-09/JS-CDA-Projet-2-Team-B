import Card from '@mui/material/Card';
import { Link as RouterLink } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Link as MUILink } from '@mui/material';
import { Grid } from '@mui/system';
import { useDeactivateBrandMutation } from '../generated/graphql-types';

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

export default function BrandCard({
  id,
  name,
  logo,
  deletedAt,
  refetch
}: Brand) {
  const [deactivateBrand, { error, loading }] = useDeactivateBrandMutation();

  const handleActivation = async (brandId: number) => {
    try {
      const { data } = await deactivateBrand({
        variables: { deactivateBrandId: brandId }
      });

      if (data?.deactivateBrand) {
        refetch();
      }
    } catch (err) {
      console.error('Error deactivating brand: ', err);
    }
  };

  if (error) return <p>{error.message}</p>;

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
        <Button
          disabled={loading}
          value={id}
          onClick={() => handleActivation(id)}
          sx={{
            ...styleButton,
            backgroundColor: deletedAt === null ? 'red' : 'info.main'
          }}
        >
          {deletedAt === null ? 'Désactiver' : 'Activer'}
        </Button>
      </Grid>
    </Card>
  );
}
