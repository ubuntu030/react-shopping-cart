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
    overflowX: 'auto',
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
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
