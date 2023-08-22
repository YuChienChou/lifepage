//type string
const GET_ALL_POSTS = "post/GET_ALL_POSTS";
const CREATE_POST = "post/CREATE_POST";
const EDIT_POST = "post/EDIT_POST";
const DELETE_POST = "post/DELETE_POST";
const GET_SINGLE_POST = 'post/GET_SINGLE_POST';
const GET_USER_POSTS = "post/GET_USER_POSTS";
const ADD_USER_LIKE_POST = "post/ADD_USER_LIKE_POST";
const GET_USER_LIKE_POSTS = "post/GET_USER_LIKE_POSTS";
const DELETE_USER_LIKE_POST = "post/DELETE_USER_LIKE_POST";
const EDIT_SINGLE_POST = "post/EDIT_SINGLE_POST";
const GET_ALL_LIKEDPOST_USERS = 'post/GET_ALL_LIKEDPOST_USERS';


//action creator
const getAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts,
    };
};

const createPost = (post) => {
    return {
        type: CREATE_POST,
        post,
    };
};

const editPost = (post) => {
    return {
        type: EDIT_POST,
        post,
    };
};

const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId,
    };
};

const getSinglePost = (post) => {
    return {
        type: GET_SINGLE_POST,
        post
    };
};

const getUserPosts = (posts) => {
    return {
        type: GET_USER_POSTS,
        posts,
    };
};

const addUserLikePost = (post) => {
    return {
        type: ADD_USER_LIKE_POST,
        post
    };
};

const getUserLikePosts = (posts) => {
    return {
        type: GET_USER_LIKE_POSTS,
        posts
    };
};

const deleteUserLikePost = (postId) => {
    return {
        type: DELETE_USER_LIKE_POST,
        postId
    }
}

const editSinglePost = (post) => {
    return {
        type: EDIT_SINGLE_POST,
        post,
    }
}

const getAllLikedPostUsers = (posts) => {
    return {
        type: GET_ALL_LIKEDPOST_USERS,
        posts
    }
}

//thunk creator

