import Chip from '@mui/material/Chip';

type Characteristics = {
  name: string;
};

export default function CharacteristicForm({ name }: Characteristics) {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Chip
      label={name}
      variant="outlined"
      onClick={handleClick}
      sx={{ padding: 2, marginLeft: 2 }}
    />
  );
}
