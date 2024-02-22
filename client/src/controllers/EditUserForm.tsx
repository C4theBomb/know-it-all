import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosError } from "axios";
import { EditUserForm } from "../components";
import { useUser, useError } from "../contexts";
import createRequest from "../utils/requests";

function EditUserFormController() {
    const navigate = useNavigate();
    const { userData } = useUser();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        pronouns: "",
    });

    const { error } = useError();

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
                await instance.post("/auth/update", form);
                navigate("/");
            } catch (e) {
                const error = e as AxiosError;
                if (error.response?.status === 401) navigate("/login");
            }
        },
        [form, navigate]
    );

    useEffect(() => {
        setForm(() => ({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            pronouns: userData.pronouns,
        }));
    }, [userData]);

    return (
        <EditUserForm
            form={form}
            error={error}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    );
}

export default EditUserFormController;
