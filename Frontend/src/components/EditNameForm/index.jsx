import { useEffect, useState } from "react";

import { modifyUserName } from "../../store/user";

import { selectBaseURL, selectUserToken, selectUserFirstName, selectUserLastName, selectUserName } from "../../store/selectors";

import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";

/**
 * Render a form used to edit the user firstName and user lastName.
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function EditNameForm() {
	const dispatch = useDispatch();

	const baseURL = useSelector(selectBaseURL());
	const userToken = useSelector(selectUserToken());
	const userFirstName = useSelector(selectUserFirstName());
	const userLastName = useSelector(selectUserLastName());
	const userName = useSelector(selectUserName());

	const [newFirstName, setNewFirstName] = useState(null);
	const [newLastName, setNewLastName] = useState(null);
	const [newUserName, setNewUserName] = useState(null);
	const [showEditNameForm, setShowEditNameForm] = useState(false);
	const [editNameFormError, setEditNameFormError] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		/* It's checking if the new first name and new last name are the same as the user first name and user
		last name. If they are the same, it sets the error message to "There are no change". */
		// if (newFirstName === userFirstName && newLastName === userLastName) {
		// 	setEditNameFormError("FirstName and LastName are the same as the current ones.");
		// } It's checking if the new first name and new last name are empty. If they are empty, it sets the
		// error message to "Inputs can't be empty". */ 
		if (newFirstName.length === 0 || newLastName.length === 0 || newUserName.length === 0) {
			setEditNameFormError("Inputs can't be empty");
		} /* It's checking if the new first name and new last name are not empty. If they are not empty, it
		dispatches the modifyUserName action and it sets the showEditNameForm state to false and the
		editNameFormError state to an empty string. */ else if (newFirstName.length > 0 && newLastName.length > 0 && newUserName.length > 0) {
			dispatch(modifyUserName(baseURL, userToken, newUserName));
			setShowEditNameForm(false);
			setEditNameFormError("");
		}
	};

	/**
	 * If showEditNameForm is true, set showEditNameForm to false, otherwise set showEditNameForm to true.
	 */
	const toggleEditNameForm = () => {
		showEditNameForm ? setShowEditNameForm(false) : setShowEditNameForm(true);
	};

	useEffect(() => {
		/* It's setting the newFirstName state to the userFirstName and the newLastName state to the
		userLastName. */
		setNewFirstName(userFirstName);
		setNewLastName(userLastName);
		setNewUserName(userName);
	}, [userFirstName, userLastName, userName]);

	return (
		<div>
			{!showEditNameForm && (
				<button className="edit-button" onClick={toggleEditNameForm}>
					Edit Name
				</button>
			)}
			{showEditNameForm && (
				<form className="new-name-form" onSubmit={handleSubmit}>
					<div className="input-group">
						{/* <div className="input-wrapper">
							<label className="hidden" htmlFor="firstname">
								Firstname
							</label>
							<input type="text" id="firstname" onChange={(e) => setNewFirstName(e.target.value)} value={newFirstName} />
						</div>
						<div className="input-wrapper">
							<label className="hidden" htmlFor="lastname">
								Lastname
							</label>
							<input type="text" id="lastname" onChange={(e) => setNewLastName(e.target.value)} value={newLastName} />
						</div> */}
						<div className="input-wrapper">
							<label className="hidden" htmlFor="username">
								Username
							</label>
							<input type="text" id="username" onChange={(e) => setNewUserName(e.target.value)} value={newUserName} />
						</div>
					</div>
					<div className="input-group input-center">
						<button type="submit" className="edit-button">
							Save
						</button>
						<button className="edit-button" onClick={toggleEditNameForm}>
							Cancel
						</button>
					</div>
					<div className="input-group input-center">{editNameFormError && <div className="input-new-names input-error">{editNameFormError}</div>}</div>
				</form>
			)}
		</div>
	);
}

export default EditNameForm;
