//type string
const GET_ALL_USERS = "user/GET_ALL_USERS";
const GET_SINGLE_USER = "user/GET_SINGLE_USER";
const EDIT_USER = 'user/EDIT_USER';
const ADD_USER_FOLLOWS = "user/ADD_USER_FOLLOWS";
const GET_USER_FOLLOWS = "user/GET_USER_FOLLOWS";
const GET_USER_FOLLOWERS = "user/GET_USER_FOLLOWERS";
const DELET_USER_FOLLOWS = "user/DELETE_USER_FOLLOWS";


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

const addUserFollows = (user) => {
    return {
        type: ADD_USER_FOLLOWS,
        user
    };
};

const getUserFollows = (users) => {
    return {
        type: GET_USER_FOLLOWS,
        users,
    };
};

const getUserFollowers = (users) => {
    return {
        type: GET_USER_FOLLOWERS,
        users
    };
};

const deleteUserFollows = (userId) => {
    return {
        type: DELET_USER_FOLLOWS,
        userId
    };
};

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
    // console.log("in the edit user thunk!!!!!!!!!!!!!!!!!!!!!")
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


export const addUserFollowsThunk = (user1Id, user2Id, followInfo) => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/${user1Id}/follow/${user2Id}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(followInfo),
        })

        if(res.ok) {
            const userFollows = (await res).json();
            dispatch(addUserFollows(userFollows));
            return userFollows;
        }
    } catch(err) {
        const errors = await err.json;
        return errors;
    };
};


export const getUserFollowsThunk = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/${userId}/following/all`);

        if(res.ok) {
            const userFollowing = await res.json();
            dispatch(getUserFollows(userFollowing));
            return userFollowing;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const getUserFollowersThunk = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/${userId}/follower/all`);

        if(res.ok) {
            const userFollowers = await res.json();
            dispatch(getUserFollowers(userFollowers));
            return userFollowers;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const deleteUserFollowsThunk = (user1Id, user2Id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/users/${user1Id}/follow/${user2Id}/delete`, {
            method: "DELETE",
        })

        if(res.ok) {
            dispatch(deleteUserFollows(user2Id));
            return;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};



//reducer function

const initialState = { 
    allUsers: {}, 
    singleUser: {}, 
    userFollows: {},
    userFollowers: {},
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_USERS: {
            const newState = {...state, allUsers: {}};
            action.users.forEach((user) => {
                newState.allUsers[user.id] = user;
            });
            return newState;
        };
        case GET_SINGLE_USER: {
            const newState = {...state, singleUser: {}};
            newState.singleUser = action.user;
            return newState;
        };
        case EDIT_USER: {
            const newState = {...state, singleUser: {...state.allUsers}};
            newState.singleUser[action.user.id] = action.user;
            return newState
        };
        case ADD_USER_FOLLOWS: {
            const newState = {...state, userFollows: {...state.userFollows}};
            newState.userFollows[action.user.id] = action.user;
            return newState;
        };
        case GET_USER_FOLLOWS: {
            const newState = {...state, userFollows: {}};
            action.users.forEach((user) => {
                newState.userFollows[user.id] = user;
            });
            return newState;
        };
        case GET_USER_FOLLOWERS: {
            const newState = {...state, userFollowers: {}};
            action.users.forEach((user) => {
                newState.userFollowers[user.id] = user;
            });
            return newState;
        };
        case DELET_USER_FOLLOWS: {
            const newState = {...state, userFollows: {...state.userFollows}};
            delete newState.userFollows[action.userId];
            return newState;
        }
        default:
            return state;
    };
}


export default userReducer;
