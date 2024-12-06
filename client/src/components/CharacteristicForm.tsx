import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {
  useGetAllCharacteristicQuery,
  useCreateNewCharacteristicMutation,
  useEditCharacteristicMutation
} from '../generated/graphql-types';
import { useState } from 'react';

export default function CharacteristicForm() {
  const [characteristic, setCaracteristic] = useState('');
  const [createNewCharacteristic] = useCreateNewCharacteristicMutation();

  const [editCharacteristic] = useEditCharacteristicMutation();
  const [selectId, setSelectId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');

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

  const handleClickChip = (id: number, name: string) => {
    setSelectId(id);
    setEditName(name);
  };

  const handleSaveEdit = async () => {
    if (editName) {
      try {
        await editCharacteristic({
          variables: {
            characteristic: {
              id: selectId,
              name: editName
            }
          }
        });
        setSelectId(null);
        setEditName('');
      } catch (err) {
        console.error(err);
      }
    }
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
          sx={{ backgroundColor: 'green', color: 'white' }}
        >
          Ajouter
        </Button>
      </Card>

      <div style={{ marginTop: 10 }}>
        <Typography sx={{ marginTop: 5, marginBottom: 4 }}>
          Modifier une caractéristique en cliquant dessus :
        </Typography>
        {data?.getAllCharacteristic.map((c) => (
          <div key={c.id} style={{ display: 'inline-block', marginTop: 10 }}>
            {selectId === c.id ? (
              <TextField
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleSaveEdit}
                variant="outlined"
                sx={{
                  height: 37,
                  width: 200,
                  '& .MuiOutlinedInput-root': {
                    height: '100%',
                    borderRadius: '16px',
                    border: '1px solid #ddd'
                  }
                }}
              />
            ) : (
              <Chip
                label={c.name}
                variant="outlined"
                onClick={() => handleClickChip(c.id, c.name)}
                sx={{ padding: 2, marginLeft: 2, marginBottom: 5 }}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
