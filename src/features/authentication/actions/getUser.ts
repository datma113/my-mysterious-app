import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/features/authentication/slice";

export const getAuth = createAsyncThunk("auth/getAuth", async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                fullName: "Đạt Ma",
                age: 24,
            });
        }, 1000);
    });
    return response as User;
});
