import { useMemo } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import '@storybook/addon-console';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import { darkTheme, lightTheme } from '../src/themes';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    options: {
        storySort: {
            method: 'alphabetical',
        },
    },
    layout: 'fullscreen',
    viewport: {
        viewports: {
            laptop: {
                name: 'Laptop',
                styles: {
                    width: '1024px',
                    height: '576px',
                },
                type: 'desktop',
            },
            tablet: {
                name: 'Tablet',
                styles: {
                    width: '768px',
                    height: '1024px',
                },
                type: 'Tablet',
            },
            mobile: {
                name: 'Mobile',
                styles: {
                    width: '360px',
                    height: '740px',
                },
                type: 'mobile',
            },
        },
    },
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        title: 'Theme',
        defaultValue: 'light',
        toolbar: {
            icon: 'paintbrush',
            dynamicTitle: true,
            items: [
                { value: 'light', title: 'Light Mode', left: '🌞' },
                { value: 'dark', title: 'Dark Mode', left: '🌙' },
            ],
        },
    },
};

const THEMES = {
    light: lightTheme,
    dark: darkTheme,
};

export const withMuiTheme = (Story, context) => {
    const { theme: themeKey } = context.globals;

    const theme = useMemo(() => THEMES[themeKey] || THEMES['light'], [themeKey]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Story />
        </ThemeProvider>
    );
};

export const withBrowserRouter = (Story) => {
    return (
        <MemoryRouter>
            <Story />
        </MemoryRouter>
    );
};

initialize();

export const decorators = [mswDecorator, withBrowserRouter, withMuiTheme];
