
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([{
        _id: 1,
        image: 'https://ik.imagekit.io/rkyadvji/image_6dc0jebJm1.jpg?updatedAt=1792998640301',
        caption: 'Beautiful sunset at the beach'
    }]);

    useEffect(() => {
        axios.get('https://insta-backend-ujel.onrender.com/posts')
            .then((res) => {
                setPosts(res.data.posts);
            })
            .catch((err) => {
                console.error('Error fetching posts:', err);
            });
    }, []);

    return (
        <section className="feed-section">
            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="post-card">
                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )
            }

            <button
                className="add-post-btn"
                onClick={() => navigate('/create-post')}
                aria-label="Create new post"
            >
                +
            </button>
        </section>
    )
}

export default Feed
