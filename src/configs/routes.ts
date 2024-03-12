import { CountingWorkoutPage } from "@/features/counting-workouts/routes/CountingWorkoutPage.tsx";
import { ReactElement } from "react";

export type RoutesType = {
    path: string;
    allowRoles: string[];
    allowUserIds: string[];
    element: () => ReactElement;
};
export const routes: RoutesType[] = [
    {
        path: "/",
        allowRoles: [],
        allowUserIds: [],
        element: CountingWorkoutPage,
    },
];