export const getAllPostsThunk = () => async (dispatch) => {
    // console.log("in the get all posts thunk~~~~~")
    try {
        const res = await fetch("/api/posts/");

        if(res.ok) {
            
            const posts = await res.json();
            // console.log("result in the get all posts route::", res)
            dispatch(getAllPosts(posts));
            return posts;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
};


export const createPostThunk = (userId, post) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/${userId}/new`, {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(post),
            body: post,
        });

        if(res.ok) {
            const newPost = await res.json();
            dispatch(createPost(newPost));
            return newPost;
        };
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}


export const editPostThunk = (postId, postInfo) => async (dispatch) => {
    // console.log("in the edit post thunk~~~~~~~~~~~~~~~~~~~~~")
    try {
        // console.log("in the try block of the editpostthunk")
        const res = await fetch(`/api/posts/${postId}/edit`, {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(postInfo),
            body: postInfo
        });
        // console.log("after the res fetch of the editpostthunk", res)
        if(res.ok) {
            // console.log("result from the backend in the edit post thunk: ", res)
            const updatedPost = await res.json();
            dispatch(editPost(updatedPost));
            return updatedPost;
        };
    } catch (err) {
        const errors = await err.json();
        return errors;
    };
};

export const deletePostThunk = (postId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/${postId}/delete`, {
            method: "DELETE",
        });

        if(res.ok) {
            await dispatch(deletePost(postId));
            return;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}


export const getSinglePostThunk = (postId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/${postId}`)

        if(res.ok) {
            const singlePost = await res.json();
            dispatch(getSinglePost(singlePost));
            return singlePost;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const getUserPostsThunk = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/${userId}/all`)

        if(res.ok) {
            const userPosts = await res.json();
            dispatch(getUserPosts(userPosts));
            return userPosts;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};

export const addUserLikePostThunk = (post) => async (dispatch) => {
    // console.log("in the addUserLikePostThunk!~~~~~~")
    try {
        const res = await fetch(`/api/posts/user_likes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        });

        if(res.ok) {
            const likedPost = await res.json();
            dispatch(addUserLikePost(likedPost));
            return likedPost;
        } 
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const getUserLikePostsThunk = (userId) => async (dispatch) => {
    // console.log("in the get user like post thunk~~~~~~~~~~~~~~~~~~")
    try {
        const res = await fetch(`/api/posts/${userId}/likes`)
        // console.log("in the try block of getUserLikePOstsThunk~~~~~")
        if(res.ok) {
            // console.log("res in the getUserLIkePOstsThunk~~~", res)
            const likedPosts = await res.json();
            dispatch(getUserLikePosts(likedPosts));
            return likedPosts;
        };
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const deleteUserLikePostThunk = (postId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/${postId}/likes/delete`, {
            method: "DELETE",
        })

        if(res.ok) {
            dispatch(deleteUserLikePost(postId));
            return;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const editSinglePostThunk = (singlePostId, postInfo) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/singlePost/${singlePostId}/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postInfo)
        })

        if(res.ok) {
            const editedSinglePost = await res.json();
            dispatch(editSinglePost(editedSinglePost));
            return editSinglePost;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const getAllLikedPostUsersThunk = (postId) => async (dispatch) => {
    // console.log("in getAllLikedPostUsersThunk~~~~~~~~~~~~~~")
    try{
        const res = await fetch(`/api/posts/${postId}/likes/all`)

        if(res.ok) {
            const allLikedPosts = await res.json();
            dispatch(getAllLikedPostUsers(allLikedPosts));
            return allLikedPosts;
        }
    } catch(err) {
        const errors = await err.json();
        return errors
    };
};


//reducer function

const initialState = {
    allPosts: {},
    singlePost: {},
    userPosts: {},
    userLikes: {},
    likedUsers: {},
}

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_POSTS: {
            const newState = {...state, allPosts: {}};
            action.posts.forEach((post) => {
                newState.allPosts[post.id] = post;
            });
            return newState;
        };
        case CREATE_POST: {
            const newState = {...state, allPosts: {}};
            newState.allPosts[action.post.id] = action.post;
            return newState;
        };
        case EDIT_POST: {
            const newState = {...state, allPosts: {...state.allPosts}, userPosts: {...state.userPosts}};
            newState.userPosts[action.post.id] = action.post;
            newState.allPosts[action.post.id] = action.post;
            return newState;
        };
        case DELETE_POST: {
            const newState = {...state, allPosts: {...state.allPosts}};
            delete newState.allPosts[action.postId];
            return newState;
        };
        case GET_SINGLE_POST: {
            const newState = {...state, singlePost: {}}
            newState.singlePost = action.post;
            return newState;
         };
         case GET_USER_POSTS: {
            const newState = {...state, userPosts: {}}
            action.posts.forEach((post) => {
                newState.userPosts[post.id] = post;
            });
            return newState;
         };
         case ADD_USER_LIKE_POST: {
            const newState = {...state, userLikes: {...state.userLikes}};
            newState.userLikes[action.post.id] = action.post;
            return newState;
         };
         case GET_USER_LIKE_POSTS: {
            const newState = {...state, userLikes: {}};
            action.posts.forEach((post) => {
                newState.userLikes[post.id] = post;
            });
            return newState;
         };
         case DELETE_USER_LIKE_POST: {
            const newState = {...state, userLikes: {...state.userLikes}};
            delete newState.userLikes[action.postId];
            return newState;
         };
         case EDIT_SINGLE_POST: {
            const newState = {...state, singlePost: {...state.singlePost}};
            newState.singlePost = action.post;
            return newState;
         };
         case GET_ALL_LIKEDPOST_USERS: {
            const newState = {...state, likedUsers: {}};
            action.posts.forEach((post) => {
                newState.likedUsers[post.id] = post;
            });
            return newState;
         }
        default: 
            return state;
    };
};


export default postReducer;