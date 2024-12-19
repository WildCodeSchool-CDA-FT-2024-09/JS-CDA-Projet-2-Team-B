import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {
  useGetAllCharacteristicQuery,
  useCreateNewCharacteristicMutation
} from '../generated/graphql-types';
import { useState } from 'react';
import CharacteristicItem from './CharacteristicItem';

export default function CharacteristicForm() {
  const [characteristic, setCaracteristic] = useState('');
  const [createNewCharacteristic] = useCreateNewCharacteristicMutation();

  const handleAdd = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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

  const { loading, data, refetch } = useGetAllCharacteristicQuery();

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <Card sx={{ width: 900, margin: 1, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Caractéristiques
        </Typography>
        <Box
          component="form"
          onSubmit={handleAdd}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ minWidth: 'fit-content' }}>
              Ajouter une caractéristique :
            </Typography>
            <TextField
              sx={{ marginLeft: '25px' }}
              placeholder="Nom"
              variant="outlined"
              size="small"
              value={characteristic}
              onChange={(e) => setCaracteristic(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: 'green',
                padding: '4px 10px',
                borderRadius: '5px',
                marginRight: 6
              }}
            >
              Ajouter +
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
            <Typography> Chargement ... </Typography>
          ) : (
            data?.getAllCharacteristic.map((c) => (
              <CharacteristicItem
                key={c.id}
                id={c.id}
                name={c.name}
                onRefetch={handleRefetch}
              />
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
