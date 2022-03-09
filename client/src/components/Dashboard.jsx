import React from 'react';
import { Outlet } from 'react-router-dom';
import { Paper, Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Dashboard({ children, rows }) {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'firstName', headerName: 'First Name', flex: 3 },
        { field: 'lastName', headerName: 'Last Name', flex: 3 },
        { field: 'nickname', headerName: 'Nickname', flex: 2 },
        {
            field: 'namePronounciation',
            headerName: 'Pronounciation',
            flex: 2,
            sortable: false,
            renderCell: () => (
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                >
                    <PlayArrowIcon />
                </IconButton>
            ),
        },
        { field: 'pronouns', headerName: 'Pronouns', flex: 2 },
        { field: 'email', headerName: 'Email', flex: 10, sortable: false },
    ];
    const theme = useTheme();

    return (
        <React.Fragment>
            <Paper
                sx={{
                    ...theme.typography.body2,
                    padding: '2vh',
                    color: theme.palette.text.secondary,
                    flexGrow: 1,
                    height: '20vh',
                    margin: '2vh',
                    overflow: 'auto',
                }}
            >
                {children}
                <Outlet />
            </Paper>
            <Paper
                sx={{
                    ...theme.typography.body2,
                    padding: '2vh',
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    flexGrow: 1,
                    height: '67vh',
                    margin: '2vh',
                    overflow: 'auto',
                }}
            >
                <Box sx={{ height: '63vh' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Paper>
        </React.Fragment>
    );
}

export default Dashboard;
