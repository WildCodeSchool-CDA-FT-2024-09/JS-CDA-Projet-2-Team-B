import { Box } from '@mui/material';
import {
  GetAllBrandsQuery,
  useGetAllBrandsQuery
} from '../../generated/graphql-types';
import { useEffect, useState } from 'react';
import BrandCard from './BrandCard';
import { useOutletContext } from 'react-router-dom';

export default function BrandCatalog() {
  const { loading, error, data, refetch } = useGetAllBrandsQuery({
    variables: { includeDeleted: true }
  });
  const [brands, setBrands] = useState<GetAllBrandsQuery['getAllBrands']>([]);
  const { refreshBrands } = useOutletContext<{ refreshBrands: boolean }>();

  useEffect(() => {
    if (data && data.getAllBrands) {
      setBrands(data.getAllBrands);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refreshBrands, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {brands.length > 0 && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
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
