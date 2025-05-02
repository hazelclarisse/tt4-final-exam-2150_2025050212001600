import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookForm() {
  const [book, setBook] = useState({ title: '', author: '', genre: '', publishedYear: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
        fetch(`http://backend/api/books/${id}`)
        .then(res => res.json())
        .then(data => setBook({
          title: data.title,
          author: data.author,
          genre: data.genre,
          publishedYear: data.publishedYear
        }));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setBook(b => ({ ...b, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://backend/api/books/${id}` : 'http://backend/api/books';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...book, publishedYear: parseInt(book.publishedYear,10) })
    }).then(() => navigate('/'));
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        {['title','author','genre','publishedYear'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              name={field}
              type={field==='publishedYear' ? 'number' : 'text'}
              className="form-control"
              value={book[field]}
              onChange={handleChange}
              required={field!=='genre'}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success me-2">
          {id ? 'Update' : 'Create'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={()=>navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
}
