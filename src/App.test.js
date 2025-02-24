import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import { fetchStatuses, deleteStatus, postStatus  } from './MastodonClient';

jest.mock('./MastodonClient');

describe('App Component', () => {
  const mockPosts = [
    { id: 1, content: '<p>Test post 1</p>' },
    { id: 2, content: '<p>Test post 2</p>' },
  ];

  beforeEach(() => {
    fetchStatuses.mockResolvedValue(mockPosts); // Mock fetchStatuses to return mock posts
    postStatus.mockReturnValue(true);
    deleteStatus.mockResolvedValue(true); 
  });

  it('renders the header and status list', async () => {
    await act(async () => {  // Wrap render in act()
      render(<App />);
    });
    expect(screen.getByRole('heading', { name: 'Howework 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create New Post' })).toBeInTheDocument();
    // Wait for the posts to be fetched and rendered
    await screen.findByText('Test post 1');
    await screen.findByText('Test post 2');
  });

  it('shows the form when "Create New Post" button is clicked', async () => {
    await act(async () => {  // Wrap render in act()
      render(<App />);
    });
    const createButton = screen.getByRole('button', { name: 'Create New Post' });
    fireEvent.click(createButton);
    expect(screen.getByRole('heading', { name: "Create New Post" })).toBeInTheDocument();
  });

  it('updates posts state and hides the form when a new post is submitted', async () => {
    await act(async () => {  // Wrap render in act()
      render(<App />);
    });
    const createButton = screen.getByRole('button', { name: "Create New Post" });
    fireEvent.click(createButton);

    const textarea = screen.getByRole('textbox', { name: '' });
    const submitButton = screen.getByRole('button', { name: /create post/i });
    fireEvent.change(textarea, { target: { value: 'New post content' } });
    await act(async () => {  // Wrap render in act()
      fireEvent.click(submitButton);
    });
    // Check if the form is closed
    expect(screen.queryByRole('heading', { name: /create new post/i })).not.toBeInTheDocument();
  });
});