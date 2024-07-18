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

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'utfs.io',
//                 port: '',
//                 pathname: '/**', // Adjust this if you need more specific paths
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
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                child_process: false,
                net: false,
                tls: false,
                dns: false,
                'timers/promises': false,
            };
        }
        return config;
    }
};

export default nextConfig;



