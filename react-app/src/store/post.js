//type string
const GET_ALL_POSTS = "post/GET_ALL_POSTS";
const CREATE_POST = "post/CREATE_POST";

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
        default: 
            return state;
    };
};


export default postReducer;