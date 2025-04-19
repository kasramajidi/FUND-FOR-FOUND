    "use client";
    import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    } from "react";

    interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (authStatus: boolean) => void;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        setIsAuthenticated(true);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
    };
