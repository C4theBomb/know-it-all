import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import Dashboard from '../components/Dashboard';

function OrgDashboard() {
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

                    setOrg(() => {
                        return { ...res.org, memberCount: res.memberCount };
                    });

                    setRows(() => res.org.member);
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
            `${process.env.REACT_APP_DOMAIN_ROOT}/register?orgID=${orgID}`
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

    async function play(id) {
        await axios
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
            org={org}
            rows={rows}
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

export default OrgDashboard;
