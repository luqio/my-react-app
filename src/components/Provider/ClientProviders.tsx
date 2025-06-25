"use client";

import { useEffect } from "react";

import { OpenAPI } from "@/client";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Get API URL from window.__RUNTIME_CONFIG__ which is injected by runtime-config.js
    const runtimeConfig = (window as any).__RUNTIME_CONFIG__;
    // const apiUrl =
    //   runtimeConfig?.API_URL ||
    //   process.env.NEXT_PUBLIC_API_URL ||
    //   "http://127.0.0.1:8000";

    OpenAPI.BASE = '';
    OpenAPI.TOKEN = async () => {
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTE0NTM0MDgsInN1YiI6IjEifQ.vshW2TAeE8boRafazej608a91FGWID_ZFUqNhsi2KiI';
      return localStorage.getItem("access_token") || "";
    };
  }, []);

  return <>{children}</>;
};

export default ClientProvider;
