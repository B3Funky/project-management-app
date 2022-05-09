import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, MenuItem, Menu, Tooltip, ListItemIcon } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { AddCircle, AccountCircle, Logout, Settings } from '@mui/icons-material';

import './header.css';

export function Header() {
  const scrollTrigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCreateNewBoard = () => {};

  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        bgcolor: scrollTrigger ? '#00695f' : '#009688',
        transition: '0.5s',
        alignItems: 'flex-end',
      }}
      elevation={scrollTrigger ? 5 : 2}
    >
      <Toolbar>
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
            onClick={handleAccountMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
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
      </Toolbar>
    </AppBar>
  );
}
