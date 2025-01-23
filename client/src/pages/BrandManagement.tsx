import { Card, CardContent, Box } from '@mui/material';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function BrandManagement() {
  const [refreshBrands, setRefreshBrands] = useState(false);

  const triggerRefresh = () => {
    setRefreshBrands((prev) => !prev);
  };

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
              to="/brand/view"
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
              Liste des marques
            </Link>
            <Link
              to="/brand/add"
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
              Créer une marque
            </Link>
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '0.5rem',
          marginTop: '0.25rem',
          height: '100vh',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '45%',
            margin: '1em'
          }}
        >
          <Outlet context={{ triggerRefresh, refreshBrands }} />
        </Box>
      </Card>
    </Box>
  );
}
