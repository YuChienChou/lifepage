//type string

const GET_ALL_COMMENTS = 'comment/GET_ALL_COMMENTS';
const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const EDIT_COMMENT = 'comment/EDIT_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

//action creator
const getAllComments = (comments) => {
    return {
        type: GET_ALL_COMMENTS,
        comments,
    };
};

const createComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    };
};

const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment,
    };
};

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    };
};

//thunk creator

// export const getAllCommentsThunk = (postId) => async (dispatch) => {
//     try {
//         const res = await fetch(`/api/posts/${postId}/comments/all`)

//         if(res.ok) {
//             const allComments = await res.json();
//             dispatch(getAllComments(allComments));
//             return allComments;
//         }
//     } catch(err) {
//         const errors = await err.json();
//         return errors;
//     };
// };

export const getAllCommentsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/comments/all')

        if(res.ok) {
            const allComments = await res.json();
            dispatch(getAllComments(allComments));
            return allComments;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};
 
export const createCommentThunk = (postId, commentInfo) => async (dispatch) => {
    // console.log("in the create comment thunk!!!!!!!")
    try {
        const res = await fetch(`/api/posts/${postId}/comments/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentInfo),
        });

        if(res.ok) {
            // console.log("the result in the create comment thunk: ", res)
            const newComment = await res.json();
            dispatch(createComment(newComment));
            return newComment;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const editCommentThunk = (commentId, commentInfo) => async (dispatch) => {
    // console.log("in the edit comment thunk!!!!!");
    try {
        const res = await fetch(`/api/comments/${commentId}/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentInfo)
        });

        if(res.ok) {
            // console.log("result in the edit comment thunk: ", res);
            const editedComment = await res.json();
            dispatch(editComment(editedComment));
            return editedComment;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


export const deleteCommentThunk = (commentId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${commentId}/delete`, {
            method: "DELETE"
        });

        if(res.ok) {
            await dispatch(deleteComment(commentId));
            return;
        }
    } catch(err) {
        const errors = await err.json();
        return errors;
    };
};


//reducer function 

const initialState = {allComments: {}}

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COMMENTS: {
            const newState = {...state, allComments: {}};
            action.comments.forEach((comment) => {
                newState.allComments[comment.id] = comment;
            });
            return newState;
        };
        case CREATE_COMMENT: {
            const newState = {...state, allComments: {...state.allComments}};
            newState.allComments[action.comment.id] = action.comment;
            return newState;
        };
        case EDIT_COMMENT: {
            const newState = {...state, allComments: {...state.allComments}};
            newState.allComments[action.comment.id] = action.comment;
            return newState;
        };
        case DELETE_COMMENT: {
            const newState = {...state, allComments: {...state.allComments}};
            delete newState.allComments[action.commentId];
            return newState;
        };
        default:
            return state;

    }
}


export default commentReducer;