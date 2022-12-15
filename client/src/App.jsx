import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './containers';
import { ContextProvider } from './contexts';
import MainPage from './controllers/MainPage';

import Form from './components/Form';
import Login from './controllers/Login';
import Register from './controllers/Register';
import EditUser from './controllers/EditUser';
import Recover from './controllers/Recover';
import Reset from './controllers/Reset';

import OwnedOrgs from './controllers/OwnedOrgs';
import MemberOrgs from './controllers/MemberOrgs';
import OrgDashboard from './controllers/OrgDashboard';
import UpdateOrganization from './controllers/UpdateOrganization';

function App() {
    return (
        <BrowserRouter>
            <ContextProvider>
                <Routes>
                    <Route path='' element={<Layout />}>
                        {/* <Route index element={<MainPage />} /> */}

                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        {/* <Route path='update' element={<EditUser />} /> */}
                        {/* <Route path='recover' element={<Form />}>
                            <Route index element={<Recover />} />
                            <Route path=':id' element={<Reset />} />
                        </Route> */}

                        {/* <Route path='org'>
                            <Route index element={<OwnedOrgs />} />
                            <Route path='joined' element={<MemberOrgs />} />
                            <Route path=':orgID'>
                                <Route index element={<OrgDashboard />} />
                                <Route path='update' element={<UpdateOrganization />} />
                            </Route>
                        </Route> */}

                        <Route path='*' element={<Navigate to='' />} />
                    </Route>
                </Routes>
            </ContextProvider>
        </BrowserRouter>
    );
}

export default App;
