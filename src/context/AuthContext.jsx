import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token,setToken] = useState(null);
    const [user,setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if(savedToken && savedUser){
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    },[]);

    const login = (token,user) => {
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(user));
        
        setToken(token);
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("logout.......");

        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        navigate('/login');
    };

    return(
        <AuthContext.Provider
        value={{token, user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);