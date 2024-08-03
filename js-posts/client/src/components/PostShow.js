import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostShow(props) {
  const [post, setPost] = useState({});

  const params = useParams();

  useEffect(() => {
    const getPost = () => {
      fetch(`http://localhost:3001/posts/${params.id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': props.authToken
        }
      }).then((response) => response.json()).then((data) => {
        setPost(data);
      });
    }

    getPost();
  }, [props.authToken, params.id]);

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
    </div>
  );
}

export default PostShow;
