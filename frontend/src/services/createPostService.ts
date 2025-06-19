import { apiFetch } from './apiFetch';

export function createPost(post: any) {
  return apiFetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify(post),
  });
}

export function fetchPosts() {
  return apiFetch('http://127.0.0.1:3000/api/posts');
}

export function likePost(postId: string) {
  return apiFetch(`http://127.0.0.1:3000/api/posts/${postId}/like`, {
    method: 'POST',
  });
}

export function addComment(postId: string, comment: string) {
  return apiFetch(`http://127.0.0.1:3000/api/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ comments: comment }),
  });
}