import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    fetch('http://backend/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  };

  useEffect(fetchBooks, []);

  const deleteBook = id => {
    if (!window.confirm('Delete this book?')) return;
    fetch(`http://backend/api/books/${id}`, { method: 'DELETE' })
      .then(fetchBooks)
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Book Library</h2>
        <Link to="/create" className="btn btn-primary">Add Book</Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr><th>Title</th><th>Author</th><th>Genre</th><th>Year</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              <td>{b.publishedYear}</td>
              <td>
                <Link to={`/edit/${b.id}`} className="btn btn-sm btn-secondary me-2">Edit</Link>
                <button onClick={()=>deleteBook(b.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
