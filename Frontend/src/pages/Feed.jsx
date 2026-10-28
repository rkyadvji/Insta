import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Feed = () => {
    const [posts, setPosts] = useState([{
        _id: 1,
        image: 'https://ik.imagekit.io/rkyadvji/image_6dc0jebJm1.jpg?updatedAt=1792998640301',
        caption: 'Beautiful sunset at the beach'
    }]);

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
        .then((res)=>{
            setPosts(res.data.posts);
        })
    }, []);

  return (
    <section className='feed-section'>
        {
            posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className='post-card'> 
                        <img src={post.image} alt='{post.caption}' />
                        <p>{post.caption}</p>                                 
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )
        }
    </section>  
  )
}

export default Feed
