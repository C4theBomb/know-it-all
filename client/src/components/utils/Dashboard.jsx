import React from 'react';

import { Paper, Box, IconButton, useMediaQuery, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import MemberUnit from '../utils/MemberUnit';

const DynamicPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: '2vh',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
    margin: '0 2vh',
    [theme.breakpoints.only('xs')]: {
        height: '80vh',
    },
    [theme.breakpoints.only('sm')]: {
        height: '80vh',
    },
    [theme.breakpoints.only('md')]: {
        height: '82vh',
    },
}));

function Dashboard({ children, rows, setSelection, onClick, open }) {
    const xs = useMediaQuery((theme) => theme.breakpoints.only('xs'));
    const sm = useMediaQuery((theme) => theme.breakpoints.only('sm'));
    const md = useMediaQuery((theme) => theme.breakpoints.only('md'));

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
            renderCell: (params) => (
                <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                    onClick={() => onClick(params.id)}
                >
                    <PlayArrowIcon />
                </IconButton>
            ),
        },
        { field: 'pronouns', headerName: 'Pronouns', flex: 2 },
        { field: 'email', headerName: 'Email', flex: 10, sortable: false },
    ];

    function calculateCollapsedSize() {
        if (xs) return '37vh';
        if (sm) return '63vh';
        if (md) return '68vh';
    }

    function calculateTableHeight() {
        return open ? '64vh' : '100%';
    }

    return (
        <React.Fragment>
            <Box sx={{ padding: '2vh' }}>{children}</Box>
            <Collapse
                collapsedSize={calculateCollapsedSize()}
                in={open ? false : true}
            >
                <DynamicPaper>
                    {(xs || sm) &&
                        rows.map((member) => {
                            return (
                                <MemberUnit member={member} onClick={onClick} />
                            );
                        })}
                    {md && (
                        <Box height={calculateTableHeight()}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                onSelectionModelChange={(newSelection) => {
                                    setSelection(() => newSelection.rows);
                                }}
                                checkboxSelection
                            />
                        </Box>
                    )}
                </DynamicPaper>
            </Collapse>
        </React.Fragment>
    );
}

export default Dashboard;
