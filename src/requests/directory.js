import API from '../api/API';

export const GetAllDirectory = async () => {
    const response = await API.get('directory/', { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const DeleteDirectoryById = async (id) => {
    const response = await API.delete('directory/'+ id, { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const CreateDirectory = async (directory) => {
    const response = await API.post('directory/', directory, { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const UpdateDirectory = async (directory) => {
    const response = await API.put('directory/'+ directory.id, directory, { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const GetAllSubdirectory = async () => {
    const response = await API.get('directory/subdirectory', { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const DeleteSubdirectoryById = async (id) => {
    const response = await API.delete('directory/subdirectory/'+ id, { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const CreateSubdirectory = async (subdirectory) => {
    const response = await API.post('directory/subdirectory', subdirectory, { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const UpdateSubdirectory = async (subdirectory) => {
    const response = await API.put('directory/subdirectory/'+ subdirectory.id, subdirectory, { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};