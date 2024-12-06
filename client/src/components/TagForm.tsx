import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useCreateTagMutation } from '../generated/graphql-types';

const TagForm = () => {
  const [newTagName, setNewTagName] = useState('');
  const [createTag] = useCreateTagMutation();

  const handleSubmit = async () => {
    try {
      if (newTagName.trim()) {
        const response = await createTag({
          variables: {
            input: { name: newTagName.trim() }
          }
        });
        if (response.data?.createTag) {
          setNewTagName('');
        }
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Card sx={{ maxWidth: 900, margin: 1, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Tags
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginBottom: 2
          }}
        >
          <Typography sx={{ minWidth: 'fit-content' }}>
            Ajouter un tag :
          </Typography>
          <TextField
            sx={{ maxWidth: '300px', marginLeft: '25px' }}
            placeholder="Nom"
            variant="outlined"
            size="small"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            sx={{
              padding: '4px 10px',
              borderRadius: '5px',
              backgroundColor: 'green'
            }}
          >
            Ajouter +
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TagForm;
