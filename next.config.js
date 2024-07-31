/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true, // o false, dependiendo de si la redirección debe ser permanente o temporal
      },
    ];
  },
}

module.exports = nextConfig
