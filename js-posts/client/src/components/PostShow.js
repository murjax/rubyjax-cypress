import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './../AuthProvider';

function PostShow(props) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const params = useParams();
  const { token } = useAuth();

  const postComment = (event) => {
    event.preventDefault();

    if (!newComment.length) {
      return;
    }

    const commentData = {
      post_id: params.id,
      text: newComment
    };

    fetch('http://localhost:3001/comments', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(commentData)
    }).then(() => {
      setNewComment('')

      fetch(`http://localhost:3001/comments?post_id=${params.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then((response) => response.json()).then((data) => {
        setComments(data);
      });
    });
  }

  const handleCommentDelete = (commentId) => {
    if (window.confirm('Are you sure?')) {
      fetch(`http://localhost:3001/comments/${commentId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then((_response) => {
        fetch(`http://localhost:3001/comments?post_id=${params.id}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then((response) => response.json()).then((data) => {
          setComments(data);
        });
      });
    }
  }

  useEffect(() => {
    const getPost = () => {
      fetch(`http://localhost:3001/posts/${params.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then((response) => response.json()).then((data) => {
        setPost(data);
      });
    }

    const getComments = () => {
      fetch(`http://localhost:3001/comments?post_id=${params.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then((response) => response.json()).then((data) => {
        setComments(data);
      });
    }

    getPost();
    getComments();
  }, [token, params.id]);

  return (
    <div className="flex flex-col items-center relative md:rounded-md bg-white shadow-md mb-10 p-2">
      <h2 className="text-2xl">Show Post</h2>
      <div className="w-3/4 md:block">
        <table className="w-full text-left table-auto min-w-max">
          <tbody>
            <tr>
              <td className="p-4 block md:table-cell">
                <p className="block text-sm antialiased font-bold leading-normal text-gray-400">
                  Name
                </p>
              </td>
              <td className="p-4 block md:table-cell">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {post.name}
                </p>
              </td>
            </tr>
            <tr>
              <td className="p-4 block md:table-cell">
                <p className="block text-sm antialiased font-bold leading-normal text-gray-400">
                  Description
                </p>
              </td>
              <td className="p-4 block md:table-cell">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {post.description}
                </p>
              </td>
            </tr>
            <tr>
              <td className="p-4 block md:table-cell">
                <p className="block text-sm antialiased font-bold leading-normal text-gray-400">
                  Author
                </p>
              </td>
              <td className="p-4 block md:table-cell">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {post.first_name} {post.last_name}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl">Comments</h2>
      <div className="w-3/4 md:block">
        <form onSubmit={postComment}>
          <div className="flex flex-col p-4 mx-auto max-w-xl mt-24">
            <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="comment">Leave a Comment:</label>
            <textarea
              rows="4"
              id="comment"
              name="comment"
              className="mb-4 px-3 py-2 border-2 border-gray-300 rounded-lg"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            >
            </textarea>
            <div className="flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[100px]">Submit</button>
            </div>
          </div>
        </form>

        <div
          className="divide-y divide-gray-200"
          data-test-id="comment-list"
        >
          {comments.map((comment) => (
            <article key={comment.id} className="p-6 text-base bg-white dark:bg-gray-900">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    {comment.first_name} {comment.last_name}
                  </p>
                </div>
                <button
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostShow;
