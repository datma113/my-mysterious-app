import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth } from "@/features/authentication/actions/getUser.ts";

export type User = {
    fullName: string;
    age: number;
};

export interface AuthState {
    user: User;
    token: string;
}

const initialState: Partial<AuthState> = {
    user: undefined,
    token: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAuth.fulfilled, (state, action) => {
            // Add user to the state array
            state.user = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
