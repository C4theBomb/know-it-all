import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UpdateOrganizationForm as UpdateOrganizationFormComponent } from "../components";
import createRequest from "../utils/requests";

export default function UpdateOrganizationForm() {
    const { orgID } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            setName(() => value);
        },
        []
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const instance = createRequest();
            instance.patch(`/org/${orgID}`, { orgName: name });
            navigate(`/org/${orgID}`);
        },
        [name, orgID, navigate]
    );

    return (
        <UpdateOrganizationFormComponent
            name={name}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    );
}
