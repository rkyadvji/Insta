import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        axios.post('http://localhost:3000/create-post', formData)
        .then((res) => {
            navigate('/feed');
        })
        .catch((err) => {
            console.error(err);
            alert('Error creating post. Please try again.');
        });

    }



  return (
    <section className='create-post-section'>
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
            <input type="file" name='image' accept='image/*' />
            <input type="text" name='caption' placeholder='Enter caption...' />
            <button type='submit'>Create Post</button>
        </form>
    </section>
  )
}

export default CreatePost
