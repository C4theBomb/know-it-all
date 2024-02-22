import { Buffer } from "buffer";
import Cookies from "js-cookie";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../components";
import { useError, useUser } from "../contexts";
import createRequest from "../utils/requests";
import { APIError } from "../types";

function LoginFormController() {
    const navigate = useNavigate();
    const { error, setError } = useError();
    const { setUserData } = useUser();

    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name } = e.target;
            const { value } = e.target;

            setForm((prevForm) => ({ ...prevForm, [name]: value }));
        },
        []
    );

    const handleCheckboxChange = useCallback(
        (e: React.SyntheticEvent<Element, Event>) => {
            const target = e.target as HTMLInputElement;

            const { name } = target;
            const { checked } = target;

            setForm((prevForm) => ({ ...prevForm, [name]: checked }));
        },
        []
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const encoded = Buffer.from(
                `${form.email}:${form.password}`
            ).toString("base64");

            const instance = createRequest();
            instance.defaults.headers.common.Authorization = `basic ${encoded}`;

            try {
                const response = await instance.post("/auth/login", {
                    remember: form.remember,
                });
                const expires = form.remember ? 365 : 1;

                setUserData(() => response.data.user);
                Cookies.set("token", response.data.token, { expires });

                navigate("/");
            } catch (e) {
                const error = e as APIError;

                if (error.response?.data?.error) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred");
                }
            }
        },
        [form, navigate, setUserData, setError]
    );

    return (
        <LoginForm
            form={form}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
            error={error}
        />
    );
}

export default LoginFormController;
