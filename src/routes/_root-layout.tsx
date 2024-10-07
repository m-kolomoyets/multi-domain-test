import { queryClient } from '@/api/queryClient';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { getConfigQueryOptions } from '@/hooks/api/useConfigApi';
import { getUsersQueryOptions } from '@/hooks/api/useUsersApi';

export const Route = createFileRoute('/_root-layout')({
    component() {
        return <Outlet />;
    },
    async loader() {
        await queryClient.ensureQueryData(getConfigQueryOptions());
        await queryClient.ensureQueryData(getUsersQueryOptions());
    },
});
