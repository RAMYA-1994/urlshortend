import React, { useState } from 'react';
import axios from 'axios';

const CreateURL = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/urls', { originalUrl });
      setShortUrl(response.data.shortUrl);
      setError('');
    } catch (err) {
      setError('Failed to create short URL');
      setShortUrl('');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Create URL</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Original URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                  />
                </div>
                {shortUrl && <div className="alert alert-success">Short URL: {shortUrl}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary btn-block">Create Short URL</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateURL;
