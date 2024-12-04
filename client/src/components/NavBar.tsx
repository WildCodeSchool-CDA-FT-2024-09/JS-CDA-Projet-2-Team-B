import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Link as MUILink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
//import Button from '@mui/material/Button';

import Tooltip from '@mui/material/Tooltip';

const pages = [
  { content: 'Gestion', to: '/' },
  { content: 'Produits', to: '/product' },
  { content: 'Marque', to: '/' },
  { content: 'Ajout Produit', to: '/' }
];

export default function NavBAr() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#E3AB44' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,

              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
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
                  display: 'block',
                  marginRight: 3,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontFamily: 'Roboto'
                }}
              >
                {page.content}
              </MUILink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="A" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
