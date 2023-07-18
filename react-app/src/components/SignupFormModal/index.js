import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/";

const BIRTHDAYMONTH = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const BIRTHDAYDATE = [];
for (let i = 1; i < 32; i++) {
	BIRTHDAYDATE.push(i)
}


function SignupFormModal() {
	const dispatch = useDispatch();
	const [addFirstName, setAddFirstName] = useState("")
	const [addLastName, setAddLastName] = useState("")
	const [addEmail, setAddEmail] = useState("");
	const [addPassword, setAddPassword] = useState("");
	const [addBirthdayDate, setAddBirthdayDate] = useState(BIRTHDAYDATE[0]);
	const [addBirthdayMonth, setAddBirthdayMonth] = useState(BIRTHDAYMONTH[0]);
	const [validationError,  setValidationError] = useState({});
	const [hasSubmit, setHasSubmit] = useState(false)
	const { closeModal } = useModal();
	const history = useHistory();

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmit(true);

		const signupInfo = {
			first_name: addFirstName,
			last_name: addLastName,
			email: addEmail,
			password: addPassword,
			// addBirthdayDate,
			// addBirthdayMonth,
		}

		const res = await dispatch(signUp(signupInfo));

		if(res && res.length > 0) {
			const errors = {}
            res.forEach((error) => {
                const [field, message] = error.split(" : ");
                errors[field] = message;
            })

			setValidationError(errors);
			return;
		} else {
			// console.log("Succefully sign up!!!!")
			closeModal()
			history.push('/user')
		}
	};

	useEffect(() => {
		const errors = {};
		if(!addFirstName) errors.addFirstName = "Please enter your first name.";
		if(!addLastName) errors.addLastName = "Please enter your Last name.";
		if(!addEmail || !addEmail.includes("@")) errors.addEmail = "Please provide valide email.";
		if(!addPassword) errors.addPassword = "Please provide a password";
		if(addPassword.length < 6 || addPassword.length > 20) errors.addPasswordlength = "Please provide a password between 6 to 20 characters."

		setValidationError(errors);
	}, [addFirstName, addLastName, addEmail, addPassword])


	return (
		<>
		<div id='sign-up-modal'>
			<div id='sign-up-title'>
				<h1>Sign Up</h1>
				<p>It's quick and easy.</p>
			</div>
			

			<form id='sign-up-form' onSubmit={handleSubmit}>
				<div id='sign-up-name-div'>

						<input id='first-name'
							type='text'
							value={addFirstName}
							onChange={(e) => setAddFirstName(e.target.value)}
							required
							placeholder="First name"
						/>
					
						<input 
							type='text'
							value={addLastName}
							onChange={(e) => setAddLastName(e.target.value)}
							required
							placeholder="Last name"
						/>
			
				</div>
				
						<input
							type="email"
							value={addEmail}
							onChange={(e) => setAddEmail(e.target.value)}
							required
							placeholder="Email"
						/>
					
				
					
						<input
							type="password"
							value={addPassword}
							onChange={(e) => setAddPassword(e.target.value)}
							required
							placeholder="New password"
						/>
				
			
				{/* <label>
					Birthday (optional)
					<select value={addBirthdayMonth} onChange={(e) => setAddBirthdayMonth(e.target.value)} required>
						{BIRTHDAYMONTH.map(month => (
							<option 
								key={month}
							>
								{month}
							</option>
						))}
					</select>
				</label>
				<label>
					<select value={addBirthdayDate} onChange={(e) => setAddBirthdayDate(e.target.value)} required>
							{BIRTHDAYDATE.map(date => (
								<option 
									key={date}
								>
									{date}
								</option>
							))}
					</select>
				</label> */}
				<div id='error-div'>
					{hasSubmit && validationError.email && <p>{validationError.email}</p>}	
					{hasSubmit && validationError.password && <p>password: {validationError.password}</p>}
				</div>

				<button 
					type="submit"
					id='sign-up-button'
					// disabled={Object.values(validationError).length > 0}
				>Sign Up</button>
			</form>
		</div>
		</>
	);
}

export default SignupFormModal;