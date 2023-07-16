import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../store/session";
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import DemoUser from './demoUser';
import './Home.css';


export default function DefaultHome() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState({});
    const [hasSubmit, setHasSubmit] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmit(true);

        const userInfo = {
            email,
            password,
        }

        const res = await dispatch(login(userInfo));
        console.log("res in the home component: ", res)

        if(res && res.length > 0) {
            const errors = {}
            res.forEach((error) => {
                const [field, message] = error.split(" : ");
                errors[field] = message;
            })
            // console.log("errors obj: ", errors)
            setValidationError(errors)
            // console.log("errors in the home component: ", validationError);
            return null;
        } 
        else {
            history.push(`/user`);
        }
    }

    useEffect(() => {
        const errors = {}
        if(!email || !email.includes("@")) errors.email = "Please provide valid email";
        if(!password) errors.password = "Please provide password";

        setValidationError(errors)
    }, [email, password])


    return (
        <>
        <div id='default-home-outer'>
            <div id='default-home-container'>
                <div>
                    <h1>lifepage</h1>
                    <h3>Connect with friends and the world around you on Lifepage.</h3>
                </div>

                <div>
                    <form id='login-form'
                    onSubmit={handleSubmit}
                    >
                        <label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='User Email'
                                id='login-email'
                            />
                        </label>
                        <label>
                            <input 
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Password'
                                id='login-password'
                            />
                        </label>
                        <button
                            type='submit'
                            id='login-button'
                            // disabled={Object.values(validationError).length > 0}
                        >Log in
                        </button>
                    </form>
                    <div id='error-area'>
                        {hasSubmit  && <p>{validationError.email}</p>}
                        {hasSubmit && <p>{validationError.password}</p>}
                    </div>
                    <div id='signup-modal'>
                        <OpenModalButton
                            buttonText="Create new account"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                    <div>
                        <DemoUser />
                    </div>
                </div>
                
            </div>
            <div>Progammer info</div>
        </div>
        </>
    )
}