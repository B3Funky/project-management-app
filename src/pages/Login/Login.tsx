import React, { useCallback, useMemo, useState } from 'react';
import { Alert, AlertTitle, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

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

  const handleLogin = useLogin(isFormFilled, setError, login, password);

  const handleChangeLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      setLogin(event.target.value);
    },
    [setLogin]
  );

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      setPassword(event.target.value);
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
      >
        <h2>Sign In</h2>
        <Grid item>
          <InputComponent label="Login" onChange={handleChangeLogin} />
        </Grid>
        <Grid item>
          <InputComponent label="Password" type={'password'} onChange={handleChangePassword} />
        </Grid>
        <Grid item>
          <ButtonComponent
            isDisabled={!isFormFilled}
            onClick={handleLogin}
            variant="contained"
            type="submit"
          >
            Submit
          </ButtonComponent>
        </Grid>
        {Boolean(error) && (
          <Grid item>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Grid>
        )}
        <Grid item>
          <p>
            Don&apos;t have an account? <NavLink to={paths.signUp}>Sign Up</NavLink>
          </p>
        </Grid>
        <Grid item>
          <NavLink to={paths.main}>to Main page</NavLink>
        </Grid>
      </Grid>
    </>
  );
}
