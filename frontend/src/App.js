import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import clsx from 'clsx';
import './App.css';
import NotFound from './components/NotFound';
import Nav from './components/navbar/Nav';
import Dashboard from './components/dashboard/Dashboard';
import ItemPage from './components/itempage/ItemPage';
import ItemList from './components/ItemList';
import ChatRoom from './components/chatroom/ChatRoom';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const drawerWidth = 240;

const useStyles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'grey'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  },
  contentShift: {
    backdropFilter: 'blur(10px)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='page-container'>
        <div className='content-wrap'>
          <Nav />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: this.props.drawerOpen
            })}
          >
            <Switch>
              <Route exact path='/' component={ItemList} />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              {/* /listing/?id=N* for individual item page */}
              <Route path='/listing' component={ItemPage} />
              <Route path='/ChatRoom' component={ChatRoom} />
              <Route path='*' component={NotFound} />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drawerOpen: state.nav.drawerOpen
});

export default connect(mapStateToProps)(withStyles(useStyles)(App));
