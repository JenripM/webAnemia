import Head from "next/head";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { DashboardLayout } from "@/dashboard/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const isLoginPage = Component.name === "LoginPage"; 
  return (
    <>
      <Head>
        <title>Salvia-kit Dashboard V3</title>
      </Head>
      {isLoginPage? (
        <Component {...pageProps} />
      ) : (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
    </>
  );
}

export default MyApp;
