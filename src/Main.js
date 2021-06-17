import React, { useState } from 'react';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Category } from '@material-ui/icons';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import People from '@material-ui/icons/People';
import Book from '@material-ui/icons/Book';
import { Container, CssBaseline, Hidden } from '@material-ui/core';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import BookList from './components/BookList'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { useHistory } from "react-router";
import Categories from './components/Categories'
import setUpInterceptor from './intercepter'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Main() {
  let history = useHistory();
  setUpInterceptor(history)
  return (
    <>
      <Wrapper>
        <Switch>
          <Route exact path="/">

          </Route>
          <Route exact path='/signup'>
            <SignUp /> </Route>
            <Route exact path='/login'>
            <Login /> </Route>

          <Route exact path="/books">
            <BookList />

          </Route>
          <Route exact path="/categories">
          <Categories />

          </Route>
          <Route exact path="/members">

          </Route>
          <Route exact path="/issues">

          </Route>
        </Switch>

      </Wrapper>
    </>

  )

}

function Wrapper(props) {
  const classes = useStyles();
  const history = useHistory()
  let [drawerOpen, setDrawerOpen] = useState(false)
  let toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  }

  function clickHandler(){
    history.push('/login')

  }


  return (
    <div className='container'>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            McLaren College Library
          </Typography>
          <Button color="inherit" onClick={clickHandler}>Login</Button>
        </Toolbar>
      </AppBar>
      <React.Fragment >

        <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <Typography variant="h6" className={classes.title}>
              Menu
            </Typography>
            {/* <Box/> */}
            {
              [
                { text: "Books", icon: <Book />, link: "/books" },
                { text: "Categories", icon: <Category />, link: "/categories" },
                { text: "Members", icon: <People />, link: "/members" },
                { text: "IssuedBooks", icon: <Book />, link: "/issues" },

              ].map(({ text, icon, link }, idx) =>
                <Link to={link} onClick={toggleDrawer}>
                  <ListItem className={classes.list} Button key={text}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              )
            }
          </List>
        </Drawer>
      </React.Fragment>
      <Container fixed className={classes.paddedContainer}>
        {props.children}
      </Container>

    </div>
  );
}
