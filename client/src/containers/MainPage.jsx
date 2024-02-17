import Helmet from 'react-helmet';

import { MainPageDisplay } from '../controllers';

function MainPage() {
    return (
        <>
            <Helmet>
                <title>KnowItAll</title>
            </Helmet>
            <MainPageDisplay />
        </>
    );
}

export default MainPage;
