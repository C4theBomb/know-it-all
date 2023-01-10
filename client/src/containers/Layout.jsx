import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import { useMode } from '../contexts';
import { Navbar } from '../controllers';
import { lightTheme, darkTheme } from '../themes';

const THEMES = {
    light: lightTheme,
    dark: darkTheme,
};

function Layout() {
    const { mode } = useMode();

    return (
        <ThemeProvider theme={THEMES[mode]}>
            <CssBaseline enableColorScheme />
            <Helmet>
                <title>KnowItAll</title>
            </Helmet>
            <main>
                <Navbar />
                <Box sx={{ height: { xs: '', sm: '92vh', md: '92vh' } }}>
                    <Outlet />
                </Box>
            </main>
        </ThemeProvider>
    );
}

export default Layout;
