import CardProduct from '../components/CardProduct';
import Grid from '@mui/material/Grid2';
import { useGetAllProductsQuery } from '../generated/graphql-types';

export default function Catalog() {
  const { loading, error, data } = useGetAllProductsQuery();
  if (loading) return <p> loading </p>;
  if (error) return <p> error : </p>;

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: 6,
        marginRight: 10,
        justifyContent: 'right'
      }}
    >
      {data &&
        data.getAllProducts.map((produit) => (
          <CardProduct
            key={produit.id}
            name={produit.name}
            price={produit.price}
            reference={produit.reference}
            shortDescription={produit.shortDescription}
            description={produit.description}
          />
        ))}
    </Grid>
  );
}
