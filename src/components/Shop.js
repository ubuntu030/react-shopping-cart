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
import { Badge, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Unsplash from './Unsplash';
import FullScreenDialog from './FullScreenDialog';
import Cart from './Cart';

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
  flexGrow: {
    flexGrow: 1
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
  image: {
    width: '100%'
  }
});

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      products: [],
      open: false,
      cartOpen: false,
      currentItem: {}
    }
    this.handleDetailClick = this.handleDetailClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddCartClick = this.handleAddCartClick.bind(this);
    this.handleOpenCart = this.handleOpenCart.bind(this);
  }

  componentDidMount() {
    const self = this;
    fetchPhoto().then(data => {
      self.setState({
        products: formatPhotosData(data)
      });
    });
    // TODO: loading 效果
  }
  // 點擊查看時開啟 Dialog
  handleDetailClick(item) {
    console.log(item);

    this.setState({
      open: true,
      currentItem: item
    })
  }
  // 關閉 Dialog 事件
  handleClose() {
    this.setState({
      open: false,
      cartOpen: false
    });
  }
  // 加入購物車按鈕處理
  handleAddCartClick(itemId) {
    // 避免重複加入，同樣商品
    if (this.state.cart.includes(itemId)) {
      return;
    }
    this.setState(state => ({
      cart: state.cart.concat(itemId)
    }));
  }
  // 開啟購物車
  handleOpenCart() {
    this.setState({
      cartOpen: true
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.flexGrow}>
              Shopping Cart
            </Typography>
            <IconButton color="inherit" onClick={this.handleOpenCart}>
              <Badge badgeContent={this.state.cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
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
              <CardGenerate
                products={this.state.products}
                cart={this.state.cart}
                onDetailClick={this.handleDetailClick}
                onAddCartClick={this.handleAddCartClick}
                classes={classes}
              />
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
        <FullScreenDialog
          open={this.state.open}
          currentItem={this.state.currentItem}
          onClose={this.handleClose}
        >
          <img alt={this.state.currentItem.alt_description} src={this.state.currentItem.img} className={classes.image}></img>
        </FullScreenDialog>
        <FullScreenDialog
          open={this.state.cartOpen}
          onClose={this.handleClose}
        >
          <Cart
            cart={this.state.cart}
            products={this.state.products}
          />
        </FullScreenDialog>
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
 * @return {Component}
 */
function CardGenerate(props) {
  // TODO: 優化: products、cart 共用
  const { products, cart, classes, onDetailClick, onAddCartClick } = props;
  const productArr = Object.values(products);
  return (
    productArr.map(item => (
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
            <Button size="small" color="primary" onClick={onDetailClick.bind(this, item)}>
              查看
            </Button>true
            <Button size="small" color="primary" disabled={cart.includes(item.id)} onClick={onAddCartClick.bind(this, item.id)}>
              加入相簿
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
 * @return {Object} 整理後的照片資料
 */
function formatPhotosData(photoData) {
  const data = [...photoData];
  const idMap = {};
  data.forEach(data => {
    const { id, exif, alt_description, urls: { regular: img }, user: { name } } = data;
    // 將資料整理成鍵值對
    idMap[id] = { id, name, img, exif, alt_description };
  });
  console.log('[formatPhotosData] ', idMap);
  return idMap;
}

export default withStyles(styles)(Shop);