import { useState } from 'react';
import Header from './Header';
import Form from './Form';
import Modal from './Modal';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState(); // State to store posts

  const handleCreateNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCreatePost = (newPostContent) => {
    setShowForm(false);
  };

  return (
    <div  className="bg-gray-900 text-white min-h-screen">
      <Header onCreateNew={handleCreateNew} />
      {showForm && (
        <Modal isOpen={showForm} onClose={handleCloseForm}>
          <Form onClose={handleCloseForm} onSubmit={handleCreatePost} />
        </Modal>
      )}
    </div>
  );
}

export default App;
