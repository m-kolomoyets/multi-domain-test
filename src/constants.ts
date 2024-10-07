/**
 * Environment variables
 */
export const IS_DEV = import.meta.env.DEV;
export const API_URL = import.meta.env.VITE_API_URL;
export const BASE_PUBLIC_PATH = import.meta.env.VITE_BASE_PUBLIC_PATH;

/**
 * Common constants
 */
export const DEFAULT_TRANSITION = { type: 'linear', duration: 0.15 };

/**
 * Routing constants
 */
export const ROUTES = {
    notFound: '/404',
} as const;

export const EMPTY_ARRAY = [];

export const TEST_DOMAINS: Record<string, string> = {
    '3000': 'vendor-x',
    '3001': 'vendor-y',
};
