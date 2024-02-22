import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";

import { useCallback, useEffect, useState } from "react";

import { RecordMp3 as RecordMp3Component } from "../components";
import { useUser } from "../contexts";
import createRequest from "../utils/requests";

export default function RecordMp3() {
    const { userData } = useUser();

    const [recorder] = useState(
        new MicRecorder({
            bitRate: 128,
        })
    );
    const [recording, setRecording] = useState(false);
    const [uploadedFile, setUploadedFile] = useState();
    const [audioRecording, setAudioRecording] = useState(null);

    const getData = useCallback(async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_DOMAIN_ROOT}/public/audio/${userData.id}.mp3`,
            { responseType: "blob" }
        );
        setUploadedFile(
            () =>
                new File([response.data], "userAudio.mp3", {
                    type: response.data.type,
                    lastModified: Date.now(),
                })
        );
    }, [userData.id]);

    useEffect(() => {
        getData();
    }, [getData]);

    const togglePlay = useCallback(() => {
        if (audioRecording && !audioRecording.ended) {
            audioRecording.pause();
            audioRecording.currentTime = 0;
            setAudioRecording(() => null);
        } else {
            const audioFile = new Audio(URL.createObjectURL(uploadedFile));
            setAudioRecording(() => audioFile);
            audioFile.play();
        }
    }, [audioRecording, uploadedFile]);

    const record = useCallback(() => {
        if (recording) {
            setRecording(() => false);
            recorder
                .stop()
                .getMp3()
                .then(([buffer, blob]) => {
                    setUploadedFile(
                        () =>
                            new File(buffer, "userAudio.mp3", {
                                type: blob.type,
                                lastModified: Date.now(),
                            })
                    );
                });
        } else {
            setRecording(() => true);
            recorder.start();
        }
    }, [recorder, recording]);

    const uploadRecord = useCallback(() => {
        setUploadedFile(
            () => document.getElementById("icon-button-file").files[0]
        );
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("audioFile", uploadedFile, "userAudio.mp3");

            const instance = createRequest();
            instance.defaults.headers.common["Content-Type"] =
                "multipart/form-data";

            return instance.post("/auth/audio", formData);
        },
        [uploadedFile]
    );

    return (
        <RecordMp3Component
            togglePlay={togglePlay}
            record={record}
            uploadRecord={uploadRecord}
            handleSubmit={handleSubmit}
        />
    );
}
