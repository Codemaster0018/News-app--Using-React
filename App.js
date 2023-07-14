import React, { useEffect, useState } from 'react';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, [category, searchQuery]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = '6185f397703a40ff8cc4f836895a073b'; 
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${apiKey}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'ok') {
        setArticles(data.articles);
      } else {
        setError('Error fetching news');
      }
    } catch (error) {
      setError('Error fetching news');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCategory('');
    fetchNews();
  };

  return (
    <div className="container-fluid bg-black">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <a className="navbar-brand" href="/"><b>NEWS EXPRESS</b></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/"><b>Top News</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"><b>Sports</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/"><b>Techonology</b></a>
            </li>
            {/* Add more categories as needed */}
          </ul>
        </div>
        <form className="form-inline" onSubmit={handleSearchSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error state */}
      {error && <p>{error}</p>}

      {/* News articles */}
      <div className="row">
        {!loading && !error && articles.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="card-img-top" />
              )}
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
