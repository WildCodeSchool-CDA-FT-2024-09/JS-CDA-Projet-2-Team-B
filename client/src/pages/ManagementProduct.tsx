import CharacteristicForm from '../components/CharacteristicForm';
import CategoryForm from '../components/CategoryForm';
import TagForm from '../components/TagForm';
import { Box } from '@mui/material';

export default function ManagementProduct() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 6
      }}
    >
      <CategoryForm />
      <CharacteristicForm />
      <TagForm />
    </Box>
  );
}
