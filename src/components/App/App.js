import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import About from '../About/About';
import ToDo from '../ToDo/ToDo';

import styles from'./App.module.css';
import Card from "@material-ui/core/Card";

const App = () => (
  <Router>

    <div className={styles.wrap}>

      <Card className={styles.sidebar}>
          <NavLink exact to='/' className={styles.link} activeClassName={styles.active_link}>обо мне</NavLink>
          <NavLink to='/todo' className={styles.link} activeClassName={styles.active_link}>дела</NavLink>
      </Card>

      <div className = {styles.content}>
        <Route path='/' exact component={About}/>
        <Route path='/todo' component={ToDo}/>
      </div>

    </div>

  </Router>);


export default App;
