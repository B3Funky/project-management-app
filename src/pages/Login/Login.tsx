import React, { useCallback, useMemo, useState } from 'react';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IS_EMPTY_REGEXP } from '../../constants';

import { SignHeader } from '../../components/SignHeader';
import { paths } from '../../routes/paths';
import { useLogin } from '../../hooks/use-login';
import { InputComponent } from '../../components/Input';
import { ButtonComponent } from '../../components/Button';

export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const isFormFilled = useMemo(() => Boolean(login && password), [login, password]);
  const [error, setError] = useState('');
  const [isLoginError, setIsLoginError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const { t } = useTranslation();
  const handleLogin = useLogin(isFormFilled, setError, login, password);

  const handleChangeLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      setLogin(event.target.value);
      IS_EMPTY_REGEXP.test(event.target.value) ? setIsLoginError(true) : setIsLoginError(false);
    },
    [setLogin]
  );

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      setPassword(event.target.value);
      IS_EMPTY_REGEXP.test(event.target.value)
        ? setIsPasswordError(true)
        : setIsPasswordError(false);
    },
    [setPassword]
  );

  return (
    <>
      <SignHeader />
      <Grid
        height="100%"
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowGap={2}
      >
        <Grid item>
          <h2>{t('signIn_page.header')}</h2>
        </Grid>
        <Grid item>
          <InputComponent
            errorText={`${isLoginError ? t('login_error_validation') : ''}`}
            label={t('login_input_label')}
            onChange={handleChangeLogin}
          />
        </Grid>
        <Grid item>
          <InputComponent
            errorText={`${isPasswordError ? t('password_error_validation') : ''}`}
            label={t('password_input_label')}
            type="password"
            onChange={handleChangePassword}
          />
        </Grid>
        <Grid item>
          <ButtonComponent
            isDisabled={!isFormFilled}
            onClick={handleLogin}
            variant="contained"
            type="submit"
          >
            {t('submit_button')}
          </ButtonComponent>
        </Grid>
        {Boolean(error) && (
          <Grid item>
            <Alert severity="error">
              <AlertTitle>{t('error')}</AlertTitle>
              {error}
            </Alert>
          </Grid>
        )}
        <Grid item>
          <p>
            {t('signIn_page.no_account')}{' '}
            <NavLink to={paths.signUp}>{t('signIn_page.link_to_signUp_page')}</NavLink>
          </p>
        </Grid>
      </Grid>
    </>
  );
}
