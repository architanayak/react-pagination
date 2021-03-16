
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css'

function App() {
  const [postsPerPage] = useState(5);
  const [offset, setOffset] = useState(1);
  const [posts, setAllPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0)

  const getPostData = (data) => {
    return (
      data.map(post => <div className="container" key={post.id}>
        <p>User ID: {post.id}</p>
        <p>Title: {post.title}</p>
      </div>)
    )

  }

  const getAllPosts = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    const data = res.data;
    const slice = data.slice(offset - 1, offset - 1 + postsPerPage)
    // For displaying Data 
    const postData = getPostData(slice)

    // Using Hooks to set value
    setAllPosts(postData)
    setPageCount(Math.ceil(data.length / postsPerPage))
  }

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1)
  };

  useEffect(() => {
    getAllPosts()
  }, [offset])

  return (
    <div className="main-app">

      {/* Display all the posts */}
      {posts}

      {/* Using React */}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />
    </div>
  );
}

export default App;
