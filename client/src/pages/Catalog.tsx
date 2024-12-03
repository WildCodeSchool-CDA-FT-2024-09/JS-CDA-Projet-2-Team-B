import CardProduct from '../components/CardProduct';
import Grid from '@mui/material/Grid2';

const produits = [
  {
    nom: 'Vélo de Course',
    reference: 'VC-1234',
    categorie: 'Sports',
    description:
      'Un vélo léger et rapide, parfait pour les courses sur route et les longues distances.'
  },
  {
    nom: 'Smartphone 5G',
    reference: 'SP-5678',
    categorie: 'Electronique',
    description:
      'Un smartphone dernier cri avec écran OLED et caméra ultra haute définition.'
  },
  {
    nom: 'Chaise Ergonomique',
    reference: 'CE-9101',
    categorie: 'Mobilier',
    description:
      'Une chaise ergonomique conçue pour un confort optimal lors de longues heures de travail.'
  },
  {
    nom: 'Montre Connectée',
    reference: 'MC-1122',
    categorie: 'Accessoires',
    description:
      "Une montre connectée avec suivi d'activité et notifications en temps réel."
  }
];

export default function Catalog() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: 6,
        marginRight: 10,
        justifyContent: 'right'
      }}
    >
      {produits.map((produit) => (
        <CardProduct
          key={produit.reference}
          nom={produit.nom}
          reference={produit.reference}
          categorie={produit.categorie}
          description={produit.description}
        />
      ))}
    </Grid>
  );
}
