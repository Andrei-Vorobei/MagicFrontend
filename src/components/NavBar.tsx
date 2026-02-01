import { Link as RouterLink } from 'react-router';
import { AppBar, Box, CSSProperties, IconButton, Link, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import StreamIcon from '@mui/icons-material/Stream';

const navItems = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
  },
  {
    title: 'MagicFrontend',
    url: '/magic-frontend',
    icon: StreamIcon,
  },
  {
    title: 'About',
    url: '/about',
    icon: InfoIcon,
  },
];

export const NavBar: React.FC = () => {

  const navItemStyles: CSSProperties = {
    padding: 1
  };

  const navBarStyles: CSSProperties = {
    fontWeight: 'bold',
    color: '#fff'
  };

  const navLinkStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center'
  };

  const iconStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 1,
  };

  const navLinksStyle: CSSProperties = {
    display: 'flex',
    width: '100%',
    justifyContent: 'end',
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box sx={ navLinksStyle }>
            {navItems.map((item) => {
              return (
                <Box key={item.title} sx={ navItemStyles }>
                  <Link to={item.url} component={RouterLink} sx={ navLinkStyles }>
                    <Box sx={ iconStyles }>
                      <item.icon fontSize='small' sx={{ color: '#fff' }} />
                    </Box>
                    <Typography sx={ navBarStyles } variant='subtitle2'>
                      {item.title}
                    </Typography>
                  </Link>
                </Box>
              )
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};