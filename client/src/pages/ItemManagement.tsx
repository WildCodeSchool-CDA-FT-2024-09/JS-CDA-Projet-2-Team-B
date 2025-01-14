import CharacteristicForm from '../components/Item/CharacteristicForm';
import CategoryForm from '../components/Item/CategoryForm';
import TagForm from '../components/Item/TagForm';
import { Box } from '@mui/material';

export default function ItemManagement() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 6,
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginLeft: '28rem',
        marginRight: '28rem',
        marginTop: '2rem'
      }}
    >
      <CategoryForm />
      <CharacteristicForm />
      <TagForm />
    </Box>
  );
}
