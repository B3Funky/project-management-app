import React, { useCallback, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Header } from '../../components/Header';
import { paths } from '../../routes/paths';
import { ButtonComponent } from '../../components/Button';
import { deleteUser } from '../../utils/login';

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalActive(true);
  }, []);
  const handleConfirm = useCallback(async () => {
    await deleteUser();
    setIsDeleteModalActive(false);
    navigate('/');
  }, [navigate]);
  return (
    <>
      <ConfirmModal
        active={isDeleteModalActive}
        setActive={setIsDeleteModalActive}
        confirmAction={handleConfirm}
      >
        {t('delete_user_confirm')}
      </ConfirmModal>
      <Header isProfilePage={true} />
      <Grid
        height="100%"
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowGap={10}
      >
        <h2>{t('profile_page')}</h2>
        <ButtonComponent size="large" variant="contained" onClick={handleOpenDeleteModal}>
          {t('delete_user')}
        </ButtonComponent>
        <NavLink to={paths.main}>back to Main page</NavLink>
      </Grid>
    </>
  );
}
