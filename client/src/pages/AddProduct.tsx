import { useState } from 'react';
import CreationProduct from '../components/CreationProduct';
import AddImage from '../components/AddImage';
import { Grid, Grid2 } from '@mui/material';

const AddProduct = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const [block, setBlock] = useState<boolean>(false);

  const handleProductId = (id: number) => {
    setProductId(id);
    setBlock(!block);
  };

  return (
    <Grid2 sx={{ margin: 10 }} container spacing={2}>
      <Grid item xs={12}>
        <CreationProduct handleProductId={handleProductId} block={block} />
      </Grid>
      {productId && (
        <Grid item xs={12} md={6}>
          <AddImage productId={productId} handleBlock={setBlock} />
        </Grid>
      )}
    </Grid2>
  );
};

export default AddProduct;
