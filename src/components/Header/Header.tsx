import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Box,
  Menu,
  Tooltip,
  ListItemIcon,
  ThemeProvider,
  useScrollTrigger,
} from '@mui/material';
import { AddCircle, AccountCircle, Logout, Settings } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { LanguageToggle } from '../LanguageToggle';
import { ModalComponent } from '../Modal';
import { paths } from '../../routes/paths';

import './header.css';
import { signout } from '../../utils/login';

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
const transition = '0.5s';

interface IHeaderProps {
  isProfilePage?: boolean;
}

export function Header(props: IHeaderProps) {
  const scrollTrigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  const handleCreateNewBoard = () => {
    setOpenModal(true);
  };

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
    signout();
    navigate(paths.welcome);
  }, [navigate]);

  const handleEditProfile = useCallback(() => {
    handleAccountMenuClose();
    navigate(paths.profile);
  }, [navigate]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          sx={{
            bgcolor: scrollTrigger ? theme.palette.primary.dark : theme.palette.primary.main,
            transition: transition,
          }}
          elevation={scrollTrigger ? 5 : 2}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <LanguageToggle
              color={
                scrollTrigger
                  ? { background: theme.palette.primary.dark, hover: theme.palette.primary.main }
                  : null
              }
              transition={transition}
            />

            <Box>
              {!props.isProfilePage && (
                <Tooltip title={t('create_new_board')} arrow>
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
              )}
              <Tooltip title={t('account_of_current_user')} arrow>
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
                {!props.isProfilePage && (
                  <MenuItem onClick={handleEditProfile}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    {t('edit_profile')}
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  {t('sign_out')}
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <ModalComponent
        active={openModal}
        setActive={() => {
          setOpenModal(false);
        }}
      >
        <p>Here you will create your board</p>
      </ModalComponent>
    </>
  );
}
