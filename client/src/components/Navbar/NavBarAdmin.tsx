import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from '../../assets/logopmp.png';
import { useAuth } from '../../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';

export default function NavBAr() {
  const { logout } = useAuth();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#E3AB44',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
          >
            <img src={logo} alt="Logo" style={{ height: 80 }} />
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: 700,
                color: 'black',
                textDecoration: 'none'
              }}
            >
              PIMP
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
              gap: 1
            }}
          >
            <LogoutIcon
              onClick={logout}
              sx={{
                cursor: 'pointer',
                color: 'black',
                marginLeft: '2'
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
