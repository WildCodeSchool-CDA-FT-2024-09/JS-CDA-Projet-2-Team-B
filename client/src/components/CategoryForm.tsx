import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation
} from '../generated/graphql-types';
import { MenuItem, Select } from '@mui/material';

interface Category {
  id: number;
  name: string;
}

const styleButton = {
  padding: '4px 10px',
  borderRadius: '5px',
  margin: 0.6,
  color: 'primary.contrastText',
  textTransform: 'uppercase',
  fontFamily: "'Roboto', sans-serif"
};

const CategoryForm = () => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [editCategoryName, setEditCategoryName] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [deleteCategory] = useDeleteCategoryMutation();

  const { data, loading, error, refetch } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (selectedCategory) {
      setEditCategoryName(selectedCategory.name);
    } else {
      setEditCategoryName('');
    }
  }, [selectedCategory]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (categoryToDelete) {
        const response = await deleteCategory({
          variables: { id: categoryToDelete.id }
        });
        if (response.data?.deleteCategory) {
          setCategoryToDelete(null);
          await refetch();
        }
      } else if (selectedCategory) {
        const response = await updateCategory({
          variables: {
            input: {
              id: selectedCategory.id,
              name: editCategoryName.trim()
            }
          }
        });
        if (response.data?.updateCategory) {
          setSelectedCategory(null);
          setEditCategoryName('');
          await refetch();
        }
      } else if (newCategoryName.trim()) {
        const response = await createCategory({
          variables: {
            input: { name: newCategoryName.trim() }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card
      sx={{
        maxWidth: 930,
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 4
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Catégories
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginBottom: 2
          }}
        >
          <Typography sx={{ minWidth: 'fit-content' }}>
            Ajouter une catégorie :
          </Typography>
          <TextField
            sx={{ maxWidth: '300px', marginLeft: '25px' }}
            placeholder="Nom"
            variant="outlined"
            size="small"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 4
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%'
            }}
          >
            <Typography sx={{ minWidth: 'fit-content' }}>
              Modifier une catégorie :
            </Typography>
            <Select
              value={selectedCategory?.id || ''}
              onChange={(e) => {
                const category = data?.getAllCategories.find(
                  (cat) => cat.id === e.target.value
                );
                setSelectedCategory(category || null);
              }}
              displayEmpty
              sx={{
                maxWidth: '300px',
                flex: 1,
                marginLeft: '17px',
                height: '40px',
                '.MuiSelect-select': {
                  padding: '8px 14px'
                }
              }}
            >
              <MenuItem value="" disabled>
                Sélectionnez une catégorie
              </MenuItem>
              {data?.getAllCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              marginLeft: '204px',
              maxWidth: '300px'
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Nouveau nom"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 4
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%'
            }}
          >
            <Typography sx={{ minWidth: 'fit-content' }}>
              Supprimer une catégorie :
            </Typography>
            <Select
              value={categoryToDelete?.id || ''}
              onChange={(e) => {
                const category = data?.getAllCategories.find(
                  (cat) => cat.id === e.target.value
                );
                setCategoryToDelete(category || null);
              }}
              displayEmpty
              sx={{
                maxWidth: '300px',
                flex: 1,
                height: '40px',
                '.MuiSelect-select': {
                  padding: '8px 14px'
                }
              }}
            >
              <MenuItem value="" disabled>
                Sélectionnez une catégorie
              </MenuItem>
              {data?.getAllCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{ ...styleButton, backgroundColor: 'green' }}
            onClick={handleSubmit}
          >
            Enregistrer
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
