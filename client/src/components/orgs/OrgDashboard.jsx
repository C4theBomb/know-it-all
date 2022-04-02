import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import {
    Typography,
    Grid,
    Stack,
    Box,
    ButtonGroup,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dashboard from '../utils/Dashboard';

const DynamicStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        spacing: 2,
        alignItems: 'flex-end',
    },
}));

function OrgDashboard() {
    const xs = useMediaQuery((theme) => theme.breakpoints.only('xs'));
    const { orgID } = useParams();
    const navigate = useNavigate();

    const [org, setOrg] = useState({
        orgID: orgID,
        orgName: '',
        orgOwner: {
            firstName: '',
            lastName: '',
            email: '',
        },
        orgMembers: [],
        createdAt: '',
        memberCount: 0,
    });
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState(true);
    const [selection, setSelection] = useState(null);
    const [open, setOpen] = useState(false);

    const linkStyle = { textDecoration: 'none', color: 'inherit' };
    const buttonGroupOrientation = () => {
        if (xs) return 'vertical';
    };

    useEffect(() => {
        async function getData() {
            await axios
                .get(
                    `${
                        process.env.REACT_APP_API_ROOT
                    }/org/${orgID}?token=${Cookies.get('token')}`
                )
                .then((response) => {
                    const res = response.data;
                    console.log(res);

                    setOrg(() => {
                        return {
                            orgID: res.org.orgID,
                            orgName: res.org.orgName,
                            orgOwner: {
                                firstName: res.org.orgOwner.firstName,
                                lastName: res.org.orgOwner.lastName,
                                email: res.org.orgOwner.email,
                            },
                            orgMembers: res.org.orgMember,
                            createdAt: res.org.createdAt,
                            memberCount: res.memberCount,
                        };
                    });

                    const orgMembers = res.org.orgMember.map((member) => {
                        return {
                            id: member.userID,
                            ...member,
                        };
                    });

                    setRows(() => orgMembers);

                    setStatus(() => res.status);
                })
                .catch((e) => {
                    console.log(e);
                    navigate('/');
                });
        }

        getData();
    }, [navigate, orgID]);

    async function handleDelete() {
        await axios
            .delete(`${process.env.REACT_APP_API_ROOT}/org/delete`, {
                params: {
                    token: Cookies.get('token'),
                    orgID,
                },
            })
            .then(navigate('/'));
    }

    function copyID() {
        navigator.clipboard.writeText(orgID);
    }

    function copyJoinLink() {
        navigator.clipboard.writeText(
            `${process.env.REACT_APP_DOMAIN_ROOT}/regsiter?orgID=${orgID}`
        );
    }

    async function removeSelected() {
        const doomedUserIDs = selection.map((row) => row.id);

        await axios.post(
            `${process.env.REACT_APP_API_ROOT}/org/${orgID}/delete`,
            {
                token: Cookies.get('token'),
                orgID,
                doomedUserIDs,
            }
        );
    }

    async function leaveOrg() {
        await axios
            .post(`${process.env.REACT_APP_API_ROOT}/org/${orgID}/delete`, {
                token: Cookies.get('token'),
                orgID,
            })
            .then(() => navigate('/'))
            .catch((e) => {
                console.log(e);
                navigate('/');
            });
    }

    function handleOpen() {
        setOpen((initial) => (initial ? false : true));
    }

    async function play(id) {
        axios
            .get(
                `${process.env.REACT_APP_DOMAIN_ROOT}/public/audio/${id}.mp3`,
                {
                    responseType: 'blob',
                }
            )
            .then((res) => {
                const uploadedFile = new File([res.data], 'userAudio.mp3', {
                    type: res.data.type,
                    lastModified: Date.now(),
                });
                const audioFile = new Audio(URL.createObjectURL(uploadedFile));
                audioFile.play();
            });
    }

    return (
        <Dashboard
            rows={rows}
            setSelection={setSelection}
            onClick={play}
            open={open}
        >
            <Accordion expanded={open} onChange={handleOpen}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='h6'>
                        Organizations/{org.orgName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ marginTop: '1vh' }} fullWidth>
                        <Grid
                            container
                            columns={{ xs: 3, sm: 12, md: 12 }}
                            spacing={1}
                        >
                            <Grid item xs={3}>
                                <Stack>
                                    <Typography variant='body1'>
                                        Organization ID: {org.orgID}
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
                                        Owner:{' '}
                                        {`${org.orgOwner.firstName} ${org.orgOwner.lastName}`}
                                    </Typography>
                                    <Typography variant='body1'>
                                        Email: {org.orgOwner.email}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={3} sm={6} md={6}>
                                <DynamicStack spacing={1}>
                                    {status ? (
                                        <React.Fragment>
                                            <ButtonGroup
                                                variant='outlined'
                                                orientation={buttonGroupOrientation()}
                                            >
                                                <Button color='warning'>
                                                    <Link
                                                        to='update'
                                                        style={linkStyle}
                                                    >
                                                        Edit {org.orgName}
                                                    </Link>
                                                </Button>
                                                <Button
                                                    color='error'
                                                    onClick={handleDelete}
                                                >
                                                    Delete {org.orgName}
                                                </Button>
                                            </ButtonGroup>
                                            <ButtonGroup
                                                variant='outlined'
                                                orientation={buttonGroupOrientation()}
                                            >
                                                <Button
                                                    color='success'
                                                    onClick={copyID}
                                                >
                                                    Copy Org ID
                                                </Button>
                                                <Button
                                                    color='success'
                                                    onClick={copyJoinLink}
                                                >
                                                    Copy Org Join Link
                                                </Button>
                                                <Button
                                                    color='error'
                                                    onClick={removeSelected}
                                                >
                                                    Remove People
                                                </Button>
                                            </ButtonGroup>
                                        </React.Fragment>
                                    ) : (
                                        <Button
                                            color='error'
                                            onClick={leaveOrg}
                                        >
                                            Leave Org
                                        </Button>
                                    )}
                                </DynamicStack>
                            </Grid>
                        </Grid>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Dashboard>
    );
}

export default OrgDashboard;
