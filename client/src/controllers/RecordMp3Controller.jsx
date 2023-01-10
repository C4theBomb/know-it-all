import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MicRecorder from 'mic-recorder-to-mp3';

import { useUser } from '../contexts';
import { RecordMp3 } from '../components';
import { setAudio, getAudio } from '../services/userServices';

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

    useEffect(() => {
        if (!userData.loading) {
            getAudio(userData.id).then((data) => {
                if (!data) {
                    return;
                }

                setUploadedFile(() => {
                    // Retrieve audio file of user if exists
                    return new File([data], 'userAudio.mp3', {
                        type: data.type,
                        lastModified: Date.now(),
                    });
                });
            });
        }
    }, [userData]);

    function togglePlay() {
        if (!uploadedFile) {
            return;
        }

        if (audioRecording && !audioRecording.ended) {
            // Reset audio and reset if track is playing
            audioRecording.pause();
            audioRecording.currentTime = 0;
            setAudioRecording(() => null);
        } else {
            // Set audio to file and play
            const audioFile = new Audio(URL.createObjectURL(uploadedFile));
            setAudioRecording(() => audioFile);
            audioFile.play();
        }
    }

    function record() {
        if (recording) {
            // Stop recording then set uploaded file to mp3 instance
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
            // Start recording
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

        // Create form data object and attach file and user token
        var formData = new FormData();
        formData.append('audioFile', uploadedFile, 'userAudio.mp3');
        formData.append('token', Cookies.get('token'));

        await setAudio(formData);
    }

    return <RecordMp3 {...{ togglePlay, record, uploadRecord, handleSubmit }} />;
}

export default RecordMp3Controller;
