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
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation
} from '../generated/graphql-types';
import { MenuItem, Select } from '@mui/material';

interface Category {
  id: string;
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
      if (selectedCategory) {
        await updateCategory({
          variables: {
            input: {
              id: parseInt(selectedCategory.id),
              name: editCategoryName.trim()
            }
          }
        });
        setSelectedCategory(null);
        setEditCategoryName('');
      } else if (newCategoryName.trim()) {
        await createCategory({
          variables: {
            input: { name: newCategoryName.trim() }
          }
        });
        setNewCategoryName('');
        await refetch();
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
        maxWidth: 900,
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
            sx={{ maxWidth: '300px' }}
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
              marginLeft: '186px',
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
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{ ...styleButton, backgroundColor: 'primary.main' }}
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
