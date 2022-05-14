import React, { useCallback, useMemo, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { signin } from '../../utils/login';
import { paths } from '../../routes/paths';

export function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const isFormFilled = useMemo(() => Boolean(login && password), [login, password]);

  const handleLogin = useCallback(() => {
    if (isFormFilled) {
      signin({ login, password });
      setLogin('');
      setPassword('');
    }
  }, [isFormFilled, login, password]);

  const handleChangeLogin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setLogin(event.target.value),
    [setLogin]
  );

  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
    [setPassword]
  );

  return (
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
        <TextField label="Login" onChange={handleChangeLogin} />
      </Grid>
      <Grid item>
        <TextField label="Password" type={'password'} onChange={handleChangePassword} />
      </Grid>
      <Grid item>
        <Button disabled={!isFormFilled} onClick={handleLogin} variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
      <Grid item>
        <p>
          Don&apos;t have an account? <NavLink to={paths.signUp}>Sign Up</NavLink>
        </p>
      </Grid>
      <Grid item>
        <NavLink to={paths.main}>to Main page</NavLink>
      </Grid>
    </Grid>
  );
}
