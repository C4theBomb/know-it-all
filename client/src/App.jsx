import React, { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import Form from './components/Form';
import Login from './components/Login';
import Register from './components/Register';
import EditUser from './components/EditUser';
import Recover from './components/Recover';
import Reset from './components/Reset';

import JoinedOrgs from './components/JoinedOrgs';
import OrgDashboard from './components/OrgDashboard';

import NotFound from './components/NotFound';

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Header />}>
                        <Route index />

                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='update' element={<EditUser />} />
                        <Route path='recover' element={<Form />}>
                            <Route index element={<Recover />} />
                            <Route path=':id' element={<Reset />} />
                        </Route>

                        <Route path='org'>
                            <Route index element={<JoinedOrgs />} />
                            <Route path=':id'>
                                <Route index element={<OrgDashboard />} />
                            </Route>
                        </Route>

                        <Route path='group'>
                            <Route index />
                            <Route path=':id' />
                        </Route>

                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
