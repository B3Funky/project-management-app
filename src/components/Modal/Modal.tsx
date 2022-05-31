import { IconButton, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactElement } from 'react';

interface IModal {
  active: boolean;
  setActive: (arg: boolean) => void;
  isArrow?: boolean;
  children: ReactElement;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const ModalComponent = ({ active, children, setActive, isArrow }: IModal) => {
  return (
    <Modal open={active} onClose={() => setActive(false)}>
      <Box sx={style}>
        {isArrow ? (
          <IconButton
            onClick={() => setActive(false)}
            sx={{ position: 'absolute', top: '0', right: '0' }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}

        {children}
      </Box>
    </Modal>
  );
};
