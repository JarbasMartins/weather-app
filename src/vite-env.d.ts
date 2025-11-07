/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_URL_GEOCODING: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
