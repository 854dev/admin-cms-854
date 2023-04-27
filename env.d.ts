/// <reference types="vite/client" />

declare type AnyFunction = (...args: any[]) => any;

interface ImportMetaEnv {
  readonly VITE_REACT_APP_TITLE: string;
  readonly VITE_REACT_APP_BACKEND_URL: string;
  readonly VITE_REACT_APP_HOST: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
