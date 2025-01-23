import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import {
  useCreateTagMutation,
  useGetAllTagsQuery
} from '../../generated/graphql-types';
import TagItem from '../Item/TagItem';

const TagForm = () => {
  const [newTagName, setNewTagName] = useState('');
  const [createTag] = useCreateTagMutation();
  const { data, loading, refetch } = useGetAllTagsQuery();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newName = newTagName.trim();
    try {
      if (newName) {
        const response = await createTag({
          variables: {
            input: { name: newName }
          }
        });
        if (response.data?.createTag) {
          setNewTagName('');
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

  return (
    <Card sx={{ width: '30%', margin: 1, boxShadow: 4 }}>
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
            justifyContent: 'flex-start'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              sx={{ marginLeft: '0.1rem' }}
              placeholder="Nom"
              variant="outlined"
              size="small"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
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
          {loading ? (
            <Typography>Chargement...</Typography>
          ) : (
            data?.getAllTags.map((tag) => (
              <TagItem
                key={tag.id}
                id={tag.id}
                name={tag.name}
                onRefetch={handleRefetch}
              />
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TagForm;
