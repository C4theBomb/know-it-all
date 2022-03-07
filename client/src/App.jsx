import React, { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const 

    return (
    <BrowserRouter>
        <Routes>
            <Route >

            </Route>
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
