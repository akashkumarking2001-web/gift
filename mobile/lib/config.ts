export const API_CONFIG = {
    BASE_URL: typeof window !== 'undefined' && window.location.hostname.includes('localhost') 
        ? window.location.origin 
        : '',
    CASHFREE_MODE: 'production',
};
