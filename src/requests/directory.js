import API from '../api/API';

export const GetAllDirectory = async () => {
    const response = await API.get('directory/');
    return response.data;
};
