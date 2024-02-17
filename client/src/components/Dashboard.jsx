import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ButtonGroup,
    Collapse,
    Grid,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import { MemberUnit } from '.';
import { DynamicPaper, DynamicStack } from './StyledElements';

function Dashboard({
    rows,
    open,
    handleOpen,
    setSelection,
    onClick,
    org,
    status,
    handleDelete,
    copyID,
    copyJoinLink,
    removeSelected,
    leaveOrg,
}) {
    const xs = useMediaQuery((theme) => theme.breakpoints.only('xs'));
    const sm = useMediaQuery((theme) => theme.breakpoints.only('sm'));
    const md = useMediaQuery((theme) => theme.breakpoints.only('md'));

    const linkStyle = { textDecoration: 'none', color: 'inherit' };
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

    const buttonGroupOrientation = () => {
        if (xs) return 'vertical';
    };

    function calculateCollapsedSize() {
        if (xs) return '37vh';
        if (sm) return '63vh';
        if (md) return '68vh';
    }

    function calculateTableHeight() {
        return open ? '64vh' : '100%';
    }

    return (
        <>
            <Box sx={{ padding: '2vh' }}>
                <Accordion expanded={open} onChange={handleOpen}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant='h6'>Organizations / {org.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ marginTop: '1vh' }} fullWidth>
                            <Grid container columns={{ xs: 3, sm: 12, md: 12 }} spacing={1}>
                                <Grid item xs={3}>
                                    <Stack>
                                        <Typography variant='body1'>
                                            Organization ID: {org.id}
                                        </Typography>
                                        <Typography variant='body1'>
                                            Members: {org.memberCount}
                                        </Typography>
                                        <Typography variant='body1'>
                                            Created On: {org.createdAt}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={3}>
                                    <Stack>
                                        <Typography variant='body1'>
                                            Owner: {`${org.owner.firstName} ${org.owner.lastName}`}
                                        </Typography>
                                        <Typography variant='body1'>
                                            Email: {org.owner.email}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={3} sm={6} md={6}>
                                    <DynamicStack spacing={1}>
                                        {status ? (
                                            <>
                                                <ButtonGroup
                                                    variant='outlined'
                                                    orientation={buttonGroupOrientation()}
                                                >
                                                    <Button color='warning'>
                                                        <Link to='update' style={linkStyle}>
                                                            Edit {org.name}
                                                        </Link>
                                                    </Button>
                                                    <Button color='error' onClick={handleDelete}>
                                                        Delete {org.name}
                                                    </Button>
                                                </ButtonGroup>
                                                <ButtonGroup
                                                    variant='outlined'
                                                    orientation={buttonGroupOrientation()}
                                                >
                                                    <Button color='success' onClick={copyID}>
                                                        Copy Org ID
                                                    </Button>
                                                    <Button color='success' onClick={copyJoinLink}>
                                                        Copy Org Join Link
                                                    </Button>
                                                    <Button color='error' onClick={removeSelected}>
                                                        Remove People
                                                    </Button>
                                                </ButtonGroup>
                                            </>
                                        ) : (
                                            <Button color='error' onClick={leaveOrg}>
                                                Leave Org
                                            </Button>
                                        )}
                                    </DynamicStack>
                                </Grid>
                            </Grid>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Collapse collapsedSize={calculateCollapsedSize()} in={open ? false : true}>
                <DynamicPaper>
                    {(xs || sm) &&
                        rows.map((member) => {
                            return <MemberUnit member={member} onClick={onClick} />;
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
        </>
    );
}

export default Dashboard;
