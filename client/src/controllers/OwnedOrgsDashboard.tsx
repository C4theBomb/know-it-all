import { useCallback, useEffect, useState } from "react";

import { OrganizationList } from "../components";
import { Organization } from "../types";
import createRequest from "../utils/requests";

export default function OwnedOrgsDashboard() {
    const [orgs, setOrgs] = useState<Organization[]>([]);

    const getOrgs = useCallback(async () => {
        const instance = createRequest();
        const response = await instance.get("/auth/orgs/member");
        setOrgs(() => response.data.orgs);
    }, []);

    useEffect(() => {
        getOrgs();
    }, [getOrgs]);

    return <OrganizationList orgs={orgs} />;
}
