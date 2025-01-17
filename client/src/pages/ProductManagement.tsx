import { Card, CardContent, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function ProductManagement() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Card
        sx={{
          marginTop: '5px',
          width: '14.5%',
          height: '100dvh',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)'
        }}
      >
        <CardContent
          sx={{
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5dvh'
            }}
          >
            <Link
              to="/product/view"
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '2px',
                padding: '5px',
                backgroundColor: '#E3AB44',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              Liste des Produits
            </Link>
            <Link
              to="/product/add"
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '2px',
                padding: '5px',
                backgroundColor: '#E3AB44',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              Créer un Produit
            </Link>
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '85%',
          margin: '5px 0',
          height: '100dvh',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          justifyContent: 'left'
        }}
      >
        <CardContent
          sx={{
            marginLeft: '5dvh'
          }}
        >
          <Outlet />
        </CardContent>
      </Card>
    </Box>
  );
}
