import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);


  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - MyNews`;
    fetchArticles();
  }, [page]);



  const fetchArticles = async () => {
    const { country, category, apiKey } = props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}`;

    let data = await fetch(url);
    let parsedata = await data.json();
    setArticles(parsedata.articles);
  };


  const handleNextClick = async () => {
    const { country, category, apiKey } = props;
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}`;

    let data = await fetch(url);
    let parsedata = await data.json();

    setPage(nextPage);
    setArticles(parsedata.articles);
  };


  const handlePreClick = async () => {
    const { country, category, apiKey } = props;
    const prevPage = page - 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${prevPage}`;

    let data = await fetch(url);
    let parsedata = await data.json();

    setPage(prevPage);
    setArticles(parsedata.articles);
  };


  return (
    <div className='container my-4'>
      <h2 className='text-center'> MyNews - Top Headline </h2>

      <div className="row">

        {articles.map((element) => (
          <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 70) : " "} imageUrl={!element.urlToImage ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" : element.urlToImage} newsUrl={element.url} />
          </div>
        ))}


        <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreClick}>PRE</button>
          <button type="button" className="btn btn-dark" onClick={handleNextClick}>NEXT</button>
        </div>


      </div>
    </div>
  );
};


News.defaultProps = {
  country: 'in',
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
