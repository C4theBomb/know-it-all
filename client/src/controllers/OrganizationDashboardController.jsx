import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { OrganizationDashboard } from '../components';
import { getAudio } from '../services/userServices';
import { getOrg, deleteOrg, removeMember } from '../services/orgServices';

function OrganizationDashboardController() {
    const { orgID } = useParams();
    const navigate = useNavigate();

    const [org, setOrg] = useState({
        id: orgID,
        name: '',
        owner: {
            firstName: '',
            lastName: '',
            email: '',
        },
        member: [],
        createdAt: '',
        memberCount: 0,
    });
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState(true);
    const [selection, setSelection] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function getData() {
            await getOrg(orgID)
                .then((res) => {
                    setOrg(() => {
                        return { ...res.org, memberCount: res.memberCount };
                    });

                    setRows(() => res.org.member);
                    setStatus(() => res.owner);
                })
                .catch((e) => {
                    console.error(e.response.data.error);
                    navigate('/');
                });
        }

        getData();
    }, [navigate, orgID]);

    function handleOpen() {
        setOpen((initial) => (initial ? false : true));
    }

    async function handleDelete() {
        await deleteOrg(orgID)
            .then(navigate('/'))
            .catch((e) => {
                console.error(e.response.data.error);
                navigate('/');
            });
    }

    function copyID() {
        navigator.clipboard.writeText(orgID);
    }

    function copyJoinLink() {
        navigator.clipboard.writeText(
            `${process.env.REACT_APP_DOMAIN_ROOT}/register?orgID=${orgID}`
        );
    }

    async function removeSelected() {
        const doomedUserIDs = selection.map((row) => row.id);

        try {
            await removeMember(orgID, doomedUserIDs);
        } catch (error) {
            const message = error.response.data;

            console.error(message.error);
        }
    }

    async function leaveOrg() {
        await removeMember(orgID, {})
            .then(navigate('/'))
            .catch((e) => {
                console.error(e.response.data.error);
            });
    }

    async function play(id) {
        await getAudio(id)
            .then((res) => {
                const uploadedFile = new File([res], 'userAudio.mp3', {
                    type: res.type,
                    lastModified: Date.now(),
                });
                const audioFile = new Audio(URL.createObjectURL(uploadedFile));
                audioFile.play();
            })
            .catch((e) => {
                console.error(e.response.data.error);
            });
    }

    return (
        <OrganizationDashboard
            org={org}
            rows={rows}
            open={open}
            handleOpen={handleOpen}
            setSelection={setSelection}
            onClick={play}
            status={status}
            handleDelete={handleDelete}
            copyID={copyID}
            copyJoinLink={copyJoinLink}
            removeSelected={removeSelected}
            leaveOrg={leaveOrg}
        />
    );
}

export default OrganizationDashboardController;
