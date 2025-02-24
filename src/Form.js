import {useState} from 'react';
import Loading from './Loading';
import { postStatus } from './MastodonClient';

function Form({ onClose, onSubmit }) {
    const [isPosting, setIsPosting] = useState(false);
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = event.target.elements['postContent'].value;
        if (newPost.trim() === '') {
            alert('Please enter some content for your post.'); 
            return; 
        }
        
        setIsPosting(true)
        try {
            const success = postStatus(newPost)
            if (success){
                onSubmit(newPost)
            } else {
                alert('Error posting to Mastodon.');
            }
        } finally{
            setIsPosting(false);
        }
    };

    return (
        <form
            className="bg-gray-700  rounded w-96 space-y-4"
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl text-gray-100 font-bold mb-4">Create New Post</h2>
            <div>
                <textarea
                    id="postContent"
                    className="border border-gray-300 rounded w-full py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter post content"
                    rows="4"
                    name="postContent"
                />
            </div>
            {isPosting && <Loading/>}
            {!isPosting && (
                <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Create Post
                </button>
            </div>
            )}
        </form>
    );
}

export default Form;