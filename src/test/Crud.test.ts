import { createProduct, updateProduct, deleteProduct, getProductone } from '../app';
import { expect } from 'chai';
import nock from 'nock';

describe('product management api', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    const mockUrl = 'https://localhost:5000/api/product';

    it('should mock data is added successfully', async () => {
        const mockResponse = {
            success: true,
            message: 'data is added successfully',
            data: {
                id: '676915371f9ecd0c252207cb',
                Name: 'dress',
                Price: '900',
                File_name: '1734939959577.png',
                Stock: '1234',
                Dates: '2024-12-24T18:30:00.000Z'
            },
        };

        nock(mockUrl)
            .post('/create', {
                Name: 'dress',
                Price: '900',
                File_name: '1734939959577.png',
                Stock: '1234',
                Dates: '2024-12-24T18:30:00.000Z'
            })
            .reply(201, mockResponse);


        const result = await createProduct({
            Name: 'dress',
            Price: '900',
            File_name: '1734939959577.png',
            Dates: '2024-12-24T18:30:00.000Z',
            Stock: '1234',
        });
        expect(result.data.data).to.deep.equal(mockResponse.data);
    });

    it('should mock updating a product', async () => {
        const productId = '676915371f9ecd0c252207cb';
        const productUpdate = {
            Name: 'dress',
            Price: '9000',
            File_name: '1734939959577.png',
            Stock: '1234',
            Dates: '2024-12-24'
        };
        const mockResponse = {
            success: true,
            message: 'Product updated successfully',
        };
        nock(mockUrl)
            .put(`/update/${productId}`, productUpdate)
            .reply(200, mockResponse);
        const result = await updateProduct(productId, productUpdate);
        expect(result).to.deep.equal({
            success: true,
            message: 'Product updated successfully',
        });
    });

    it('should mock deleting a product', async () => {
        const productId = '676915371f9ecd0c252207cb';
        const mockResponse = {
            success: true,
            message: 'Product deleted successfully',
        };
        nock(mockUrl)
            .delete(`/remove/${productId}`)
            .reply(200, mockResponse);

        const result = await deleteProduct(productId);
        expect(result).to.deep.equal(mockResponse);
    });

    it('should mock retreive  a product', async () => {
        const productId = '676915371f9ecd0c252207cb';
        const mockResponse = {
            success: true,
            message: 'Product deleted successfully',
        };
        nock(mockUrl)
            .get(`/find/${productId}`)
            .reply(200, mockResponse);

        const result = await getProductone(productId);
        expect(result).to.deep.equal(mockResponse);
    });
    
});
