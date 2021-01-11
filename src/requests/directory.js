import React from 'react';
import axios from 'axios';

import API from '../api/API';

export const GetAllDirectory = async () => {
    const response = await API.get('directory/');
    // console.log(response.data);
    return response.data;
};
