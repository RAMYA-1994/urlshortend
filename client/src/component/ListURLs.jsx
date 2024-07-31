// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ListURLs = () => {
//   const [urls, setUrls] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUrls = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve token from local storage
//         const response = await axios.get('/api/urls', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUrls(response.data);
//       } catch (err) {
//         setError(err.response ? err.response.data : 'Error fetching URLs');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUrls();
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-danger">{error}</div>;
//   }

//   return (
//     <div className="container">
//       <h2 className="text-center">List of URLs</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Original URL</th>
//             <th>Short URL</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {urls.map((url) => (
//             <tr key={url._id}>
//               <td>{url.originalUrl}</td>
//               <td>
//                 <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
//                   {url.shortUrl}
//                 </a>
//               </td>
//               <td>{new Date(url.createdAt).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListURLs;
