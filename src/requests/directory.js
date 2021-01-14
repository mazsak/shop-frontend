import API from '../api/API';

export const GetAllDirectory = async () => {
    const response = await API.get('directory/', { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};
