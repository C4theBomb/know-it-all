import Helmet from "react-helmet";

import { UpdateOrganizationForm } from "../controllers";

export default function UpdateOrganization() {
    return (
        <>
            <Helmet>
                <title>Update Organization | KnowItAll</title>
            </Helmet>
            <UpdateOrganizationForm />
        </>
    );
}
