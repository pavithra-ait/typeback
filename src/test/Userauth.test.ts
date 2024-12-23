import nock from 'nock';
import { getdata ,getdatas} from '../app';
const chai = require('chai');
const { expect } = chai;

describe('login authdication api', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    const mockUrl: string = 'https://localhost:5000/api/auth';

    it('should mock  data register is successfully', async () => {
        const mockResponse = {
            success: true,
            message: 'user is registered successfully',
            data: {
                id: '6769058f579e369972190dcf',
                name: 'pavi',
                email: 'pavi@gmail.com',
                password: '2345'
            },
        };

        nock(mockUrl)
            .post('/register', {
                name: 'pavi',
                email: 'pavi@gmail.com',
                password: '2345'
            })
            .reply(201, mockResponse);

        const result = await getdata({
            name: 'pavi',
            email: 'pavi@gmail.com',
            password: '2345'
        });

        expect(result).to.deep.equal(mockResponse);
    });
    it('should mock data register is failed ', async () => {
        const mockResponse = {
            success: false,
            message: 'failed',
            data: {
                id: '6769058f579e369972190dcf',
                name: 'pav',
                email: 'pavi@gmai.com',
                password: '234'
            },
        };

        nock(mockUrl)
            .post('/register', {
                name: 'pav',
                email: 'pavi@gmai.com',
                password: '234'
            })
            .reply(201, mockResponse);

        const result = await getdata({
            name: 'pav',
            email: 'pavi@gmai.com',
            password: '234'
        });

        expect(result).to.deep.equal(mockResponse);
    });
    it('should mock  data login is successfully', async () => {
        const mockResponse = {
            success: true,
            message: 'login successfully',
            data: {
                id: '6769058f579e369972190dcf',
                name: 'pavi',
                password: '2345'
            },
        };

        nock(mockUrl)
            .post('/login', {
                name: 'pavi',
                password: '2345'
            })
            .reply(201, mockResponse);

        const result = await getdatas({
            name: 'pavi',
            password: '2345'
        });

        expect(result).to.deep.equal(mockResponse);
    });
    it('should mock  user name is mismatch', async () => {
        const mockResponse = {
            success: false,
            message: 'login failed',
            data: {
                id: '6769058f579e369972190dcf',
                name: 'pav',
                password: '2345'
            },
        };

        nock(mockUrl)
            .post('/login', {
                name: 'pav',
                password: '2345'
            })
            .reply(201, mockResponse);

        const result = await getdatas({
            name: 'pav',
            password: '2345'
        });

        expect(result).to.deep.equal(mockResponse);
    });
    it('should mock  user password is mismatch', async () => {
        const mockResponse = {
            success: false,
            message: 'login failed',
            data: {
                id: '6769058f579e369972190dcf',
                name: 'pavi',
                password: '2341'
            },
        };

        nock(mockUrl)
            .post('/login', {
                name: 'pavi',
                password: '2341'
            })
            .reply(201, mockResponse);

        const result = await getdatas({
            name: 'pavi',
            password: '2341'
        });

        expect(result).to.deep.equal(mockResponse);
    });
});