import Helmet from "react-helmet";

import { Dashboard } from "../controllers";

export default function OrgDashboard() {
    return (
        <>
            <Helmet>
                <title>Dashboard | KnowItAll</title>
            </Helmet>
            <Dashboard />
        </>
    );
}
