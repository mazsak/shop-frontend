import API from '../api/API';

export const GetProducts = async (directory, subdirectory, currentPage) => {
    const response = await API.get('products?directory=' + directory + '&subdirectory=' + subdirectory + '&current=' + currentPage + '&size=' + 2);
    return response.data;
};

export const GetAllProducts = async () => {
    const response = await API.get('products/all');
    return response.data;
};

export const GetProductById = async (id) => {
    const response = await API.get('products/product/' + id, { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const DeleteProductById = async (id) => {
    const response = await API.delete('products/product/' + id, { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const CreateProduct = async (product) => {
    const response = await API.post('products', product,  { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};

export const UpdateProduct = async (product) => {
    const response = await API.put('products/product/' + product.id, product,  { headers: { Authorization: JSON.parse(localStorage.getItem('token')) } });
    return response.data;
};