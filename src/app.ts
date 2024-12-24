import axios from 'axios';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    name: string;
    password: string;
}
export interface ProductData {
    Name: string;
    Price: string;
    File_name: string;
    Stock: string;
    Dates: string;
}

const baseUrl = 'https://localhost:5000/api/product';

async function getdata(data: RegisterData): Promise<unknown> {
    const response = await axios.post('https://localhost:5000/api/auth/register', data);
    return response.data;
}

async function getdatas(data: LoginData): Promise<unknown> {
    const response = await axios.post('https://localhost:5000/api/auth/login', data);
    return response.data;
}


async function updateProduct(id: string, data: ProductData): Promise<unknown> {
    const response = await axios.put(`${baseUrl}/update/${id}`, data);
    return response.data;

}

async function deleteProduct(id: string): Promise<unknown> {
    const response = await axios.delete(`${baseUrl}/remove/${id}`);
    return response.data;
}

const getProductone = async (id: string): Promise<unknown> => {
    const response = await axios.get(`${baseUrl}/find/${id}`);
    return response.data;
};


async function createProduct(product: ProductData): Promise<unknown> {
    const response = await axios.post(`${baseUrl}/create`, product);
    return {
        success: true,
        message: 'data is added successfully',
        data: response.data,
    };
}


export { getdata, getdatas, createProduct, getProductone, updateProduct, deleteProduct };
