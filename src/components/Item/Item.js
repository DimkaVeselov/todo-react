import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import classnames from 'classnames';
import styles from './Item.module.css';
import PropTypes from 'prop-types';

class Item extends React.Component {

  render() {
    
    const { value, isDone, id, onClickDone, onClickDelete, onClickSelected, selectedId } = this.props;
    
    return (
    
    <div className={styles.item} onClick={() => onClickSelected(id)} selected={selectedId}> 

      <Checkbox
      checked={isDone}
      color="primary"
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      onClick={() => onClickDone(id)}
      />

      <label 
        onClick={() => onClickDone(id)} 
        className={
        classnames({
            [styles.item]: true,
            [styles.done]: isDone
          })
      }>
        {value}
      </label>

      <div 
        className={styles.btnDelete}
        onClick={() => onClickDelete(id)}
      >
        <Grid>
          <DeleteIcon
            color="action"
          />
        </Grid>
      </div>

    </div >);
  }
}

Item.propTypes = {
  value: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onClickDone: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
};

Item.defaultProps = {
  isDone: false
};

export default Item;
