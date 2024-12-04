import Card from '@mui/material/Card';
import CharacteristicForm from '../components/CharacteristicForm';
import { useGetAllCharacteristicQuery } from '../generated/graphql-types';
import { Typography } from '@mui/material';

export default function ManagementProduct() {
  const { loading, error, data } = useGetAllCharacteristicQuery();
  if (loading) return <p> Loading </p>;
  if (error) return <p> Error : </p>;
  console.info(data);

  // Elimine les doublons et crée un nouveau tableau
  const uniqueCharacteristic = [
    ...new Set(data?.getAllCharacteristic.map((c) => c.name))
  ];

  return (
    <Card
      sx={{
        maxWidth: 900,
        padding: 2,
        boxShadow: 4
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Caractéristiques
      </Typography>

      {uniqueCharacteristic.map((c) => (
        <CharacteristicForm key={c} name={c} />
      ))}
    </Card>
  );
}
