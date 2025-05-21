import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, createPost, likePost, addComment } from '../services/createPostService';

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
    if (newPost.image) {
      // Zamień obrazek na base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageString = reader.result;
        const author = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;
        await createPost({
          title: newPost.title,
          content: newPost.content,
          image: imageString,
          author,
        });
        fetchPosts().then(setPosts);
        setNewPost({ title: '', content: '', image: null });
      };
      reader.readAsDataURL(newPost.image);
    } else {
      const author = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).username;
      await createPost({
        title: newPost.title,
        content: newPost.content,
        image: '',
        author,
      });
      fetchPosts().then(setPosts);
      setNewPost({ title: '', content: '', image: null });
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center py-8">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Blog dla znajomych</h1>
        <button
          onClick={handleLogout}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Wyloguj
        </button>
      </header>

      {/* Formularz dodawania posta */}
      <form
        onSubmit={handleAddPost}
        className="w-full max-w-2xl bg-neutral-800 rounded-xl p-6 mb-8 shadow-lg flex flex-col gap-4"
      >
        <input
          className="w-full rounded p-2 bg-neutral-900 text-white"
          placeholder="Tytuł posta"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          className="w-full rounded p-2 bg-neutral-900 text-white resize-none"
          rows={3}
          placeholder="Co nowego?"
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="text-white"
          onChange={e =>
            setNewPost({ ...newPost, image: e.target.files[0] })
          }
        />
        <button
          type="submit"
          className="self-end bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Dodaj post
        </button>
      </form>

      {/* Lista postów */}
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {posts.map(post => (
          <div key={post._id} className="bg-neutral-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-purple-300">{post.author?.username || 'Anonim'}</span>
              <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="mb-2 text-white">{post.content}</div>
            {post.image && (
              <img
                src={post.image}
                alt="Załączone"
                className="max-h-64 rounded mb-2 object-cover"
              />
            )}
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg>
                {post.likes?.length || 0}
              </button>
            </div>
            {/* Komentarze */}
            <div className="mt-4">
              <div className="font-semibold text-gray-300 mb-2">Komentarze:</div>
              <ul className="mb-2">
                {post.comments?.map((comment, idx) => (
                  <li key={idx} className="text-sm text-white mb-1">
                    {comment}
                  </li>
                ))}
              </ul>
              <form
                onSubmit={e => handleAddComment(post._id, e)}
                className="flex gap-2"
              >
                <input
                  type="text"
                  className="flex-1 rounded p-2 bg-neutral-900 text-white"
                  placeholder="Dodaj komentarz..."
                  value={commentText[post._id] || ""}
                  onChange={e =>
                    setCommentText({ ...commentText, [post._id]: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
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