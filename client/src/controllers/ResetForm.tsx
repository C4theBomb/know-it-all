import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ResetForm as ResetFormComponent } from "../components";
import { useError } from "../contexts";
import createRequest from "../utils/requests";

export default function ResetForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
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

            const instance = createRequest();
            await instance.patch(`/reset/${id}`);
            navigate("/login");
        },
        [id, navigate]
    );

    return (
        <ResetFormComponent
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
        />
    );
}
