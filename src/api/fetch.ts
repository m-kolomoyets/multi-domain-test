import { IS_DEV, TEST_DOMAINS } from '@/constants';

const port = window.location.port;

const createFetchInstance = (baseURL: string) => {
    return (url: string, options?: RequestInit) => {
        return fetch(`${baseURL}${url}`, {
            ...options,
            headers: {
                ...options?.headers,
                'X-Vendor-Id': IS_DEV ? TEST_DOMAINS[port] : window.location.hostname.split('-')[0],
            },
        });
    };
};

export const http = createFetchInstance('http://localhost:3002');
