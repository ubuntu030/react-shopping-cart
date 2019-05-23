import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

// TODO: 加入商品圖片顯示
// TODO: 總價格計算
// TODO: 買單
// TODO: 移除商品
function Cart(props) {
  const { classes, cart, products } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>作者</TableCell>
            <TableCell align="right">價格</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            cart.map(id => {
              const info = products[id];
              return (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {info.name}
                  </TableCell>
                  <TableCell align="right">${info.price}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);
