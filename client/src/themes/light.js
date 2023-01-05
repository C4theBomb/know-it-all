import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
        },
    },
});

export { lightTheme };
