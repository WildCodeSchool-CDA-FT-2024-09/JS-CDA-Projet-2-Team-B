import { Card, CardContent, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function BrandManagement() {
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
              backgroundColor: '#E3AB44',
              borderRadius: '2px',
              padding: '5px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Link
              to="/brand/add"
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              Créer une marque
            </Link>
          </Box>
        </CardContent>
      </Card>
      <Outlet />
    </Box>
  );
}
