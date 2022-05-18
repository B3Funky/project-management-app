import React from 'react';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { SignHeader } from '../../components/SignHeader';
import { InputComponent } from '../../components/Input';
import { ButtonComponent } from '../../components/Button';
import { paths } from '../../routes/paths';

export function SignUp() {
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
          <InputComponent label="Name" onChange={() => {}} />
        </Grid>
        <Grid item>
          <InputComponent label="Login" onChange={() => {}} />
        </Grid>
        <Grid item>
          <InputComponent label="Password" type={'password'} onChange={() => {}} />
        </Grid>
        <Grid item>
          <ButtonComponent isDisabled={true} onClick={() => {}} variant="contained" type="submit">
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
