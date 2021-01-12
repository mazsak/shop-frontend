import API from '../api/API';

export const GetProducts= async (directory, subdirectory, currentPage) => {
    const response = await API.get('products?directory=' + directory + '&subdirectory=' + subdirectory + '&current=' + currentPage + '&size=' + 2);
    console.log(response.data);
    return response.data;
};