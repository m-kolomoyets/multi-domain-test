import { lazy, Suspense } from 'react';
import { queryClient } from '@/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { noopReturnNull } from '@/utils/common';

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? noopReturnNull // Render nothing in production
        : lazy(async () => {
              const res = await import('@tanstack/router-devtools');
              return {
                  default: res.TanStackRouterDevtools,
              };
          });
const TanStackQueryDevtools =
    process.env.NODE_ENV === 'production'
        ? noopReturnNull // Render nothing in production
        : lazy(async () => {
              const res = await import('@tanstack/react-query-devtools');
              return {
                  default: res.ReactQueryDevtools,
              };
          });
export const Route = createRootRoute({
    component() {
        return (
            <QueryClientProvider client={queryClient}>
                <Outlet />
                <Suspense>
                    <TanStackRouterDevtools />
                    <TanStackQueryDevtools />
                </Suspense>
            </QueryClientProvider>
        );
    },
});
