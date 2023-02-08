import axios from 'axios';
import React, { useState } from 'react';


const registerUser = async (firstname: string, lastname: string, username: string, password: string,
    dateofbirth: string, country: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', {
      firstName:firstname,
      lastName:lastname,
      username:username,
      password:password,
      dateOfBirth:dateofbirth,
      country:country
    });
    // eslint-disable-next-line no-console
    console.log(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};


export default registerUser;