import { Box, Button, TextField, Typography } from '@mui/material';
import Joi from 'joi';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = (data) => {

    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required'
      }),
      password: Joi.string().pattern(new RegExp(/^[A-Z][a-z0-9]{5,10}$/)).required().messages({
        'string.pattern.base': 'Password must start with an uppercase letter and be 6-11 characters long',
        'any.required': 'Password is required'
      })
    });

    const result = schema.validate(data, { abortEarly: false });
    if (!result.error) return null;

    const validationErrors = {};
    console.log(validationErrors);
    for (let item of result.error.details) {

      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };


  function handleSubmit(event) {
    event.preventDefault();
    // console.log(inputValue);
    const errors = validate(inputValue);
    setErrors(errors);
    if (errors) return;
    else navigate("/");
  }

  function handleChange(event, identifier) {
    setInputValue((prev) => ({
      ...prev,
      [identifier]: event.target.value
    }));
  }
  function backToSignup() {
    navigate("/signup");
  }
  return (
    <>

      <Box
        height={400}
        width={400}
        my={6}
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
            Login Now....
          </Typography>

          <TextField
            value={inputValue.email}
            name="email"
            id="email"
            type="email"
            variant="outlined"
            label="Email"
            onChange={(event) => handleChange(event, 'email')}
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
            color="secondary"
          />

          <Button style={{ width: '100%' }}
            color="secondary"
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
          <Link
            component="button"
            variant="body2"
            color='secondary'
            onClick={() => {
              backToSignup();
            }}
          >
            Don't have an account?
          </Link>
        </Box>

      </Box>







    </>
  );
}







