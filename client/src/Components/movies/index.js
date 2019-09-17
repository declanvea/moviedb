import React from "react";
import { withRouter } from "react-router";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  InputBase,
  IconButton,
  Grid
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    color: "#212c39"
  },
  table: {
    minWidth: 650
  },
  inputRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    minWidth: 650
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  movieList: {
    width: "100%",
    overflowX: "auto"
  },
  pointer: {
    cursor: "pointer"
  }
};

class Movies extends React.Component {
  state = {
    movies: [],
    search: "",
    searchedMovies: []
  };
  componentDidMount() {
    fetch("/movie/popular")
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: data.data.results
        });
      });
  }
  onChange = evt => {
    this.setState({
      search: evt.target.value
    });
  };

  onSubmit = () => {
    const { search } = this.state;
    fetch(`/search/movie?search=${search}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          searchedMovies: data.data.results
        });
      });
  };

  onKeyPress = e => {
    const { search } = this.state;
    if (e.key === "Enter") {
      this.onSubmit(search);
    }
  };

  clickMovie = id => {
    const { history } = this.props;
    history.push(`/movie/${id}`);
  };

  render() {
    const { classes } = this.props;
    const { movies = [], searchedMovies = [] } = this.state;
    const data = searchedMovies.length ? searchedMovies : movies;
    return (
      <div className="App">
        <Grid className={classes.root}>
          <Paper className={classes.inputRoot}>
            <InputBase
              className={classes.input}
              placeholder="Search The Movie Database..."
              inputProps={{ "aria-label": "search movie database" }}
              onChange={this.onChange}
              onKeyDown={this.onKeyPress}
            />
            <IconButton
              onClick={this.onSubmit}
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Paper className={classes.movieList}>
          <Table className={classes.table} size="medium">
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Release Date</TableCell>
                <TableCell align="left">Vote Average</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => (
                <TableRow
                  onClick={() => this.clickMovie(item.id)}
                  className={classes.pointer}
                  key={item.id}
                >
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">
                    {moment(item.release_date).format("MMMM Do, YYYY")}
                  </TableCell>
                  <TableCell align="left">{item.vote_average}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Movies));
