import API from '../api/API';

export const Login = async () => {
    const response = await API.get('directory/');
    return response.data;
};

export const Register = async () => {
    const response = await API.get('directory/');
    return response.data;
};

export const Logout = async () => {
    const response = await API.get('directory/');
    return response.data;
};