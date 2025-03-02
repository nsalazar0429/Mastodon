import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Form from './Form';
import Modal from './Modal';
import StatusList from './StatusList';
import Loading from './Loading';
import { fetchStatuses } from './MastodonClient';
import { deleteStatus } from './MastodonClient';

/**
 * App Component used to display and deele posts
 * 
 * Read: Written by Gerardo Valdez Lozano (017558281) & Joel Zapana (014379560)
 * Delete: Written by Viswa Surya Kumar Suvvada (018316532)
 */
function App() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]); // State to store posts
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isPosting, setIsPosting] = useState(false);

  const fetchPosts = useCallback(async () => {
    const fetchedStatuses = await fetchStatuses();
    setIsPosting(false)
    setPosts(fetchedStatuses);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger, fetchPosts]);

  const handleCreateNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCreatePost = (newPostContent) => {
    setShowForm(false);
    setIsPosting(true)
    setRefreshTrigger(refreshTrigger + 1);
  };

  const handlePostDelete = async (postId) => {
    console.log(`ID:${postId}`)
    setIsPosting(true)
    const success = await deleteStatus(postId);
    if (success) {
      setRefreshTrigger(refreshTrigger + 1);
    } else {
      setIsPosting(false)
      console.error('Error deleting post:', postId);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header onCreateNew={handleCreateNew} />
      {isPosting && <Loading/>}
      {showForm && (
        <Modal isOpen={showForm} onClose={handleCloseForm}>
          <Form onClose={handleCloseForm} onSubmit={handleCreatePost} />
        </Modal>
      )}
      {!isPosting && <StatusList posts={posts} onPostDelete={handlePostDelete} />}
    </div>
  );
}

export default App;
