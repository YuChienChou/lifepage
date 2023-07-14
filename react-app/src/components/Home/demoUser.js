import React from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


export default function DemoUser() {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userInfo = {
            email : "demo@aa.io",
            password: "password",
        }

        dispatch(login(userInfo));
        history.push('/user')
        
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