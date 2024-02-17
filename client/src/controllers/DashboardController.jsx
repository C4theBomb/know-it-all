import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Dashboard } from '../components';
import { createRequest } from '../utils/requests';

function DashboardController() {
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

    const getOrg = useCallback(async () => {
        try {
            const instance = createRequest();
            const response = await instance.get(`/org/${orgID}`);

            const orgData = { ...response.data.org, memberCount: response.data.memberCount };

            setOrg(() => orgData);
            setRows(() => response.data.org.member);
            setStatus(() => response.data.owner);
        } catch (error) {
            navigate('/');
        }
    }, [navigate, orgID]);

    useEffect(getOrg, [getOrg]);

    function handleOpen() {
        setOpen((initial) => (initial ? false : true));
    }

    async function handleDelete() {
        try {
            const instance = createRequest();
            await instance.delete(`/org/${orgID}`);
            navigate('/');
        } catch (error) {}
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
            const instance = createRequest();
            await instance.post(`/org/${orgID}/remove`, { doomedUserIDs });
        } catch (error) {}
    }

    async function leaveOrg() {
        try {
            const instance = createRequest();
            await instance.post(`/org/${orgID}/remove`, {});
            navigate('/');
        } catch (error) {}
    }

    async function play(id) {
        try {
            const request = await axios.get(
                `${process.env.REACT_APP_DOMAIN_ROOT}/public/audio/${id}.mp3`,
                { responseType: 'blob' }
            );
            const uploadedFile = new File([request.data], 'userAudio.mp3', {
                type: request.data.type,
                lastModified: Date.now(),
            });
            const audioFile = new Audio(URL.createObjectURL(uploadedFile));
            audioFile.play();
        } catch (error) {}
    }

    return (
        <Dashboard
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

export default DashboardController;
