// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['utfs.io'],
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'utfs.io',
//                 port: '',
//             }
//         ]
//     }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
                pathname: '/**', // Adjust this if you need more specific paths
            }
        ]
    }
};

export default nextConfig;

