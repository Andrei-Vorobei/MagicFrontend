import { Link as RouterLink } from 'react-router';
import cx from 'clsx';
import { Box, makeStyles, Typography, Link, AppBar, Toolbar, IconButton } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';

const navItems = [
  {
    title: 'Home',
    url: '/home',
    icon: HomeIcon,
  },
  {
    title: 'About',
    url: '/about',
    icon: InfoIcon,
  },
];


const useStyles = makeStyles((theme) => {
  return {
    navItem: {
      padding: 10
    },
    navLink: {
      display: 'flex',
      alignItems: 'center'
    },
    navLinks: {
      display: 'flex',
      width: '100%',
      justifyContent: 'end',

    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: 8,
    }
  }
});

const navBarStyles = {
  fontWeight: 'bold',
  color: '#fff'
}

export const NavBar: React.FC = () => {
  const classes = useStyles();


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box className={classes.navLinks}>
            {navItems.map((item) => {
              return (
                <Box key={item.title} className={cx(classes.navItem)}>
                  <Link to={item.url} component={RouterLink} classes={{ root: classes.navLink }}>
                    <Box className={classes.icon}>
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