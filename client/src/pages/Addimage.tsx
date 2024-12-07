import { useState } from 'react';
import { useAddImageMutation } from '../generated/graphql-types';

const AddImageCompoenent = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [addImageMutation, { loading, error, data }] = useAddImageMutation();

  const handleAddImage = async () => {
    try {
      const response = await addImageMutation({
        variables: {
          data: {
            url: imageUrl,
            isMain: false
          }
        }
      });
      console.info('Image added successfully:', response.data);
    } catch (e) {
      console.error('Error adding image:', e);
    }
  };

  return (
    <div>
      <h1> Add Image </h1>
      <input
        type="text"
        placeholder="Entrer votre image"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleAddImage} disabled={loading}>
        {loading ? 'Adding...' : 'Add Image'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Image added with ID: {data.addImage.id}</p>}
    </div>
  );
};

export default AddImageCompoenent;
