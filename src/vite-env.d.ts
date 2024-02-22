/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_MY_MISTERIOUS_ENDPOINT: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
