import React from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";


export default function DemoUser() {

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userInfo = {
            email : "demo@aa.io",
            password: "password",
        }

        return dispatch(login(userInfo));
        
    }

    return (
        <>
        <button
        onClick={handleSubmit}
        id='demo-user-div'
        >
            Demo User
        </button>
        </>
    )

}