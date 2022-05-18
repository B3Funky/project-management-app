import React, { useCallback, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { SignHeader } from '../../components/SignHeader';
import { InputComponent } from '../../components/Input';
import { ButtonComponent } from '../../components/Button';
import { paths } from '../../routes/paths';
import { signup } from '../../utils/login';

export function SignUp() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const isFormFilled = useMemo(() => Boolean(name && login && password), [name, login, password]);

  const handleSignUp = useCallback(() => {
    if (isFormFilled) {
      signup({ name, login, password });
      setName('');
      setLogin('');
      setPassword('');
    }
  }, [isFormFilled, name, login, password]);

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
        <h2>Sign Up</h2>
        <Grid item>
          <InputComponent label="Name" onChange={handleChangeName} />
        </Grid>
        <Grid item>
          <InputComponent label="Login" onChange={handleChangeLogin} />
        </Grid>
        <Grid item>
          <InputComponent label="Password" type={'password'} onChange={handleChangePassword} />
        </Grid>
        <Grid item>
          <ButtonComponent
            isDisabled={!isFormFilled}
            onClick={handleSignUp}
            variant="contained"
            type="submit"
          >
            Submit
          </ButtonComponent>
        </Grid>
        <Grid item>
          <p>
            Already have an account? <NavLink to={paths.login}>Sign In</NavLink>
          </p>
        </Grid>
        <Grid item>
          <NavLink to={paths.main}>to Main page</NavLink>
        </Grid>
      </Grid>
    </>
  );
}
