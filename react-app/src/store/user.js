//type string
const GET_ALL_USERS = "user/GET_ALL_USERS";
const GET_SINGLE_USER = "user/GET_SINGLE_USER";
const EDIT_USER = 'user/EDIT_USER';


//action creator

const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users,
    };
};

const getSingleUser = (user) => {
    return {
        type: GET_SINGLE_USER,
        user,
    };
};

const editUser = (user) => {
    return {
        type: EDIT_USER,
        user
    }
}


//thunk creator

export const getAllUsersThunk = () => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/`);

        if(res.ok) {
            const allUsers = await res.json();
            dispatch(getAllUsers(allUsers));
            return allUsers;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const getSingleUserThunk = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/${userId}`);

        if(res.ok) {
            const singleUser = await res.json();
            dispatch(getSingleUser(singleUser));
            return singleUser;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const editUserThunk = (userId, userInfo) => async (dispatch) => {
    console.log("in the edit user thunk!!!!!!!!!!!!!!!!!!!!!")
    try {
        const res = await fetch(`/api/users/${userId}/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
        });

        if(res.ok) {
            const updatedUser = await res.json();
            dispatch(editUser(updatedUser));
            return updatedUser;
        }
    } catch (err) {
        const errors = await err.json()
        return errors;
    };
};



//reducer function

const initialState = { allUsers: {}, singleUser: {}}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_USERS: {
            const newState = {...state, allUsers: {}}
            action.users.forEach((user) => {
                newState.allUsers[user.id] = user;
            });
            return newState;
        };
        case GET_SINGLE_USER: {
            const newState = {...state, singleUser: {}}
            newState.singleUser = action.user;
            return newState;
        };
        case EDIT_USER: {
            const newState = {...state, singleUser: {...state.allUsers}}
            newState.singleUser[action.user.id] = action.user;
            return newState
        };
        default:
            return state;
    };
}


export default userReducer;
