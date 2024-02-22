import {
    BrowserRouter, Routes, Route, Navigate,
} from "react-router-dom";

import {
    Layout,
    MainPage,
    Login,
    Register,
    EditUser,
    Recover,
    Reset,
    OwnedOrgs,
    MemberOrgs,
    OrgDashboard,
    UpdateOrganization,
} from "./containers";
import { ContextProvider } from "./contexts";

function App() {
    return (
        <BrowserRouter>
            <ContextProvider>
                <Routes>
                    <Route path="" element={<Layout />}>
                        <Route index element={<MainPage />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/update" element={<EditUser />} />
                        <Route path="recover">
                            <Route index element={<Recover />} />
                            <Route path=":id" element={<Reset />} />
                        </Route>

                        <Route path="org">
                            <Route index element={<OwnedOrgs />} />
                            <Route path="joined" element={<MemberOrgs />} />
                            <Route path=":orgID">
                                <Route index element={<OrgDashboard />} />
                                <Route
                                    path="update"
                                    element={<UpdateOrganization />}
                                />
                            </Route>
                        </Route>

                        <Route path="*" element={<Navigate to="" />} />
                    </Route>
                </Routes>
            </ContextProvider>
        </BrowserRouter>
    );
}

export default App;
