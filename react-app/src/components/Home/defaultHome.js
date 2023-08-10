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
        // console.log("res in the home component: ", res)

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

        setValidationError({})
    }

    useEffect(() => {
        const errors = {}
        if(!email) errors.email = "Please provide valid email";
        if(!password) errors.password = "Please provide password";

        setValidationError(errors)
    }, [email, password])


    return (
        <>
        <div id='default-home-outer'>
            <div id='default-home-container'>
                <div id='default-home-welcome'>
                    <div id='logo'>
                        <h1>lifepage</h1>
                    </div>
                    <div id='welcome'>
                        <p>Connect with friends and the world around you on Lifepage.</p>
                    </div>
                    
                </div>

                <div id='login-form-div'>
                    <form id='login-form'
                        onSubmit={handleSubmit}
                    >
                    
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='User Email'
                                id='login-email'
                            />
                
                    
                            <input 
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Password'
                                id='login-password'
                            />
                        
                        <button
                            type='submit'
                            id='login-button'
                            disabled={Object.values(validationError).length > 0}
                        >Log in
                        </button>

                        <div id='error-area'>
                            {hasSubmit  && <p>{validationError.email}</p>}
                            {hasSubmit && <p>{validationError.password}</p>}
                        </div>
                    </form>

                    <div id='signup-modal'>
                        <OpenModalButton
                            buttonText="Create new account"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                    <div id='demo-user'>
                        <DemoUser />
                    </div>
                </div>
                
            </div>
            <div id='programmer-info-container'>
                <div id='programmer-info-div'>
                   |<a href='https://www.lesliechou921.com/' target='_blank'> <p>&copy; Leslie Chou. All rights reserved.</p></a>
                    <a href="https://www.linkedin.com/in/lesliechou921/" target='_blank'><i className="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/YuChienChou" target='_blank'><i className="fa-brands fa-github"></i></a>
                    <a href="https://wellfound.com/u/leslie-chou" target='_blank'><i className="fa-brands fa-angellist"></i></a>
                    <a href="mailto:chouyuchien@gmail.com"><i className="fa-solid fa-envelope"></i></a> |
                </div>
            </div>
        </div>
        </>
    )
}