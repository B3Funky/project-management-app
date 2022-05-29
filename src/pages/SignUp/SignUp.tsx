import React, { useCallback, useMemo, useState } from 'react';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SignHeader } from '../../components/SignHeader';
import { InputComponent } from '../../components/Input';
import { ButtonComponent } from '../../components/Button';
import { paths } from '../../routes/paths';
import { useSignup } from '../../hooks/use-signup';

export function SignUp() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { t } = useTranslation();
  const isFormFilled = useMemo(() => Boolean(name && login && password), [name, login, password]);
  const handleSignUp = useSignup(isFormFilled, setError, name, login, password);

  const handleChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value),
    [setName]
  );

  const handleChangeLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value),
    [setLogin]
  );

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
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
      >
        <Grid item>
          <h2>{t('signUp_page.header')}</h2>
        </Grid>
        <Grid item>
          <InputComponent label={t('name_input_label')} onChange={handleChangeName} />
        </Grid>
        <Grid item>
          <InputComponent label={t('login_input_label')} onChange={handleChangeLogin} />
        </Grid>
        <Grid item>
          <InputComponent
            label={t('password_input_label')}
            type="password"
            onChange={handleChangePassword}
          />
        </Grid>
        <Grid item>
          <ButtonComponent
            isDisabled={!isFormFilled}
            onClick={handleSignUp}
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
            {t('signUp_page.have_an_account')}{' '}
            <NavLink to={paths.login}>{t('signUp_page.link_to_signIn_page')}</NavLink>
          </p>
        </Grid>
      </Grid>
    </>
  );
}
