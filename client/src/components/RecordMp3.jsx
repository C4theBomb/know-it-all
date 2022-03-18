import React, { useState } from 'react';

import MicRecorder from 'mic-recorder-to-mp3';

import { IconButton } from '@mui/material';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Mic from '@mui/icons-material/Mic';
import Upload from '@mui/icons-material/Upload';

import Form from './utils/Form';

function RecordMp3() {
    const [recorder] = useState(
        new MicRecorder({
            bitRate: 128,
        })
    );
    const [recording, setRecording] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [audio, setAudio] = useState(null);

    function togglePlay() {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setAudio(() => null);
        } else {
            const audioFile = new Audio(URL.createObjectURL(uploadedFile));
            setAudio(() => audioFile);
            audioFile.play();
        }
    }

    async function record() {
        if (recording) {
            console.log('Stopped Recording');
            recorder
                .stop()
                .getMp3()
                .then(([buffer, blob]) => {
                    setRecording(() => false);
                    setUploadedFile(() => {
                        return new File(buffer, 'me-at-thevoice.mp3', {
                            type: blob.type,
                            lastModified: Date.now(),
                        });
                    });
                });
        } else {
            recorder
                .start()
                .then(() => {
                    setRecording(() => true);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }

    function uploadRecord() {
        setUploadedFile(() => {
            return document.getElementById('icon-button-file').files[0];
        });
    }

    return (
        <Form>
            <form>
                <IconButton onClick={togglePlay}>
                    <PlayArrow />
                </IconButton>
                <IconButton onClick={record}>
                    <Mic />
                </IconButton>
                <input
                    id='icon-button-file'
                    type='file'
                    hidden
                    onChange={uploadRecord}
                />
                <label htmlFor='icon-button-file'>
                    <IconButton component='span'>
                        <Upload />
                    </IconButton>
                </label>
            </form>
        </Form>
    );
}

export default RecordMp3;
