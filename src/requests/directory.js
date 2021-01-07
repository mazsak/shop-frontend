import React from 'react';
import axios from 'axios';

import API from '../api/API';


GetAllDirectory = async () => {
    const response = await API.get('directory');

    console.log(response);
    console.log(response.data);
};


export default { GetAllDirectory };