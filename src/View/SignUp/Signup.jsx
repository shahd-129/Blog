import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useSignUpMutation } from '../../Api/Auth';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { validate } from 'util/joiValidation';


export default function Signup() {
  const [inputValue, setInputValue] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    rePassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [signUp, { isLoading, error }] = useSignUpMutation()

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(inputValue);
    setErrors(validationErrors);
    if (validationErrors) return;

    signUp(inputValue)
      .unwrap()
      .then((response) => {
        console.log(response);
        setInputValue({
          email: '',
          name: '',
          phone: '',
          password: '',
          rePassword: ''
        });

        navigate("/login");
      })

      .catch((err) => {
        console.error(err);
      });
  }


  function handleChange(event, identifier) {
    setInputValue((prev) => ({
      ...prev,
      [identifier]: event.target.value

    }));
  }

  function backToLogin() {
    navigate("/login");
  }

  return (
    <>

      <Box
        height={500}
        width={500}
        my={5}
        mx={"auto"}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        gap={4}
        p={2}
        borderRadius={4}
        sx={{ border: '1px solid grey' }}
      >

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          textAlign="center"
          p={5}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            marginY={4}
          >
            SignUp Now....
          </Typography>

          {error && <Typography sx={{ color: 'red' }}>{error.data.message}</Typography>}
          <TextField
            value={inputValue.name}
            name="name"
            id="name"
            type="text"
            label="Name"
            variant="outlined"
            sx={{ borderRadius: "50%" }}
            onChange={(event) => handleChange(event, 'name')}
            error={!!errors?.name}
            helperText={errors?.name}
            color="secondary"
          />
          <TextField
            value={inputValue.phone}
            name="phone"
            id="phone"
            type="tel"
            label="Phone"
            variant="outlined"
            onChange={(event) => handleChange(event, 'phone')}
            error={!!errors?.phone}
            helperText={errors?.phone}
            color="secondary"
          />
          <TextField
            value={inputValue.email}
            name="email"
            id="email"
            type="email"
            variant="outlined"
            label="Email"
            onChange={(event) => handleChange(event, 'email')}
            error={!!errors?.email}
            helperText={errors?.email}
            color="secondary"
          />
          <TextField
            value={inputValue.password}
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            onChange={(event) => handleChange(event, 'password')}
            variant="outlined"
            error={!!errors?.password}
            helperText={errors?.password}
            color="secondary"
          />
          <TextField
            value={inputValue.rePassword}
            id="rePassword"
            label="Re-Password"
            type="password"
            autoComplete="current-password"
            name="rePassword"
            onChange={(event) => handleChange(event, 'rePassword')}
            variant="outlined"
            error={!!errors?.rePassword}
            helperText={errors?.rePassword}
            color="secondary"
          />
          {isLoading ?
            <CircularProgress color="secondary" />
            :
            <>
              <Button color="secondary" type="submit" variant="contained">
                Sign Up
              </Button>
              <Link
                component="button"
                variant="body2"
                color='secondary'
                onClick={() => {
                  backToLogin();
                }}
              >
                Already have an account?
              </Link>
            </>}

        </Box>

      </Box>

    </>
  );
}