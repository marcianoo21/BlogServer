import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, createPost, likePost, addComment } from '../services/createPostService';
import '../styles/mainPage.css'; // Importujemy plik CSS

export const Main = () => {
   const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null });
  const [commentText, setCommentText] = useState({});

  // Pobierz posty po załadowaniu strony
  useEffect(() => {
    fetchPosts().then(data => setPosts(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Dodawanie posta
  const handleAddPost = async (e) => {
    e.preventDefault();
    let imageString = '';
    const author = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;

    if (newPost.image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageString = reader.result;
        await createPost({
          title: newPost.title,
          content: newPost.content,
          image: imageString,
          author,
        });
        setNewPost({ title: '', content: '', image: null });
        // Odśwież posty po dodaniu
        fetchPosts().then(setPosts);
      };
      reader.readAsDataURL(newPost.image);
    } else {
      await createPost({
        title: newPost.title,
        content: newPost.content,
        image: '',
        author,
      });
      setNewPost({ title: '', content: '', image: null });
      // Odśwież posty po dodaniu
      fetchPosts().then(setPosts);
    }
  };

  // Lajkowanie posta
  const handleLike = async (postId) => {
    await likePost(postId);
    fetchPosts().then(setPosts);
  };

  // Dodawanie komentarza
  const handleAddComment = async (postId, e) => {
    e.preventDefault();
    if (!commentText[postId]) return;
    await addComment(postId, commentText[postId]);
    fetchPosts().then(setPosts);
    setCommentText({ ...commentText, [postId]: '' });
  };

  return (
    <div className="main-page">
      <header className="header">
        <h1 className="header-title">Blog dla znajomych</h1>
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Wyloguj
        </button>
      </header>

      <form
        onSubmit={handleAddPost}
        className="post-form"
      >
        <input
          className="post-input"
          placeholder="Tytuł posta"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          className="post-textarea"
          rows={3}
          placeholder="Co nowego?"
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />
        {/* Zmiana: Dodajemy wrapper dla inputu typu file */}
        <div className="file-input-wrapper">
          <input
            type="file"
            accept="image/*"
            className="post-file-input"
            id="postImage" // Dodaj id dla etykiety
            onChange={e =>
              setNewPost({ ...newPost, image: e.target.files[0] })
            }
          />
          <label htmlFor="postImage" className="custom-file-button">
            Wybierz plik
          </label>
          <span className="file-name">
            {newPost.image ? newPost.image.name : 'Nie wybrano pliku'}
          </span>
        </div>

        <button
          type="submit"
          className="submit-post-button"
        >
          Dodaj post
        </button>
      </form>

      {/* Lista postów */}
      <div className="posts-list">
        {posts.slice().reverse().map(post => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <span className="post-author">{post.author?.username || 'Anonim'}</span>
              <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="post-content">{post.content}</div>
            {post.image && (
              <img
                src={post.image}
                alt="Załączone"
                className="post-image"
              />
            )}
            <div className="post-actions">
              <button
                onClick={() => handleLike(post._id)}
                className="like-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="like-icon" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg>
                {post.likes?.length || 0}
              </button>
            </div>
            {/* Komentarze */}
            <div className="comments-section">
              <div className="comments-title">Komentarze:</div>
              <ul className="comments-list">
                {post.comments?.map((comment, idx) => (
                  <li key={idx} className="comment-item">
                    {comment}
                  </li>
                ))}
              </ul>
              <form
                onSubmit={e => handleAddComment(post._id, e)}
                className="add-comment-form"
              >
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Dodaj komentarz..."
                  value={commentText[post._id] || ""}
                  onChange={e =>
                    setCommentText({ ...commentText, [post._id]: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="submit-comment-button"
                >
                  Dodaj
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};