import { Grid } from '@mui/material';
import {
  GetAllBrandsQuery,
  useGetAllBrandsQuery
} from '../generated/graphql-types';
import { useEffect, useState } from 'react';
import BrandCard from './BrandCard';

export default function BrandCatalog() {
  const { loading, error, data, refetch } = useGetAllBrandsQuery({
    variables: { includeDeleted: true }
  });
  const [brands, setBrands] = useState<GetAllBrandsQuery['getAllBrands']>([]);

  useEffect(() => {
    if (data && data.getAllBrands) {
      setBrands(data.getAllBrands);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'center',
          marginTop: '2dvh',
          padding: '2rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            id={brand.id}
            name={brand.name}
            description={brand.description}
            image={brand.image}
            deletedAt={brand.deletedAt as Date | null}
            refetch={refetch}
          />
        ))}
      </Grid>
    </>
  );
}
