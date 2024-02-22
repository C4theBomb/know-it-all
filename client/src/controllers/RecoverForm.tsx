import React, { useCallback, useState } from "react";

import { RecoverForm } from "../components";
import createRequest from "../utils/requests";
import { APIError } from "../types";

function RecoverFormController() {
    const [form, setForm] = useState({
        email: "",
    });
    const [error, setError] = useState("");

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name } = e.target;
            const { value } = e.target;

            setForm((form) => ({ ...form, [name]: value }));
        },
        []
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                const instance = createRequest();
                await instance.post("/auth/reset", form);
            } catch (e) {
                const error = e as APIError;
                if (error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred");
                }
            }
        },
        [form]
    );

    return (
        <RecoverForm
            form={form}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

export default RecoverFormController;
