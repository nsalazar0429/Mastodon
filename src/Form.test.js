import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import {postStatus} from './MastodonClient';
import { act } from 'react'; 

jest.mock('./MastodonClient');

describe('Form Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    postStatus.mockReturnValue(true);
    render(<Form onSubmit={mockOnSubmit} onClose={mockOnClose} />);
  });

  it('renders the form elements', () => {
    expect(screen.getByRole('heading', { name: "Create New Post" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Create Post" })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: "" })).toBeInTheDocument();
  });

  it('calls onSubmit with the correct post content when the form is submitted', async () => {
    const textarea = screen.getByRole('textbox', {name: ""});
    const submitButton = screen.getByRole('button', {name: "Create Post"});

    await act(async () => { // Wrap the state update in act()
      fireEvent.change(textarea, { target: { value: 'Test post content' } });
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith('Test post content');
  });

  it('shows an alert and does not submit if the textarea is empty', () => {
    const submitButton = screen.getByRole('button', { name: /create post/i });
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(alertMock).toHaveBeenCalledWith('Please enter some content for your post.');
    expect(mockOnSubmit).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });
});