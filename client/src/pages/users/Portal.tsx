import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Portal() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, user, error: loginError, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && user) {
      if (user.role === 'admin') {
        navigate('/users');
      } else {
        navigate('/product/view');
      }
    }
  }, [isInitializing, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(credentials.email, credentials.password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur inconnue');
      }
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <img
        src="/pmplogo.png"
        alt="logo pimpmyproduct"
        style={{
          width: '10rem',
          maxWidth: '100%',
          filter: 'drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.5))',
          marginBottom: 20,
          marginTop: 50
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        height="100%"
        bgcolor="background.default"
      >
        <Card sx={{ padding: 3, textAlign: 'center', boxShadow: 4 }}>
          <Typography variant="h4" gutterBottom>
            Connexion
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
            <TextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            {loginError && <Typography color="error">{loginError}</Typography>}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Se connecter
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
}
