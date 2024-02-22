import React, { useCallback, useEffect, useState } from "react";

import { MainPage as MainPageComponent } from "../components";
import createRequest from "../utils/requests";
import { Organization } from "../types";

export default function MainPage() {
    const [ownedOrgs, setOwnedOrgs] = useState<Organization[]>([]);
    const [orgs, setOrgs] = useState<Organization[]>([]);
    const [form, setForm] = useState({
        name: "",
        id: "",
    });

    const getOwnedOrgs = useCallback(async () => {
        const instance = createRequest();
        const response = await instance.get("/auth/orgs");
        setOwnedOrgs(() => response.data.orgs);
    }, []);

    const getMemberOrgs = useCallback(async () => {
        const instance = createRequest();
        const response = await instance.get("/auth/orgs/member");
        setOrgs(() => response.data.orgs);
    }, []);

    useEffect(() => {
        getOwnedOrgs();
        getMemberOrgs();
    }, [getOwnedOrgs, getMemberOrgs]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name } = e.target;
            const { value } = e.target;

            setForm((form) => ({ ...form, [name]: value }));
        },
        []
    );

    const makeOrg = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const instance = createRequest();
            instance.post("/org/create", form).then(getOwnedOrgs);
        },
        [form, getOwnedOrgs]
    );

    const joinOrg = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const instance = createRequest();
            instance.post(`/org/${form.id}/add`, {}).then(getMemberOrgs);
        },
        [form, getMemberOrgs]
    );

    return (
        <MainPageComponent
            form={form}
            orgs={orgs}
            ownedOrgs={ownedOrgs}
            handleChange={handleChange}
            joinOrg={joinOrg}
            createOrg={makeOrg}
        />
    );
}
