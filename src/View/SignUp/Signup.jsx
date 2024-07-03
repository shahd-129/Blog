import { Box, Button, TextField, Typography } from '@mui/material';
import Joi from 'joi';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [inputValue, setInputValue] = useState({
    email: '',
    name: '',
    age: '',
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
      name: Joi.string().min(3).max(10).required().messages({
        'string.min': 'Name should be at least 3 characters',
        'string.max': 'Name should not exceed 10 characters',
        'any.required': 'Name is required'
      }),
      age: Joi.number().integer().min(15).max(70).required().messages({
        'number.base': 'Age must be a number',
        'number.min': 'Age must be at least 15',
        'number.max': 'Age must be at most 70',
        'any.required': 'Age is required'
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

    else navigate("/login");
  }

  function handleChange(event, identifier) {
    setInputValue((prev) => ({
      ...prev,
      [identifier]: event.target.value

    }));
    // console.log(identifier);
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

          <TextField
            value={inputValue.name}
            name="name"
            id="name"
            type="text"
            label="Name"
            variant="outlined"
            sx={{ borderRadius: "50%" }}
            onChange={(event) => handleChange(event, 'name')}
            error={!!errors.name}
            helperText={errors.name}
            color="secondary"
          />
          <TextField
            value={inputValue.age}
            name="age"
            id="age"
            type="number"
            label="Age"
            variant="outlined"
            onChange={(event) => handleChange(event, 'age')}
            error={!!errors.age}
            helperText={errors.age}
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

          <Button
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
              backToLogin();
            }}
          >
            Already have an account?
          </Link>
        </Box>

      </Box>















    </>
  );
}
















