import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutationFunction, QueryKey } from '@tanstack/react-query';

type OptimisticProps<TData = unknown, TVariables = void, TQueryFnData = unknown> = {
    /**
     * The mutation function that will be called when the mutation is triggered.
     */
    mutationFn: MutationFunction<TData, TVariables>;
    /**
     * The query key for the query that should be updated optimistically.
     */
    queryKey: QueryKey;
    /**
     * The updater function that will be called with the current query data
     * and the mutation variables to generate the new query data.
     * @param variables - Mutation response data to pass to the updater
     * @returns The new query data
     */
    // eslint-disable-next-line no-unused-vars
    updater: (variables: TVariables) => (input: TQueryFnData | undefined) => TQueryFnData | undefined;
    /**
     * The query key for the query that should be invalidated when the mutation is settled.
     */
    invalidates: QueryKey;
};

/**
 * Custom hook to extend useMutation to support optimistic updates.
 * @returns The mutation result object
 */
export const useOptimisticMutation = <TData = unknown, TVariables = void, TQueryFnData = unknown>({
    mutationFn,
    queryKey,
    updater,
    invalidates,
}: OptimisticProps<TData, TVariables, TQueryFnData>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        async onMutate(variables) {
            await queryClient.cancelQueries({
                queryKey,
            });

            const querySnapshot = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, updater(variables));

            return () => {
                queryClient.setQueryData(queryKey, querySnapshot);
            };
        },
        onError(_err, _variables, rollback) {
            rollback?.();
        },
        onSettled() {
            return queryClient.invalidateQueries({
                queryKey: invalidates,
            });
        },
    });
};
