import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'


const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export default class News extends Component {

  articles = []



  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1


    }
    document.title = `${capitalizeFirstLetter(this.props.category)} - MyNews`;
  } 



  async componentDidMount() {
    const { country, category, apiKey } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}`;


    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles })

  }


  handleNextClick = async () => {

    const { country, category, apiKey } = this.props;
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}`;

    let data = await fetch(url);
    let parsedata = await data.json();

    this.setState({
      page: nextPage,
      articles: parsedata.articles
    })

  }


  handlePreClick = async () => {

    const { country, category, apiKey } = this.props;
    const prevPage = this.state.page - 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${prevPage}`;

    let data = await fetch(url);
    let parsedata = await data.json();

    this.setState({
      page: prevPage,
      articles: parsedata.articles
    })

  }



  render() {
    return (
      <div className='container my-4'>
        <h2 className='text-center'> MyNews - Top Headline </h2>

        <div className="row">

          {this.state.articles.map((element) => {

            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 70) : " "} imageUrl={!element.urlToImage ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" : element.urlToImage} newsUrl={element.url} />
            </div>

          })}

          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>PRE</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>NEXT</button>
          </div>




        </div>








      </div>
    )
  }
}

News.defaultProps = {
  country: 'in',
  category: 'general',
}



News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}


