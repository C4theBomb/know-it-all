import Helmet from 'react-helmet';

import { ResetForm } from '../controllers';

function Reset() {
    return (
        <>
            <Helmet>
                <title>Reset | KnowItAll</title>
            </Helmet>
            <ResetForm />
        </>
    );
}

export default Reset;
