
interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module 'framer-motion' {
    export const motion: any;
    export const AnimatePresence: any;
}

declare module 'react-router-dom' {
    export const Link: any;
    export const useNavigate: any;
    export const useParams: any;
    export const Routes: any;
    export const Route: any;
    export const BrowserRouter: any;
}

declare module 'lucide-react';
declare module 'canvas-confetti';
declare module '@supabase/supabase-js' {
    export const createClient: any;
}

declare module 'react/jsx-runtime' {
    export const jsx: any;
    export const jsxs: any;
    export const Fragment: any;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
