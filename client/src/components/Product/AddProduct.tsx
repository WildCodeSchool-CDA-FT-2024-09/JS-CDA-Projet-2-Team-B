import { useState } from 'react';
import CreationProduct from '../Product/CreationProduct';
import AddImage from './AddImage';
import { Box } from '@mui/material';

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
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <CreationProduct
          handleProductId={handleProductId}
          block={block}
          resetForm={resetFormFlag}
        />
      </Box>
      <Box>
        {productId && (
          <AddImage
            productId={productId}
            handleBlock={setBlock}
            onImageAdded={resetForm}
          />
        )}
      </Box>
    </>
  );
};

export default AddProduct;
