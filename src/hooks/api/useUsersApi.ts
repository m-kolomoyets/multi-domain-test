import { useOptimisticMutation } from '../useOptimisticMutation';
import { createUser, deleteUser, getUsers, User } from '@/api/users';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { EMPTY_ARRAY } from '@/constants';

export const getUsersQueryOptions = () => {
    return queryOptions({
        queryKey: ['users', 'get'],
        queryFn: getUsers,
    });
};

export const useGetUsers = () => {
    return useSuspenseQuery(getUsersQueryOptions());
};

export const useCreateUser = () => {
    return useOptimisticMutation<User, User, User[]>({
        mutationFn: createUser,
        queryKey: getUsersQueryOptions().queryKey,
        updater(value) {
            return (previousUsers) => {
                return [...(previousUsers ?? EMPTY_ARRAY), value];
            };
        },
        invalidates: getUsersQueryOptions().queryKey,
    });
};

export const useRemoveUser = () => {
    return useOptimisticMutation<User, User, User[]>({
        mutationFn: deleteUser,
        queryKey: getUsersQueryOptions().queryKey,
        updater(value) {
            return (previousUsers) => {
                return (
                    previousUsers?.filter((user) => {
                        return user.name !== value.name;
                    }) ?? EMPTY_ARRAY
                );
            };
        },
        invalidates: getUsersQueryOptions().queryKey,
    });
};
