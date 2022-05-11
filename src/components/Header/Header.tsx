import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Button,
  Box,
  Menu,
  Tooltip,
  ListItemIcon,
  ThemeProvider,
} from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {
  AddCircle,
  AccountCircle,
  Logout,
  Settings,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';

import './header.css';

const lang = ['EN', 'RU'];

const theme = createTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4aedc4',
      main: '#1de9b6',
      dark: '#14a37f',
      contrastText: '#000',
    },
  },
});

export function Header() {
  const scrollTrigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const [language, setLanguage] = useState(lang[0]);
  const [anchorLanguageToggle, setAnchorLanguageToggle] = React.useState<null | HTMLElement>(null);
  const isLanguageToggleClicked = Boolean(anchorLanguageToggle);

  const handleLanguageToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLanguageToggle(event.currentTarget);
  };
  const handleLanguageToggleClose = () => {
    setAnchorLanguageToggle(null);
  };

  const handleLanguageToggleEn = () => {
    setLanguage(lang[0]);
    handleLanguageToggleClose();
  };
  const handleLanguageToggleRu = () => {
    setLanguage(lang[1]);
    handleLanguageToggleClose();
  };

  const handleCreateNewBoard = () => {};

  const [anchorAccountMenu, setAnchorAccountMenu] = useState<null | HTMLElement>(null);

  const handleAccountMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAccountMenu(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorAccountMenu(null);
  };

  const handleLogout = () => {
    handleAccountMenuClose();
  };

  const handleEditProfile = () => {
    handleAccountMenuClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          bgcolor: scrollTrigger ? theme.palette.primary.dark : theme.palette.primary.main,
          transition: '0.5s',
        }}
        elevation={scrollTrigger ? 5 : 2}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            sx={{
              bgcolor: scrollTrigger ? theme.palette.primary.dark : theme.palette.primary.main,
              transition: '0.5s',
              '&:hover': {
                backgroundColor: scrollTrigger
                  ? theme.palette.primary.main
                  : theme.palette.primary.dark,
              },
            }}
            color={'primary'}
            endIcon={isLanguageToggleClicked ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            variant="contained"
            disableElevation
            id="basic-button"
            aria-controls={isLanguageToggleClicked ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isLanguageToggleClicked ? 'true' : undefined}
            onClick={handleLanguageToggleClick}
          >
            {language}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorLanguageToggle}
            open={isLanguageToggleClicked}
            onClose={handleLanguageToggleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLanguageToggleEn}>{lang[0]}</MenuItem>
            <MenuItem onClick={handleLanguageToggleRu}>{lang[1]}</MenuItem>
          </Menu>

          <Box>
            <Tooltip title="Create new board" arrow>
              <IconButton
                size="large"
                aria-label="Create new board"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleCreateNewBoard}
                color="inherit"
              >
                <AddCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="Account of current user" arrow>
              <IconButton
                size="large"
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleAccountMenuClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorAccountMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorAccountMenu)}
              onClose={handleAccountMenuClose}
            >
              <MenuItem onClick={handleEditProfile}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Edit Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
