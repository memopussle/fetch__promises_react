//check the response first. 
const checkStatus = (response) => {
      if (response.ok) {
        //ok returns true if response status is 200-299
        return response;
      }
      throw new Error("Request was either 404 or 500");
}

const json = (response) => response.json();

//Movie component to render this data


const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return (
    <div className="row">
      <div className="col-4 col-md-3 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank"></a>
        <img src={Poster} className="img-fluid" />
      </div>
      <div className="col-8 cil-md-9 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank"></a>
        <h4>{Title}</h4>
        <p>
          {Type} | {Year}
        </p>
      </div>
    </div>
  );
};

class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
        results: [],
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ searchTerm: event.target.value }); // change the state with the input that has ben targeted by event.target.value method
  }

  //Making the fetch request

  handleSubmit(event) {
    event.preventDefault(); //prevent page reload when submit button clicks
    let { searchTerm } = this.state;
    searchTerm = searchTerm.trim(); //clean the string

    if (!searchTerm) {
      // make sure the value isn't an empty string
      return;
    }

    //make the AJAX request to OMDBAPI  to get a list of results
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=824d122`)
      .then(checkStatus).then(json)
      .then((data) => {
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        if (data.Response === "True" && data.Search) {
          this.setState({ results: data.Search, error: "" });
        }
        //after getting data object sucessfully, store the array of movie objects in the component state
        this.setState({ results: data.Search }); //data.Search: array of the movies and store it in results array
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { searchTerm, results, error } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="form-inline my-4" onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="form-control mr-sm-2"
                placeholder="frozen"
                value={searchTerm}
                onChange={this.handleChange}
              ></input>
              <button type="submit" className="btn btn-danger">
                Submit
              </button>
            </form>
            {(() => {
              if (error) {
                return error;
              }
              return results.map((movie) => {
                return <Movie key={movie.imdbID} movie={movie} />;
              });
            })()}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MovieFinder />, document.getElementById("root"));
