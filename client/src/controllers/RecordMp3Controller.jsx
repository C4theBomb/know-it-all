import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';
import { useCallback, useEffect, useState } from 'react';

import { RecordMp3 } from '../components';
import { useUser } from '../contexts';
import { createRequest } from '../utils/requests';

function RecordMp3Controller() {
    const { userData } = useUser();

    const [recorder] = useState(
        new MicRecorder({
            bitRate: 128,
        })
    );
    const [recording, setRecording] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [audioRecording, setAudioRecording] = useState(null);

    const getData = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_DOMAIN_ROOT}/public/audio/${userData.id}.mp3`,
                { responseType: 'blob' }
            );
            setUploadedFile(() => {
                return new File([response.data], 'userAudio.mp3', {
                    type: response.data.type,
                    lastModified: Date.now(),
                });
            });
        } catch (error) {}
    }, [userData.id]);

    useEffect(getData, [getData]);

    function togglePlay() {
        if (audioRecording && !audioRecording.ended) {
            audioRecording.pause();
            audioRecording.currentTime = 0;
            setAudioRecording(() => null);
        } else {
            const audioFile = new Audio(URL.createObjectURL(uploadedFile));
            setAudioRecording(() => audioFile);
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
            recorder.start();
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

        const instance = createRequest();
        instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

        return instance.post('/auth/audio', formData);
    }

    return <RecordMp3 {...{ togglePlay, record, uploadRecord, handleSubmit }} />;
}

export default RecordMp3Controller;
