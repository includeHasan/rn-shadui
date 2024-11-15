/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      
          colors: {
            background: "#ffffff",
            foreground: "#0a0a0a",
            primary: {
              DEFAULT: "#1a1a1a",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#f4f4f5",
              foreground: "#0a0a0a",
            },
            destructive: {
              DEFAULT: "#ef4444",
              foreground: "#ffffff",
            },
            border: "#e4e4e7",
            input: "#e4e4e7",
            card: {
              DEFAULT: "#ffffff",
              foreground: "#0a0a0a",
            },
        
      },
    },
  },
  plugins: [],
};
