import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = {
  root: {
    padding: "10px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: "70%"
  },
  container: {
    maxWidth: "90%",
    minWidth: "80%",
    padding: "10px 0px",
    "@media (max-width:600px)": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  flex: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0px"
  },
  detailsFlex: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0px",
    "@media (max-width:600px)": {
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  info: {
    paddingLeft: "10px"
  },
  card: {
    display: "flex",
    boxShadow: "none",
    backgroundColor: "inherit"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  pointer: {
    cursor: "pointer"
  },
  mediaOverview: {
    "@media (max-width:600px)": {
      textAlign: "center"
    }
  },
  credits: {
    "@media (max-width:600px)": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start"
    }
  },
  genre: {
    paddingLeft: "10px"
  }
};

class Movie extends React.Component {
  state = {
    movie: [],
    credits: []
  };
  componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;
    const movie_id = pathname.slice(7);
    this.getMovie(movie_id);
    this.getCredits(movie_id);
  }

  getMovie = id => {
    fetch(`/movie/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          movie: data.data
        });
      });
  };

  getCredits = id => {
    fetch(`/movie/${id}/credits`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          credits: data.data
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { movie = [], credits = [] } = this.state;
    const { cast = [] } = credits;
    const {
      backdrop_path: image,
      budget,
      genres = [],
      homepage,
      overview,
      popularity,
      poster_path: poster,
      release_date: date,
      revenue,
      runtime,
      status,
      tagline,
      title
    } = movie;
    const money = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    return (
      <Grid className={classes.root}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Grid className={classes.flex}>
          <Typography>{runtime} min</Typography>
          {genres.map(genre => (
            <Typography key={genre.id} className={classes.genre}>
              | {genre.name}
            </Typography>
          ))}
        </Grid>
        <a
          className={classes.pointer}
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt="movie_logo"
          />
        </a>{" "}
        <Grid className={classes.container}>
          <Typography className={classes.mediaOverview}>{overview}</Typography>
          <Grid className={classes.detailsFlex}>
            <a
              className={classes.pointer}
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${poster}`}
                alt="movie_poster"
              />
            </a>{" "}
            <Grid className={classes.info}>
              <Typography>Status: {status}</Typography>
              <Typography>
                Release Date: {moment(date).format("MMMM Do, YYYY")}
              </Typography>
              <Typography>Revenue: {money.format(revenue)}</Typography>
              <Typography>Budget: {money.format(budget)}</Typography>
              <Typography>Rating: {popularity}</Typography>
              <Typography>Tagline: {tagline}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" component="h2">
            Cast:
          </Typography>
          <Grid className={classes.credits}>
            {cast.map(actor => (
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cover}
                  image={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  title="Live from space album cover"
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {actor.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {actor.character}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(Movie));
