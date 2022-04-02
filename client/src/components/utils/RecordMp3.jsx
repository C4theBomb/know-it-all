import React, { useState, useEffect } from 'react';

import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';
import Cookies from 'js-cookie';

import { IconButton } from '@mui/material';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Mic from '@mui/icons-material/Mic';
import Upload from '@mui/icons-material/Upload';
import SaveAs from '@mui/icons-material/SaveAs';

function RecordMp3() {
    const [recorder] = useState(
        new MicRecorder({
            bitRate: 128,
        })
    );
    const [recording, setRecording] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        axios
            .get(
                `${
                    process.env.REACT_APP_DOMAIN_ROOT
                }/public/audio/${Cookies.get('userID')}.mp3`,
                {
                    responseType: 'blob',
                }
            )
            .then((res) => {
                setUploadedFile(() => {
                    return new File([res.data], 'userAudio.mp3', {
                        type: res.data.type,
                        lastModified: Date.now(),
                    });
                });
            });
    }, []);

    function togglePlay() {
        if (audio && !audio.ended) {
            audio.pause();
            audio.currentTime = 0;
            setAudio(() => null);
        } else {
            const audioFile = new Audio(URL.createObjectURL(uploadedFile));
            setAudio(() => audioFile);
            audioFile.play();
        }
    }

    function record() {
        if (recording) {
            setRecording(() => false);
            recorder
                .stop()
                .getMp3()
                .then(([buffer, blob]) => {
                    setUploadedFile(() => {
                        return new File(buffer, 'userAudio.mp3', {
                            type: blob.type,
                            lastModified: Date.now(),
                        });
                    });
                });
        } else {
            setRecording(() => true);
            recorder.start().catch((e) => {
                console.error(e);
            });
        }
    }

    function uploadRecord() {
        setUploadedFile(() => {
            return document.getElementById('icon-button-file').files[0];
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('audioFile', uploadedFile, 'userAudio.mp3');
        formData.append('token', Cookies.get('token'));

        await axios.post(
            `${process.env.REACT_APP_API_ROOT}/auth/audio`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <IconButton onClick={togglePlay}>
                <PlayArrow />
            </IconButton>
            <IconButton onClick={record}>
                <Mic />
            </IconButton>
            <input
                id='icon-button-file'
                type='file'
                accept='audio/*'
                hidden
                onChange={uploadRecord}
            />
            <label htmlFor='icon-button-file'>
                <IconButton component='span'>
                    <Upload />
                </IconButton>
            </label>
            <IconButton type='submit'>
                <SaveAs />
            </IconButton>
        </form>
    );
}

export default RecordMp3;
