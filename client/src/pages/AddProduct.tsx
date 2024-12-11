import CreationProduct from '../components/CreationProduct';
import AddImage from '../components/AddImage';

export default function addProduct() {
  return (
    <>
      <h1>Ajouter un Produit</h1>
      <CreationProduct />
      <h2>Ajouter une Image</h2>
      <AddImage />
    </>
  );
}
