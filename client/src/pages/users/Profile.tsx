import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createAxiosInstance } from '../../services/axios.instance';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

const style = {
  marginLeft: 3,
  marginBottom: 2
};

interface Credentials {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const initialCredentials: Credentials = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
};

export default function Profile() {
  const [error, setError] = useState<string | null>('');
  const [successMessage, setSuccessMessage] = useState<string | null>('');
  const [openPasswordEdit, setOpenPasswordEdit] = useState(false);
  const [credentials, setCredentials] =
    useState<Credentials>(initialCredentials);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const axiosInstance = createAxiosInstance(logout);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(null);
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (credentials.newPassword !== credentials.confirmNewPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        '/auth/users/profile/change-password',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        setError(null);
        setSuccessMessage('Mot de passe modifié avec succès.');
        setOpenPasswordEdit(false);
        setCredentials(initialCredentials);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Erreur Axios :', err.response?.data || err.message);
        setError(err.response?.data.message || 'Une erreur est survenue.');
      } else if (err instanceof Error) {
        console.error('Erreur :', err.message);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 2,
          borderRadius: '5px',
          width: '50%',
          height: '80%'
        }}
      >
        <Box>
          <Typography
            sx={{
              margin: 2,
              fontWeight: 'bold',
              fontSize: 36,
              textAlign: 'center'
            }}
          >
            Mon profil
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Typography sx={style}>
              <strong>Prénom :</strong> {user ? user.first_name : ''}
            </Typography>
            <Typography sx={style}>
              <strong>Nom :</strong> {user ? user.last_name : ''}
            </Typography>
            <Typography sx={style}>
              <strong>Email :</strong> {user ? user.email : ''}
            </Typography>
            <Typography sx={style}>
              <strong>Tél. :</strong> {user ? user.phone : ''}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: 5,
              width: '30%'
            }}
          >
            <Button
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                padding: 0,
                marginLeft: 0.5,
                marginRight: 3
              }}
              onClick={() => setOpenPasswordEdit(!openPasswordEdit)}
            >
              {openPasswordEdit ? 'Annuler' : 'Modifier mot de passe'}
            </Button>
            {openPasswordEdit && (
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  sx={{
                    marginLeft: 0.5,
                    marginTop: 1
                  }}
                >
                  Mot de passe actuel
                </Typography>
                <TextField
                  required
                  name="currentPassword"
                  value={credentials.currentPassword}
                  onChange={handleChange}
                  type="password"
                  sx={{
                    marginTop: 1,
                    marginRight: 2,
                    '& .MuiInputBase-root': {
                      height: 40,
                      borderRadius: '10px'
                    }
                  }}
                />
                <Typography
                  sx={{
                    marginLeft: 0.5,
                    marginTop: 1
                  }}
                >
                  Nouveau mot de passe
                </Typography>
                <TextField
                  required
                  name="newPassword"
                  value={credentials.newPassword}
                  onChange={handleChange}
                  type="password"
                  sx={{
                    marginTop: 1,
                    marginRight: 2,
                    '& .MuiInputBase-root': {
                      height: 40,
                      borderRadius: '10px'
                    }
                  }}
                />
                <Typography
                  sx={{
                    marginLeft: 0.5,
                    marginTop: 1
                  }}
                >
                  Confirmation mot de passe
                </Typography>
                <TextField
                  required
                  name="confirmNewPassword"
                  value={credentials.confirmNewPassword}
                  onChange={handleChange}
                  type="password"
                  sx={{
                    marginTop: 1,
                    marginRight: 2,
                    '& .MuiInputBase-root': {
                      height: 40,
                      borderRadius: '10px'
                    }
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
                    marginRight: 1
                  }}
                >
                  {error && (
                    <Typography
                      color="error"
                      sx={{
                        flexwrap: 'nowrap',
                        marginTop: 1
                      }}
                    >
                      {error}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    disabled={loading}
                    color="primary"
                    type="submit"
                    sx={{
                      width: '7dvw',
                      marginTop: 2,
                      marginBottom: 2,
                      borderRadius: '10px'
                    }}
                  >
                    Valider
                  </Button>
                </Box>
              </Box>
            )}
            {successMessage && (
              <Typography
                color="success"
                sx={{
                  flexwrap: 'nowrap',
                  marginBottom: 2,
                  marginLeft: 0.5
                }}
              >
                {successMessage}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
