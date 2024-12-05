import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../generated/graphql-types';

interface ProductDetailsReq {
  name: string;
  reference: string;
  shortDescription: string;
  description: string;
  price: number;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailsReq>({
    name: '',
    reference: '',
    shortDescription: '',
    description: '',
    price: 0
  });

  const { loading, error, data } = useGetProductByIdQuery({
    variables: { getProductByIdId: parseFloat(id!) }
  });

  useEffect(() => {
    if (data?.getProductById) {
      setProduct({
        name: data.getProductById.name,
        reference: data.getProductById.reference,
        shortDescription: data.getProductById.shortDescription,
        description: data.getProductById.description,
        price: data.getProductById.price
      });
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card sx={{ width: 350, fontFamily: "'Roboto', sans-serif", boxShadow: 4 }}>
      <CardContent>
        <p>
          <strong>{product.reference}</strong>
        </p>
        <p>{product.name}</p>
        <p>{product.shortDescription}</p>
        <p>{product.description}</p>
        <p>{product.price}€</p>
      </CardContent>
    </Card>
  );
}
