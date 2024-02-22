import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store.ts";
import { setUser, User } from "@/features/authentication/slice";

export const useGetAuth = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: RootState) => state.auth);
    const dispatchSetUser = (action: User) => dispatch(setUser(action));
    return { user, token, dispatchSetUser };
};
