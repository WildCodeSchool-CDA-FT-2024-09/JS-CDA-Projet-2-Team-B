import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {
  useGetAllCharacteristicQuery,
  useCreateNewCharacteristicMutation
} from '../generated/graphql-types';
import { useState } from 'react';

export default function CharacteristicForm() {
  const [characteristic, setCaracteristic] = useState('');
  const [createNewCharacteristic] = useCreateNewCharacteristicMutation();

  const handleAdd = async () => {
    try {
      await createNewCharacteristic({
        variables: {
          characteristic: {
            name: characteristic
          }
        }
      });
      setCaracteristic('');
      refetch();
    } catch (err) {
      console.error('Erreur caracteristique', err);
    }
  };

  const { loading, error, data, refetch } = useGetAllCharacteristicQuery();
  if (loading) return <p> Loading </p>;
  if (error) return <p> Error : </p>;

  // Elimine les doublons et crée un nouveau tableau
  const uniqueCharacteristic = [
    ...new Set(data?.getAllCharacteristic.map((c) => c.name))
  ];

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Card
      sx={{
        margin: 1,
        maxWidth: 900,
        padding: 2,
        boxShadow: 4
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Caractéristiques
      </Typography>
      <Card
        sx={{
          marginTop: 3,
          display: 'flex',
          maxWidth: 500,
          justifyContent: 'space-around',
          boxShadow: 0,
          gap: 2
        }}
      >
        <Typography sx={{ minWidth: 'fit-content' }}>
          Ajouter une caractéristique :
        </Typography>
        <TextField
          sx={{ maxWidth: '300px' }}
          variant="outlined"
          size="small"
          value={characteristic}
          onChange={(e) => setCaracteristic(e.target.value)}
        />
        <Button
          onClick={handleAdd}
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ backgroundColor: 'green', color: 'white' }}
        >
          Ajouter
        </Button>
      </Card>
      {uniqueCharacteristic.map((c) => (
        <Chip
          label={c}
          variant="outlined"
          onClick={handleClick}
          sx={{ padding: 2, marginLeft: 2, marginTop: 5 }}
        />
      ))}
    </Card>
  );
}
