import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDetail } from "../redux";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";

function DetailContainer({ detailData, fetchDetail }) {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id]);

  return detailData.loading ? (
    <h2>Loading</h2>
  ) : detailData.error ? (
    <h2>{detailData.error}</h2>
  ) : (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          {detailData.data && detailData.data.typeArray && (
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                alt={detailData.data.name}
                height="300"
                image={detailData.data.sprites.front_default}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {detailData.data.name}
                </Typography>
                <Typography>Types:</Typography>
                {detailData.data.typeArray.map((type) => (
                  <Typography key={type}>{type}</Typography>
                ))}
              </CardContent>
              <CardActions>
                {detailData.data.evolveFrom != null ? (
                  <div>
                    <Button
                      variant="outlined"
                      size="small"
                      href={`/pokemon/${
                        detailData.data.evolveFrom.url.match(/\d+/g)[1]
                      }`}
                    >
                      Evolve From
                    </Button>
                    <Typography>{detailData.data.evolveFrom.name}</Typography>
                  </div>
                ) : (
                  <div>
                    <Button disabled variant="outlined" size="small">
                      Evolve From
                    </Button>
                    <Typography>N/A</Typography>
                  </div>
                )}
                {detailData.data.evolveTo != null ? (
                  <div>
                    <Button
                      variant="outlined"
                      size="small"
                      href={`/pokemon/${
                        detailData.data.evolveTo.url.match(/\d+/g)[1]
                      }`}
                    >
                      Evolve To
                    </Button>
                    <Typography>{detailData.data.evolveTo.name}</Typography>
                  </div>
                ) : (
                  <div>
                    <Button disabled variant="outlined" size="small">
                      Evolve To
                    </Button>
                    <Typography>N/A</Typography>
                  </div>
                )}
              </CardActions>
              <CardActions>
                <Button variant="outlined" size="small" href="/">
                  Back to home page
                </Button>
              </CardActions>
            </Card>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    detailData: state.detail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetail: (id) => dispatch(fetchDetail(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
