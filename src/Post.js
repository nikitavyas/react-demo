import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import posts from "./data/dummy-post";
import Layout from "./components/layout";
class Post extends React.Component {
  logOut = () => {
    localStorage.clear();
    this.props.history.push(`/`)
  }

  render() {
    console.log(posts);
    return (

      <Layout>
        <div style={{ marginTop: 20, padding: 30 }}>
          <Grid container justify="center">
            {posts.map(post => (
              <Grid item key={post.title}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image={post.image}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography component="p">{post.excerpt}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                </Button>
                    <Button size="small" color="primary">
                      Learn More
                </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Layout>
    );
  }
}
export default Post;
