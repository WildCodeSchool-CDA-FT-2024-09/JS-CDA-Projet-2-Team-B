import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useCreateTagMutation } from '../generated/graphql-types';
import { useGetAllTagsQuery } from '../generated/graphql-types';
import TagItem from './TagItem';

const TagForm = () => {
  const [newTagName, setNewTagName] = useState('');
  const [createTag] = useCreateTagMutation();
  const { data, loading, refetch } = useGetAllTagsQuery();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (newTagName.trim()) {
        const response = await createTag({
          variables: {
            input: { name: newTagName.trim() }
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
            sx={{
              padding: '4px 10px',
              borderRadius: '5px',
              backgroundColor: 'green'
            }}
          >
            Ajouter +
          </Button>
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
                name={tag.name}
                onDelete={() => console.info('Delete tag:', tag.name)}
              />
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TagForm;
