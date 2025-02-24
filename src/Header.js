import React from 'react';

function Header({ onCreateNew }) {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center c">
      <h1 className="text-xl font-bold">Howework 2</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onCreateNew}
      >
        Create New Post
      </button>
    </header>
  );
}

export default Header;