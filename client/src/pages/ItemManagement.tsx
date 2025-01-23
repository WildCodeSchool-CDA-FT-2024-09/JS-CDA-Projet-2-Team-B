import CharacteristicForm from '../components/Item/CharacteristicForm';
import CategoryForm from '../components/Item/CategoryForm';
import TagForm from '../components/Item/TagForm';
import { Box } from '@mui/material';

export default function ItemManagement() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '2rem',
        marginTop: '0.5rem',
        gap: '1.5rem'
      }}
    >
      <CategoryForm />
      <CharacteristicForm />
      <TagForm />
    </Box>
  );
}
