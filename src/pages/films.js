import React, { Component } from "react";

const stdImgPath = "https://image.tmdb.org/t/p/w300";

class Films extends Component {
  state = {
    films: [],
  };
  componentDidMount() {
    fetch("https://api.themoviedb.org/3/trending/all/week?api_key=1d02cf870156c36c20bd2c4215c07516")
      .then((res) => res.json())
      .then((res) => this.setState({ films: res.results }));
    console.log(this.state.films);
  }
  render() {
    return (
      <div>
        <h1>Films page</h1>
        <ul>
          {this.state.films.map((film) => (
            <li key={film.id}>
              <img src={`${stdImgPath}${film.poster_path}`} alt="" />
              {film.name ?? film.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Films;
