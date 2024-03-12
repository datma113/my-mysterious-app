import React, { useEffect } from "react";
import { useGetAuth } from "@/features/authentication/hooks/useGetAuth.ts";
import AppLayout from "@/components/side-bar";
import { Route, Routes } from "react-router-dom";
import { routes } from "@/configs/routes.ts";

function App() {
    const { user, dispatchSetUser } = useGetAuth();

    const endpoint = import.meta.env.VITE_MY_MISTERIOUS_ENDPOINT;

    useEffect(() => {
        dispatchSetUser({
            fullName: "Đạt Ma",
            age: 24,
        });
    }, []);
    return (
        <Routes>
            {routes.map((route) => {
                return (
                    <Route
                        key={route.toString()}
                        path={route.path}
                        element={
                            <AppLayout>
                                <route.element />
                            </AppLayout>
                        }
                    ></Route>
                );
            })}
        </Routes>
    );
}

export default App;
