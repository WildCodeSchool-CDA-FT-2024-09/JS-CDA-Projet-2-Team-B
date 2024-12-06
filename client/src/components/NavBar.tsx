import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Link as MUILink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const pages = [
  { content: 'Gestion', to: '/managementProduct' },
  { content: 'Produits', to: '/catalog' },
  { content: 'Marque', to: '/brand' },
  { content: 'Ajout Produit', to: '/addProduct' }
];

export default function NavBAr() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#E3AB44' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="a"
            sx={{
              fontWeight: 700,
              color: 'black',
              textDecoration: 'none'
            }}
          >
            PIMP
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
            {pages.map((page) => (
              <MUILink
                to={page.to}
                key={page.content}
                component={RouterLink}
                sx={{
                  my: 2,
                  color: 'black',
                  marginRight: 3,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontFamily: "'Roboto', sans-serif"
                }}
              >
                {page.content}
              </MUILink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="A" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
