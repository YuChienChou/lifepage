//type string
const GET_ALL_POSTS = "post/GET_ALL_POSTS";
const CREATE_POST = "post/CREATE_POST";
const EDIT_POST = "post/EDIT_POST";
const DELETE_POST = "post/DELETE_POST";
const GET_SINGLE_POST = 'post/GET_SINGLE_POST';
const GET_USER_POSTS = "post/GET_USER_POSTS";


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
        const errrors = await err.json();
        return errrors;
    }
};


export const createPostThunk = (userId, post) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/${userId}/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postInfo),
        });
        // console.log("after the res fetch of the editpostthunk")
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


//reducer function

const initialState = {
    allPosts: {},
    singlePost: {},
    userPosts: {},
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
            const newState = {...state, allPosts: {...state.allPosts}};
            newState.allPosts[action.post.id] = action.post;
            return newState;
        };
        case EDIT_POST: {
            const newState = {...state, allPosts: {...state.allPosts}};
            newState.allPosts[action.post.id] = action.post;
            return newState;
        };
        case DELETE_POST: {
            const newState = {...state, allPosts: {...state.allPosts}};
            delete newState.allPosts[action.postId];
            return newState;
        };
        case GET_SINGLE_POST: {
            const newState = {...state, allPosts: {}, singlePost: {}, userPosts: {}}
            newState.singlePost = action.post;
            return newState;
         };
         case GET_USER_POSTS: {
            const newState = {...state, userPosts: {}}
            action.posts.forEach((post) => {
                newState.userPosts[post.id] = post;
            });
            return newState;
         }
        default: 
            return state;
    };
};


export default postReducer;