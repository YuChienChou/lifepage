//type string
const GET_ALL_POSTS = "post/GET_ALL_POSTS";

//action creator
const getAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts,
    };
};


//thunk creator

export const getAllPostsThunk = () => async (dispatch) => {
    console.log("in the get all posts thunk~~~~~")
    try {
        const res = await fetch("/api/posts/");

        if(res.ok) {
            
            const posts = await res.json();
            console.log("result in the get all posts route::", res)
            dispatch(getAllPosts(posts));
            return posts;
        }
    } catch(err) {
        const errrors = await err.json();
        return errrors;
    }
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
        default: 
            return state;
    };
};


export default postReducer;