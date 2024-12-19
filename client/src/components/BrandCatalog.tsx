import { Grid } from '@mui/material';
import { Brand, useGetAllBrandsQuery } from '../generated/graphql-types';
import { useEffect, useState } from 'react';
import BrandCard from './BrandCard';

export default function BrandCatalog() {
  const { loading, error, data, refetch } = useGetAllBrandsQuery({
    variables: { includeDeleted: true }
  });
  const [brands, setBrands] = useState<Brand[]>([]);

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
          marginTop: '2dvh'
        }}
      >
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            id={brand.id}
            name={brand.name}
            description={brand.description}
            logo={brand.logo}
            deletedAt={brand.deletedAt as Date | null}
            refetch={refetch}
          />
        ))}
      </Grid>
    </>
  );
}
