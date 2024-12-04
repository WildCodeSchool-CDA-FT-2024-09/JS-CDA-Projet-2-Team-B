import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useGetAllCharacteristicQuery } from '../generated/graphql-types';

export default function CharacteristicForm() {
  const { loading, error, data } = useGetAllCharacteristicQuery();
  if (loading) return <p> Loading </p>;
  if (error) return <p> Error : </p>;
  console.info(data);

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

      {uniqueCharacteristic.map((c) => (
        <Chip
          label={c}
          variant="outlined"
          onClick={handleClick}
          sx={{ padding: 2, marginLeft: 2 }}
        />
      ))}
    </Card>
  );
}
