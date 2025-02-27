import parse from 'html-react-parser';

function StatusList({ posts, onPostDelete }) {

    const handleDelete = (id) => {
       onPostDelete(id)
    };

    return (
        <div className="flex flex-row justify-center min-h-screen bg-gray-900 overflow-hidden">
            <div className="bg-gray-900 rounded p-6 w-full max-w-5xl overflow-hidden">
                {Array.isArray(posts) && posts.length > 0 ? ( // Check if posts is a valid array and not empty
                    <ul>
                        {posts.map((post) => (
                            post && post.content ? (
                                <li key={post.id} className="bg-gray-800 rounded p-4 mb-2 flex flex-col lg:flex-row">
                                    <div className="flex flex-grow"> {/* Wrap the text content in a flex container */}
                                        <div className="text-gray-100 overflow-hidden break-words max-w-3xl text-left">
                                            {parse(post.content)}
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(post.id)} className="flex-none bg-red-500 hover:bg-red-700 text-white font-bold rounded text-sm h-7 mt-4 lg:mt-0 grow lg:w-40 items-center justify-center">
                                        Delete
                                    </button>
                                </li>
                            ) : null
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-100 mt-4 flex flex-grow justify-center">No Posts Yet</p>
                )}
            </div>
        </div>
    );
}

export default StatusList;

