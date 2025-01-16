import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/portal'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Card
        sx={{ padding: 3, textAlign: 'center', maxWidth: 400, boxShadow: 3 }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom color="error">
            ❌ Accès interdit
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Vous n'avez pas l'autorisation d'accéder à cette page.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Redirection vers la page de connexion...
          </Typography>
          <Box mt={3} display="flex" justifyContent="center">
            <img
              src="/pmplogo.png"
              alt="lopgo pimpmyproduct"
              style={{
                width: 100,
                height: 100,
                animation: 'spin 2s linear infinite',
                transformOrigin: 'center',
                display: 'block',
                borderRadius: '50%',
                objectFit: 'contain'
              }}
            />
          </Box>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/portal')}
            >
              Aller à la connexion
            </Button>
          </Box>
        </CardContent>
      </Card>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default UnauthorizedPage;
