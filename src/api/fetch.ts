import { API_URL, IS_DEV, TEST_DOMAINS } from '@/constants';

const port = window.location.port;

const createFetchInstance = (baseURL: string) => {
    return (url: string, options?: RequestInit) => {
        return fetch(`${baseURL}${url}`, {
            ...options,
            credentials: 'include',
            headers: {
                ...options?.headers,
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                'Access-Control-Allow-Headers':
                    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Vendor-Id',
                'X-Vendor-Id': IS_DEV ? TEST_DOMAINS[port] : window.location.hostname.split('.')[0],
            },
        });
    };
};

export const http = createFetchInstance(API_URL);
