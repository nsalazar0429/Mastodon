import { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Form from './Form';
import Modal from './Modal';
import StatusList from './StatusList';
import { fetchStatuses } from './MastodonClient';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState(); // State to store posts
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const fetchPosts = useCallback(async () => {
    const fetchedStatuses = await fetchStatuses();
    setPosts(fetchedStatuses);
  }, []);

  useEffect(() => {
    fetchPosts();
  },[refreshTrigger, fetchPosts]);

  const handleCreateNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCreatePost = (newPostContent) => {
    setPosts([newPostContent,...posts]); 
    setShowForm(false);
    setRefreshTrigger(refreshTrigger + 1);
  };

  return (
    <div  className="bg-gray-900 text-white min-h-screen">
      <Header onCreateNew={handleCreateNew} />
      {showForm && (
        <Modal isOpen={showForm} onClose={handleCloseForm}>
          <Form onClose={handleCloseForm} onSubmit={handleCreatePost} />
        </Modal>
      )}
      <StatusList posts={posts}/>
    </div>
  );
}

export default App;
