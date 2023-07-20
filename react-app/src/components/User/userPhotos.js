import ReactPlayer from 'react-player/youtube';
import './userphotos.css'


export default function UserPhotos({user, userPostArr, userPostsStore}) {
    console.log("userPost Store in user photos component: ", userPostsStore);
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
                    if(!post.img && !post.video) {
                        return null;
                    }
                    else {
                        return (
                            <>

                            <li key={post.id} id='user-photos-li'>
                                {post.img? 
                                    <div id='user-photo-img'><img src={post.img} alt=""/></div>
                                    : null
                                }  
                                {post.video ? 
                                    <div id='user-photos-video'>
                                        <ReactPlayer url={post.video} controls width='100%' height='100%'/>
                                    </div>
                                    : null
                                }
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