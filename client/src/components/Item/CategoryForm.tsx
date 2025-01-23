import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery
} from '../../generated/graphql-types';
import CategoryItem from './CategoryItem';

const CategoryForm = () => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const { data, loading, error, refetch } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newName = newCategoryName.trim();
    try {
      if (newName) {
        const response = await createCategory({
          variables: {
            input: { name: newName }
          }
        });
        if (response.data?.createCategory) {
          setNewCategoryName('');
          await refetch();
        }
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleRefetch = async () => {
    await refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card sx={{ width: '30%', margin: 1, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Catégories
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              sx={{ marginLeft: '0.1rem' }}
              placeholder="Nom"
              variant="outlined"
              size="small"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              type="submit"
              sx={{
                padding: '0.45rem 1rem',
                borderRadius: '5px',
                backgroundColor: 'green',
                marginLeft: '1rem'
              }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            marginTop: 3
          }}
        >
          {data?.getAllCategories.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              name={category.name}
              onRefetch={handleRefetch}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
