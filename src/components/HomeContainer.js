import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchHome } from "../redux";

import { Card, CardContent, CardActionArea, CardMedia, Typography, Grid, Link } from "@mui/material";

function HomeContainer({ homeData, fetchHome }) {
  useEffect(() => {
    fetchHome();
  }, []);

  return homeData.loading ? (
    <h2>Loading</h2>
  ) : homeData.error ? (
    <h2>{homeData.error}</h2>
  ) : (
    <div>
      <h1>All Pokemons</h1>
      <Grid container spacing={4}>
        {homeData &&
          homeData.data &&
          homeData.data.map(
            (item) => (
              <Grid item xs={6} sm={3} md={2} key={item.name}>
                <Card sx={{ maxWidth: 170 }}>
                  <CardActionArea href={`pokemon/${item.url.match(/\d+/g)[1]}`}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                    </CardContent>

                    <CardMedia
                      component="img"
                      height="170"
                      image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        item.url.match(/\d+/g)[1]
                      }.png`}
                      alt={item.name}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            )
          )}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    homeData: state.home,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHome: () => dispatch(fetchHome()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
