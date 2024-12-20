import Card from '@mui/material/Card';
import { Link as RouterLink } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Link as MUILink } from '@mui/material';
import { Grid } from '@mui/system';
import {
  useActivateBrandMutation,
  useDeactivateBrandMutation
} from '../generated/graphql-types';
import { useState } from 'react';

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
  const [deactivateBrand, { error, loading: deactivationLoading }] =
    useDeactivateBrandMutation();
  const [activateBrand, { loading: activationLoading }] =
    useActivateBrandMutation();
  const [isActive, setIsActive] = useState(deletedAt === null);

  const handleActivation = async (brandId: number, isActive: boolean) => {
    try {
      if (isActive) {
        const { data } = await deactivateBrand({
          variables: { deactivateBrandId: brandId }
        });

        if (data?.deactivateBrand) {
          setIsActive(false);
          refetch();
        }
      } else {
        const { data } = await activateBrand({
          variables: { activateBrandId: brandId }
        });

        if (data?.activateBrand) {
          setIsActive(true);
          refetch();
        }
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
          disabled={deactivationLoading || activationLoading}
          onClick={() => handleActivation(id, isActive)}
          sx={{
            ...styleButton,
            backgroundColor: isActive ? 'red' : 'info.main'
          }}
        >
          {isActive ? 'Désactiver' : 'Activer'}
        </Button>
      </Grid>
    </Card>
  );
}
