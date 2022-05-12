import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  SvgIcon,
  Button,
  Box,
  Menu,
  Tooltip,
  ListItemIcon,
  ThemeProvider,
  useScrollTrigger,
} from '@mui/material';
import {
  AddCircle,
  AccountCircle,
  Logout,
  Settings,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { paths } from '../../routes/paths';
import { ReactComponent as EnIcon } from '../../assets/icons/en.svg';
import { ReactComponent as RuIcon } from '../../assets/icons/ru.svg';

import './header.css';

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

  const [anchorLanguageToggle, setAnchorLanguageToggle] = useState<null | HTMLElement>(null);
  const isLanguageToggleClicked = Boolean(anchorLanguageToggle);

  const handleLanguageToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLanguageToggle(event.currentTarget);
  };
  const handleLanguageToggleClose = () => {
    setAnchorLanguageToggle(null);
  };

  const { t, i18n } = useTranslation();

  const handleLanguageToggle = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      i18n.changeLanguage(event.currentTarget.dataset.value).then();
      handleLanguageToggleClose();
    },
    [i18n]
  );

  const handleCreateNewBoard = () => {};

  const [anchorAccountMenu, setAnchorAccountMenu] = useState<null | HTMLElement>(null);

  const handleAccountMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAccountMenu(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorAccountMenu(null);
  };

  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    handleAccountMenuClose();
    navigate(paths.welcome);
  }, [navigate]);

  const handleEditProfile = useCallback(() => {
    handleAccountMenuClose();
    navigate(paths.profile);
  }, [navigate]);

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
            {i18n.language}
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
            <MenuItem data-value={'en'} onClick={handleLanguageToggle}>
              <SvgIcon sx={{ marginRight: '8px' }} inheritViewBox component={EnIcon} />
              {t('en')}
            </MenuItem>
            <MenuItem data-value={'ru'} onClick={handleLanguageToggle}>
              <SvgIcon sx={{ marginRight: '8px' }} inheritViewBox component={RuIcon} />
              {t('ru')}
            </MenuItem>
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
