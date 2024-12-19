import { useState } from 'react';
import CreationProduct from '../components/CreationProduct';
import AddImage from '../components/AddImage';

const AddProduct = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const [block, setBlock] = useState<boolean>(false);

  const handleProductId = (id: number) => {
    setProductId(id);
    setBlock(!block);
  };

  return (
    <>
      <CreationProduct handleProductId={handleProductId} block={block} />
      {productId && <AddImage productId={productId} handleBlock={setBlock} />}
    </>
  );
};

export default AddProduct;
