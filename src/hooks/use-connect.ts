import { AppDispatch } from "@/app/store";
import { getUserInfo } from "@/features/user.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useConnect() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
}
