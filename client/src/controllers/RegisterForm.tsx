import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RegisterForm } from "../components";
import { useError } from "../contexts";
import createRequest from "../utils/requests";
import { APIError } from "../types";

function RegisterFormController() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { error, setError } = useError();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pronouns: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name } = e.target;
        const { value } = e.target;

        setForm((form) => ({ ...form, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...filteredForm } = form;

        const fullForm = { ...filteredForm, orgID: params.get("orgID") };

        try {
            const instance = createRequest();
            await instance.post("/auth/register", fullForm);
            navigate("/login");
        } catch (e) {
            const error = e as APIError;

            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred");
            }
        }
    }

    return (
        <RegisterForm
            {...{
                form,
                handleSubmit,
                handleChange,
                error,
            }}
        />
    );
}

export default RegisterFormController;
