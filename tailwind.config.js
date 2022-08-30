const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                '3xs': `${0.5 * 0.25}em`,
                '2xs': `${1 * 0.25}em`,
                xs: `${2 * 0.25}em`,
                sm: `${3 * 0.25}em`,
                base: `${4 * 0.25}em`,
                md: `${6 * 0.25}em`,
                lg: `${10 * 0.25}em`,
                xl: `${14 * 0.25}em`,
                '2xl': `${18 * 0.25}em`,
                '20%': '20%',
                '50%': '50%',
            },
            fontSize: {
                xxs: ['10px', '10px'],
                md: ['1.05rem', '1.5rem'],
                ...defaultTheme.fontSize,
            },
        },
    },
    plugins: [],
};