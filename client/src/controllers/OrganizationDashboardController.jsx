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
    const [selection, setSelection] = useState(null);
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
                    console.log(e);
                    navigate('/');
                });
        }

        getData();
    }, [navigate, orgID]);

    function handleOpen() {
        setOpen((initial) => (initial ? false : true));
    }

    async function handleDelete() {
        await deleteOrg(orgID).then(navigate('/'));
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

        await removeMember(orgID, doomedUserIDs);
    }

    async function leaveOrg() {
        await removeMember(orgID, {}).then(navigate('/'));
    }

    async function play(id) {
        await getAudio(id).then((res) => {
            const uploadedFile = new File([res], 'userAudio.mp3', {
                type: res.type,
                lastModified: Date.now(),
            });
            const audioFile = new Audio(URL.createObjectURL(uploadedFile));
            audioFile.play();
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
