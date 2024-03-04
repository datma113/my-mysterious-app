import React, { useEffect } from "react";
import ReactLogo from "@/assets/react.svg?react";
import { useGetAuth } from "@/features/authentication/hooks/useGetAuth.ts";
import { CountingWorkoutPage } from "@/features/counting-workouts/routes/CountingWorkoutPage.tsx";
import AppLayout from "@/components/side-bar";

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
        <AppLayout>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <ReactLogo />
                </a>
            </div>
            <p> I AM: {user?.fullName || "no name"} </p>

            <CountingWorkoutPage />
        </AppLayout>
    );
}

export default App;
