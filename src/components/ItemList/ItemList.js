import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/Item';

import styles from './ItemList.module.css'

const ItemList = ({ Items, onClickDone, onClickDelete, onClickSelected, selectedId }) => {
  return (
    <ul className={styles.wrapTasks}>
      {Items.map((item) => (<li key={item.id} className={styles.tasks}>
        <Item
          value={item.value}
          isDone={item.isDone}
          id={item.id}
          onClickDone={onClickDone}
          onClickDelete={onClickDelete}
          onClickSelected={onClickSelected}
          selectedId={selectedId}
          key= {item.id}
        />
      </li>))}
    </ul>
  )
};

ItemList.propTypes = {
  Items: PropTypes.array.isRequired,
  onClickDone: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
}

export default ItemList;
