import Helmet from "react-helmet";

import { MemberOrgsDashboard } from "../controllers";

export default function MemberOrgs() {
    return (
        <>
            <Helmet>
                <title>Member Organizations | KnowItAll</title>
            </Helmet>
            <MemberOrgsDashboard />
        </>
    );
}
