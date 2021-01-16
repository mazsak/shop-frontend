import API from '../api/API';

export const LoginApi = async (username, password) => {
    const response = await API.post('user/login', { username: username, password: password });
    return response.data;
};

export const RegisterApi = async (username, password) => {
    const response = await API.post('user/register', { username: username, password: password });
    return response.data;
};

export const OrdersApi = async () => {
    const response = await API.post('user/orders', JSON.parse(localStorage.getItem('products')) , { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const GetOrdersApi = async () => {
    const response = await API.get('user/orders', { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const GetUserRoleApi = async () => {
    const response = await API.get('user/role', { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    localStorage.setItem('role', JSON.stringify(response.data));
    return response.data;
};