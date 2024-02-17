import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createRequest } from '../utils/requests';

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadUserData = useCallback(async () => {
        if (!loading) return;

        if (!Cookies.get('token')) {
            setLoading(() => false);
            return;
        }

        try {
            const instance = createRequest();
            const response = await instance.post('/auth/remember');

            setUserData(() => response.data.user);
        } catch (error) {
            Cookies.remove('token');
            navigate('/login');
        } finally {
            setLoading(() => false);
        }
    }, [navigate, loading]);

    useEffect(loadUserData, [loadUserData]);

    return (
        <UserContext.Provider
            value={{
                loading,
                userData,
                setUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
