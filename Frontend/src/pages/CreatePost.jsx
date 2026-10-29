
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        message: '',
        type: ''
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        if (!formData.get('image')?.size) {
            setNotification({
                message: 'Please select an image.',
                type: 'error'
            });
            return;
        }

        try {
            setLoading(true);
            setNotification({ message: '', type: '' });

            await axios.post(
                'https://insta-backend-ujel.onrender.com/create-post',
                formData
            );

            setNotification({
                message: 'Post created successfully!',
                type: 'success'
            });

            setTimeout(() => {
                navigate('/feed');
            }, 1200);

        } catch (err) {
            console.error(err);

            setNotification({
                message: 'Failed to create post. Please try again.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="create-post-section">

            <button
                type="button"
                className="feed-back-btn"
                onClick={() => navigate('/feed')}
                aria-label="Back to feed"
                title="Back to Feed"
            >
                ←
            </button>

            <h1>Create Post</h1>

            {notification.message && (
                <div
                    className={`post-notification ${notification.type}`}
                    role="status"
                >
                    {notification.type === 'success' ? '✓ ' : '⚠ '}
                    {notification.message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    disabled={loading}
                />

                <input
                    type="text"
                    name="caption"
                    placeholder="Enter caption..."
                    required
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </section>
    )
}

export default CreatePost
