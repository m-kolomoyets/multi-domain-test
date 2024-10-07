import { http } from './fetch';

export type VendorConfig = {
    id: string;
    name: string;
    logoUrl: string;
    accentColor: string;
};

export const getConfig = async () => {
    const response = await http('/api/config');

    if (!response.ok) {
        throw new Error('Failed to fetch config');
    }

    const json = await response.json();
    return json as VendorConfig;
};
