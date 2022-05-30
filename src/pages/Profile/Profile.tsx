import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Grid, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SnackBarComponent, IErrorMessage } from '../../components/SnackBar';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Header } from '../../components/Header';
import { InputComponent } from '../../components/Input';
import { ButtonComponent } from '../../components/Button';
import api, { ErrorResponse } from '../../utils/ApiBackend';
import { deleteUser } from '../../utils/login';
import { paths } from '../../routes/paths';
import { IUser } from '../../models/api';
import { IS_EMPTY_REGEXP } from '../../constants';

const SUCCESS_MODAL_TIMEOUT = 3000;

export function Profile() {
  const [user, setUser] = useState<IUser>({ id: '', name: '', login: '' });
  const [password, setPassword] = useState('');
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isSnackbarOpened, setSnackbarOpened] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<IErrorMessage | undefined>();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalActive(true);
  }, []);

  const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e?.target?.value);
    IS_EMPTY_REGEXP.test(e.target.value) ? setIsPasswordError(true) : setIsPasswordError(false);
  }, []);

  const handleChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, name: e?.target?.value });
      IS_EMPTY_REGEXP.test(e.target.value) ? setIsNameError(true) : setIsNameError(false);
    },
    [user]
  );

  const handleChangeUserLogin = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, login: e?.target?.value });
      IS_EMPTY_REGEXP.test(e.target.value) ? setIsLoginError(true) : setIsLoginError(false);
    },
    [user]
  );

  const handleConfirm = useCallback(async () => {
    await deleteUser();
    setIsDeleteModalActive(false);
    navigate(paths.welcome);
  }, [navigate]);

  const isSubmitButtonEnabled = useMemo(
    () => Boolean(user.login && user.name && password),

    [user.login, user.name, password]
  );

  const handleSubmitChangeUser = useCallback(async () => {
    let timeoutId: NodeJS.Timeout;

    try {
      await api.user.update(
        { userId: user.id },
        { name: user.name, login: user.login, password: password }
      );
      setSnackbarOpened(true);
      timeoutId = setTimeout(() => setSnackbarOpened(false), SUCCESS_MODAL_TIMEOUT);
    } catch (e) {
      if (e instanceof ErrorResponse) {
        if (e.status === 500) {
          const errorMessage: IErrorMessage = Object.assign(
            { text: t('login_exist'), severity: 'warning' as const },
            e
          );
          setErrorMessage(errorMessage);
          setIsRequestError(true);
        } else {
          const errorMessage: IErrorMessage = Object.assign(
            { text: t('something_wrong'), severity: 'error' as const },
            e
          );
          setErrorMessage(errorMessage);
          setIsRequestError(true);
        }
      }
    }

    return () => clearTimeout(timeoutId);
  }, [password, user.id, user.login, user.name]);

  const fetchUser = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const user = await api.user.get({ userId });
        setUser(user);
      } catch (e) {
        if (e instanceof ErrorResponse) {
          const errorMessage: IErrorMessage = Object.assign(
            { text: t('something_wrong'), severity: 'error' as const },
            e
          );
          setErrorMessage(errorMessage);
          setIsRequestError(true);
        }
      }
    } else {
    }
  };

  useEffect(() => {
    fetchUser().then();
  }, []);

  return (
    <>
      <SnackBarComponent
        isOpen={Boolean(isRequestError)}
        setIsOpen={setIsRequestError}
        message={errorMessage}
      ></SnackBarComponent>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={isSnackbarOpened}>
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
      <Header isProfilePage={true} goBack={true} />
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
        <InputComponent
          errorText={`${isNameError ? t('name_error_validation') : ''}`}
          label={t('name_input_label')}
          value={user?.name}
          onChange={handleChangeUserName}
        />
        <InputComponent
          errorText={`${isLoginError ? t('login_error_validation') : ''}`}
          label={t('login_input_label')}
          value={user?.login}
          onChange={handleChangeUserLogin}
        />
        <InputComponent
          errorText={`${isPasswordError ? t('password_error_validation') : ''}`}
          label={t('password_input_label')}
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
        <ButtonComponent
          size="medium"
          variant="contained"
          color="error"
          onClick={handleOpenDeleteModal}
        >
          {t('delete_user')}
        </ButtonComponent>
      </Grid>
    </>
  );
}
