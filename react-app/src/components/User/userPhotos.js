import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';
import './userphotos.css'


export default function UserPhotos({user, userPostArr}) {
    // console.log("userPost Store in user photos component: ", userPostsStore);
    const reversedUserPostArr = userPostArr.slice().reverse();
    // console.log("reversed user post array in user photos: ", reversedUserPostArr);


    if(reversedUserPostArr.length === 0) {
        return (
            <>
            {user.first_name} doesn't have any post yet.
            </>
        )
    }

    return (
        <>      
        <ul id='user-photos-ul'>
            {reversedUserPostArr.map((post) => (
                (() => {
                    if(!post.media) {
                        return <>
                        <p>{user.first_name} doesn't have any posts yet.</p>
                        </>
                    }
                    else {
                        return (
                            <>

                            <li key={post.id} id='user-photos-li'>
                                {/* {post.img? 
                                    <Link to={`/posts/${post.id}`}><div id='user-photo-img'>
                                        <img src={post.img} alt=""/>
                                    </div></Link>
                                    : null
                                }  
                                {post.video ? 
                                    <Link to={`/posts/${post.id}`}><div id='user-photos-video'>
                                        <ReactPlayer url={post.video} controls width='100%' height='100%'/>
                                    </div></Link>
                                    : null
                                } */}
                                  {(() => {
                        if(post.media) {
                            if(post.media.endsWith("pdf") ||
                               post.media.endsWith("png") ||
                               post.media.endsWith("jpg") ||
                               post.media.endsWith("jpeg") ||
                               post.media.endsWith("gif")) {
                                return <>
                                <Link to={`/posts/${post.id}`}><div id='img-post'>
                                <img src={post.media} alt=""/></div></Link>
                                </>
                            } else {
                                return <>
                                <div id='video-pot'>
                                    <video controls width="100%">
                                        <source src={post.media} type='video/mp4' />
                                    </video>
                                </div>
                                </>
                            }
                        }

                    })()}
                            </li>
                            </>
                        ) 
                    }
                })()
            ))}
        </ul>
        </>
    )
}