import { http } from './fetch';

export type User = {
    name: string;
};

export const getUsers = async () => {
    const response = await http('/api/users');

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const json = await response.json();
    return json as User[];
};

export const createUser = async (user: User) => {
    const response = await http('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    const json = await response.json();
    return json as User;
};

export const deleteUser = async (user: User) => {
    const response = await http('/api/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Failed to delete user');
    }

    const json = await response.json();
    return json as User;
};
