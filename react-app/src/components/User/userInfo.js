import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './userInfo.css';
import { useEffect } from 'react';
import { getSinglePostThunk } from '../../store/post';

export default function UserInfo() {
    const {userId} = useParams();
    const user = useSelector((state) => state.users.singleUser);
    console.log('user in user Info: ', user);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSinglePostThunk(userId))
    }, [dispatch, userId]);

    if (!user.id) return null;

    return (
    <>
    <div id='user-info-container'>
        <h3>Intro</h3>
        <h5>Phone:</h5>
        <p>{user.phone}</p>
        <h5>Bio:</h5>
        <p>{user.bio}</p>
        <h5>Hobbies:</h5>
        <p>{user.hobbies}</p>
        {(() => {
            const joinStr = user.created_at;
            console.log("join string : ", joinStr)
            const joinArr = joinStr?.split(" ");
            console.log("join arr: ", joinArr)
            return (
                <>
                <h5>Joined:</h5>
                <p>{joinArr[2]} {joinArr[3]}</p>
                </>
            )
        })()}
    </div>
    </>
    )
}