import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import MainPage from './components/MainPage';

import Form from './components/utils/Form';
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import EditUser from './components/forms/EditUser';
import Recover from './components/forms/Recover';
import Reset from './components/forms/Reset';

import JoinedOrgs from './components/orgs/JoinedOrgs';
import OrgDashboard from './components/orgs/OrgDashboard';

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Navbar />}>
                        <Route index element={<MainPage />} />

                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='update' element={<EditUser />} />
                        <Route path='recover' element={<Form />}>
                            <Route index element={<Recover />} />
                            <Route path=':id' element={<Reset />} />
                        </Route>

                        <Route path='org' element={<JoinedOrgs />} />
                        <Route path='joined'>
                            <Route index element={<JoinedOrgs />} />
                            <Route path=':id' element={<OrgDashboard />} />
                        </Route>

                        <Route path='*' element={<Navigate to='' />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
