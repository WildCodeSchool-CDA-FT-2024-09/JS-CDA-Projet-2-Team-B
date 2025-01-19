import { Box } from '@mui/material';
import {
  GetAllBrandsQuery,
  useGetAllBrandsQuery
} from '../../generated/graphql-types';
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
      {brands.length > 0 && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0.5rem 1rem'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              margin: 'auto',
              gap: '0.5rem'
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
          </Box>
        </Box>
      )}
    </>
  );
}
