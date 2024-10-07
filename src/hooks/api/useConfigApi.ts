import { getConfig } from '@/api/config';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getConfigQueryOptions = () => {
    return queryOptions({
        queryKey: ['config'],
        queryFn: getConfig,
        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export const useGetConfig = () => {
    return useSuspenseQuery(getConfigQueryOptions());
};
