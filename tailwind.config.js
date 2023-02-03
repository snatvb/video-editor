module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'fade-out': 'fadeOut 300ms ease-in-out',
                'fade-in': 'fadeIn 300ms ease-in-out',
            },
            keyframes: () => ({
                fadeOut: {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            }),
        },
    },
    plugins: [require('flowbite/plugin')],
}
