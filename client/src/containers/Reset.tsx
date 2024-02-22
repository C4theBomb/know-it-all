import Helmet from "react-helmet";

import { ResetForm } from "../controllers";

export default function Reset() {
    return (
        <>
            <Helmet>
                <title>Reset | KnowItAll</title>
            </Helmet>
            <ResetForm />
        </>
    );
}
