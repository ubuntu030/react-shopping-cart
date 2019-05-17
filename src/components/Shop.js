import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Unsplash from './Unsplash';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      products: []
    }
  }

  componentDidMount() {
    const self = this;
    fetchPhoto().then(data => {
      self.setState({
        products: formatPhotosData(data)
      })
    });
    // TODO: loading 效果
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Shopping Cart
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                照片倉庫
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                你可以在這買到你想要的畫，只需動動手指，架上商品全是隨機的，若遇上中意的畫而不下單可能這輩子在也無法遇上了喲。
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Main call to action
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {/* TODO: loding 效果 */}
              <CardGenerate products={this.state.products} classes={classes} />
            </Grid>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    )
  }
}

Shop.propTypes = {
  classes: PropTypes.object.isRequired,
};

/**
 * 生成商品項目
 * @param {Object} props 
 */
function CardGenerate(props) {
  const { products, classes } = props;
  return (
    products.map(item => (
      <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={item.img}
            title={item.alt_description}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography>
              {item.alt_description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              查看
            </Button>
            <Button size="small" color="primary">
              加入商品
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))
  );
}
/**
 * 取得照片
 * @return {Promise}
 */
function fetchPhoto() {
  return Unsplash.photos.getRandomPhoto({ count: 12, query: 'nature', width: '800', height: '600' })
    .then(rep => rep.json())
    .then(json => {
      console.log('[fetchPhoto] ', json);
      return json;
    })
    .catch(error => {
      console.error(error)
      return error;
    });
}
/**
 * 將需要的資料整理成一綑
 * @param {Object} photoData fetchPhotos 回來的資料 
 * @return {Array<Object>} 整理後的照片資料
 */
function formatPhotosData(photoData) {
  const data = [...photoData];
  const nData = data.map(data => {
    const { id, exif, alt_description, urls: { regular: img }, user: { name } } = data;
    return { id, name, img, exif, alt_description }
  });
  console.log('[formatPhotos] ', nData);
  return nData;
}

export default withStyles(styles)(Shop);