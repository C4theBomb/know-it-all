import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import MainPage from './components/MainPage';

import Form from './components/utils/Form';
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import EditUser from './components/forms/EditUser';
import Recover from './components/forms/Recover';
import Reset from './components/forms/Reset';

import OwnedOrgs from './components/orgs/OwnedOrgs';
import MemberOrgs from './components/orgs/MemberOrgs';
import OrgDashboard from './components/orgs/OrgDashboard';
import UpdateOrganization from './components/forms/UpdateOrganization';

function App() {
    const [token, setToken] = useState(false);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route
                        path=''
                        element={<Navbar tokenState={{ token, setToken }} />}
                    >
                        <Route path='record' element={<RecordMp3 />} />
                        <Route index element={<MainPage />} />

                        <Route
                            path='login'
                            element={<Login setToken={setToken} />}
                        />
                        <Route path='register' element={<Register />} />
                        <Route path='update' element={<EditUser />} />
                        <Route path='recover' element={<Form />}>
                            <Route index element={<Recover />} />
                            <Route path=':id' element={<Reset />} />
                        </Route>

                        <Route path='org'>
                            <Route index element={<OwnedOrgs />} />
                            <Route path='joined' element={<MemberOrgs />} />
                            <Route path=':orgID'>
                                <Route index element={<OrgDashboard />} />
                                <Route
                                    path='update'
                                    element={<UpdateOrganization />}
                                />
                            </Route>
                        </Route>

                        <Route path='*' element={<Navigate to='' />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
