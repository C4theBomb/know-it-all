import Helmet from "react-helmet";

import { MainPage as MainPageController } from "../controllers";

export default function MainPage() {
    return (
        <>
            <Helmet>
                <title>KnowItAll</title>
            </Helmet>
            <MainPageController />
        </>
    );
}
