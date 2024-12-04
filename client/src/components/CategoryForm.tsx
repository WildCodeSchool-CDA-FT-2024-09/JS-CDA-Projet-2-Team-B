import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useCreateCategoryMutation } from '../generated/graphql-types';

const styleButton = {
  padding: '4px 10px',
  borderRadius: '5px',
  margin: 0.6,
  color: 'primary.contrastText',
  textTransform: 'uppercase',
  fontFamily: "'Roboto', sans-serif"
};

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async () => {
    console.info('Tentative de création avec:', categoryName);
    try {
      await createCategory({
        variables: {
          input: {
            name: categoryName
          }
        }
      });
    } catch (err) {
      console.error('Erreur:', err);
    }
  };
  return (
    <Card
      sx={{
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
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
