import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

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

	

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmit(true)

		const signupInfo = {
			firstName : addFirstName,
			lastName : addLastName,
			email : addEmail,
			birthdayDate : addBirthdayDate,
			birthedayMonth : addBirthdayMonth,
		}


	
	};

	return (
		<>
			<h1>Sign Up</h1>
			<p>It's quick and easy.</p>

			<form>
				<label>
					<input 
						type='text'
						value={addFirstName}
						onChange={(e) => setAddFirstName(e.target.value)}
						required
						placeholder="First name"
					/>
				</label>
				<label>
					<input 
						type='text'
						value={addLastName}
						onChange={(e) => setAddLastName(e.target.value)}
						required
						placeholder="Last name"
					/>
				</label>
				<label>
					<input
						type="text"
						value={addEmail}
						onChange={(e) => setAddEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</label>
				<label>
					<input
						type="password"
						value={addPassword}
						onChange={(e) => setAddPassword(e.target.value)}
						required
						placeholder="New password"
					/>
				</label>
				<label>
					Birthday
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
				</label>

				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;