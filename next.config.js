/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/auth/login',
  //       permanent: true, // o false, dependiendo de si la redirección debe ser permanente o temporal
  //     },
  //   ];
  // },
}

module.exports = nextConfig
