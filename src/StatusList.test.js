import { render, screen, fireEvent } from '@testing-library/react';
import StatusList from './StatusList';
import parse from 'html-react-parser'; 

describe('StatusList Component', () => {
  const mockPosts = [
    { id: 1, content: '<p>Test post 1</p>' },
    { id: 2, content: '<p>Test post 2</p>' },
  ];
  const mockOnPostDelete = jest.fn();

  it('renders the list of posts correctly', () => {
    render(<StatusList posts={mockPosts} onPostDelete={mockOnPostDelete} />);

    expect(screen.getByText("Test post 1")).toBeInTheDocument();
    expect(screen.getByText('Test post 2')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: "Delete" })).toHaveLength(2); 
  });

  it('renders "No Posts Yet" when the posts array is empty', () => {
    render(<StatusList posts={[]} onPostDelete={mockOnPostDelete} />);
    expect(screen.getByText('No Posts Yet')).toBeInTheDocument();
  });

  it('calls onPostDelete with the correct post ID when the delete button is clicked', () => {
    render(<StatusList posts={mockPosts} onPostDelete={mockOnPostDelete} />);
    const deleteButtons = screen.getAllByRole('button', { name: "Delete" });

    fireEvent.click(deleteButtons[0]); // Click the first delete button

    expect(mockOnPostDelete).toHaveBeenCalledTimes(1);
    expect(mockOnPostDelete).toHaveBeenCalledWith(mockPosts[0].id);
  });

  it('does not render posts with invalid or missing content', () => {
    const invalidPosts = [
      { id: 3, content: null },
      { id: 4 }, // Missing content property
    ];
    render(<StatusList posts={invalidPosts} onPostDelete={mockOnPostDelete} />);

    expect(screen.queryByText('Test post 3')).not.toBeInTheDocument(); // Should not be rendered
    expect(screen.queryByText('Test post 4')).not.toBeInTheDocument(); // Should not be rendered
  });

  it('handles non-array posts prop gracefully', () => {
    render(<StatusList posts={null} onPostDelete={mockOnPostDelete} />); // Pass null as posts
    expect(screen.getByText('No Posts Yet')).toBeInTheDocument(); // Should render "No Posts Yet"
  });
});