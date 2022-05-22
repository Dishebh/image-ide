import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import ImageUpload from '../src/components/ImageUpload';
import { Avatar, Button, Tooltip } from '@material-ui/core';
import './App.css';
import { fetchUser } from './actions';
import { connect } from 'react-redux';
import ImageCapture from './components/ImageCapture';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import StayCurrentLandscapeIcon from '@mui/icons-material/StayCurrentLandscape';
import GoogleIcon from '@mui/icons-material/Google';
import SelectLanguage from './components/SelectLanguage/SelectLanguage';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import About from './components/About/About';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Analytics from './components/Analytics/Analytics';

const drawerWidth = 240;

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL_DEV;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const renderComponent = (activeItem) => {
  switch (activeItem) {
    case 'About Us':
      return <About />;
    case 'Upload Image':
      return (
        <div>
          <SelectLanguage />
          <ImageUpload />
        </div>
      );
    case 'Capture Image':
      return (
        <div>
          <SelectLanguage />
          <ImageCapture />
        </div>
      );
    case 'Analytics':
      return <Analytics />;
    default:
      return <></>;
  }
};

const renderListIcon = (text) => {
  switch (text) {
    case 'About Us':
      return <InfoIcon />;
    case 'Upload Image':
      return <UploadFileIcon />;
    case 'Capture Image':
      return <StayCurrentLandscapeIcon />;
    case 'Code Editor':
      return <CodeIcon />;
    case 'Analytics':
      return <AnalyticsIcon />;
    default:
      return <MailIcon />;
  }
};

function App({ user, fetchUser }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Upload Image');

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (text) => {
    if (text === 'Code Editor') {
      localStorage.removeItem(`code`);
      localStorage.removeItem(`language`);
      window.open('/editor');
      return;
    }

    setActiveItem(text);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Image-IDE
          </Typography>
          {Object.keys(user).length ? (
            <>
              <Button color='inherit' className='avatar-button'>
                <Avatar src={user.profilePic} alt={user.name} />
                <Typography>{user.name}</Typography>
              </Button>
              <Button color='inherit'>
                <a href={`/auth/logout`}>
                  <Typography>Logout</Typography>
                </a>
              </Button>
            </>
          ) : (
            <Button color='inherit'>
              <GoogleIcon />
              <a style={{ marginLeft: '5px' }} href={`/auth/google`}>
                <Typography>Login</Typography>
              </a>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            'About Us',
            'Upload Image',
            'Capture Image',
            'Code Editor',
            'Analytics',
          ].map((text, index) => (
            <Tooltip key={text} title={text}>
              <ListItem
                className={text === activeItem ? 'active-item' : ''}
                onClick={() => handleListItemClick(text)}
                button
                key={text}
              >
                <ListItemIcon>{renderListIcon(text)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className='main'>{renderComponent(activeItem)}</div>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, { fetchUser })(App);
