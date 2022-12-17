import Helmet from 'react-helmet';

import { UpdateOrganizationForm } from '../controllers';

function UpdateOrganization() {
    return (
        <>
            <Helmet>
                <title>Update Organization | KnowItAll</title>
            </Helmet>
            <UpdateOrganizationForm />
        </>
    );
}

export default UpdateOrganization;
