import { CardContent, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function ProductManagement() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100dvh',
        maxHeight: '100%'
      }}
    >
      <Box
        sx={{
          marginTop: '5px',
          width: '14.5%',
          boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)'
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
              minHeight: '100dvh',
              maxHeight: '100%',
              gap: '1rem'
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
              Liste des produits
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
              Créer un produit
            </Link>
          </Box>
        </CardContent>
      </Box>
      <Box
        sx={{
          width: '100%',
          minHeight: '100dvh',
          maxHeight: '100%',
          marginTop: '0.25rem',
          marginLeft: '0.5rem',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
