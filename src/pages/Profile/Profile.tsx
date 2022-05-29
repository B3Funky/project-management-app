import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Alert, Grid, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Header } from '../../components/Header';
import { paths } from '../../routes/paths';
import { ButtonComponent } from '../../components/Button';
import { deleteUser } from '../../utils/login';
import { InputComponent } from '../../components/Input';
import api from '../../utils/ApiBackend';
import { IUser } from '../../models/api';

export function Profile() {
  const [user, setUser] = useState<IUser>({ id: '', name: '', login: '' });
  const [isSnackbarOpened, setSnackbarOpened] = useState(false);
  const [password, setPassword] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const user = await api.user.get({ userId });
        setUser(user);
      }
    };
    fetchUser();
  }, []);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalActive(true);
  }, []);

  const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e?.target?.value);
  }, []);
  const handleChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, name: e?.target?.value });
    },
    [user]
  );
  const handleChangeUserLogin = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, login: e?.target?.value });
    },
    [user]
  );
  const handleConfirm = useCallback(async () => {
    await deleteUser();
    setIsDeleteModalActive(false);
    navigate('/');
  }, [navigate]);

  const isSubmitButtonEnabled = useMemo(
    () => Boolean(user.login && user.name && password),

    [user.login, user.name, password]
  );

  const handleSubmitChangeUser = useCallback(async () => {
    await api.user.update(
      { userId: user.id },
      { name: user.name, login: user.login, password: password }
    );
    setSnackbarOpened(true);
    const id = setTimeout(() => setSnackbarOpened(false), 3000);
    return () => clearTimeout(id);
  }, [password, user.id, user.login, user.name]);

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={isSnackbarOpened}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {t('changed_user')}
        </Alert>
      </Snackbar>
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
        rowGap={4}
      >
        <h2>{t('profile_page')}</h2>
        <InputComponent value={user?.name} onChange={handleChangeUserName} />
        <InputComponent value={user?.login} onChange={handleChangeUserLogin} />
        <InputComponent
          label="Password"
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
        <ButtonComponent
          onClick={handleSubmitChangeUser}
          isDisabled={!isSubmitButtonEnabled}
          size="medium"
          variant="outlined"
        >
          {t('change_user_data')}
        </ButtonComponent>
        <ButtonComponent size="large" variant="contained" onClick={handleOpenDeleteModal}>
          {t('delete_user')}
        </ButtonComponent>
        <NavLink to={paths.main}>back to Main page</NavLink>
      </Grid>
    </>
  );
}
