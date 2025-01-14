import { useState } from 'react';
import CreationProduct from '../Product/CreationProduct';
import AddImage from './AddImage';
import { Grid, Grid2 } from '@mui/material';

const AddProduct = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const [block, setBlock] = useState<boolean>(false);
  const [resetFormFlag, setResetFormFlag] = useState<boolean>(false);

  const handleProductId = (id: number) => {
    setProductId(id);
    setBlock(true);
  };

  const resetForm = () => {
    setResetFormFlag(true);
    setTimeout(() => setResetFormFlag(false), 0);
  };
  return (
    <Grid2 container spacing={2}>
      <Grid item xs={12}>
        <CreationProduct
          handleProductId={handleProductId}
          block={block}
          resetForm={resetFormFlag}
        />
      </Grid>
      {productId && (
        <Grid item xs={12} md={6}>
          <AddImage
            productId={productId}
            handleBlock={setBlock}
            onImageAdded={resetForm}
          />
        </Grid>
      )}
    </Grid2>
  );
};

export default AddProduct;
