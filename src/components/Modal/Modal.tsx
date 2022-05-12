import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import React, { ReactElement } from 'react';

interface IModal {
  active: boolean;
  setActive: (arg: boolean) => void;
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

export const ModalComponent = ({ active, children, setActive }: IModal) => {
  return (
    <Modal open={active} onClose={() => setActive(false)}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};
