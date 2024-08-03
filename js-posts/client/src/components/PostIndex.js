import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PostIndex(props) {
  const [posts, setPosts] = useState([]);

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure?')) {
      fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': props.authToken
        }
      }).then((_response) => {
        fetch('http://localhost:3001/posts', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': props.authToken
          }
        }).then((response) => response.json()).then((data) => {
          setPosts(data);
        });
      });
    }
  }

  useEffect(() => {
    const getPosts = () => {
      fetch('http://localhost:3001/posts', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': props.authToken
        }
      }).then((response) => response.json()).then((data) => {
        setPosts(data);
      });
    }

    getPosts();
  }, [props.authToken]);

  return (
    <div
      className="flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-b-xl mb-10 p-4 bg-clip-border"
    >
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Name
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Description
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Author
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {post.name}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {post.description}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {post.first_name} {post.last_name}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Link
                  to={`${post.id}`}
                  className="block text-sm antialiased font-medium leading-normal text-blue-400"
                >
                  View
                </Link>
                <Link
                  to={`${post.id}/edit`}
                  className="block text-sm antialiased font-medium leading-normal text-blue-400"
                >
                  Edit
                </Link>
                <button
                  className="block text-sm antialiased font-medium leading-normal text-red-400"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostIndex;
