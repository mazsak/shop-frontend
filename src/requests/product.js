import API from '../api/API';

export const GetProducts= async (directory, subdirectory, currentPage) => {
    const response = await API.get('products?directory=' + directory + '&subdirectory=' + subdirectory + '&current=' + currentPage + '&size=' + 2);
    return response.data;
};

export const GetProductById= async (id) => {
    const response = await API.get('products/product/'+ id);
    return response.data;
};