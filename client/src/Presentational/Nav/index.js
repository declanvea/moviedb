import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F9F9F9"
  },
  image: {
    cursor: "pointer",
    width: "30%",
    marginBottom: "20px"
  }
};

const Nav = ({ children, history, classes }) => {
  const goHome = useCallback(() => {
    history.push("/");
  });
  return (
    <div className={classes.root}>
      <img
        src={process.env.PUBLIC_URL + "/moviedb.svg"}
        alt="logo"
        onClick={goHome}
        className={classes.image}
      />
      {children}
    </div>
  );
};

export default withRouter(withStyles(styles)(Nav));
