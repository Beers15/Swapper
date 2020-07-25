import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../redux/actions/userActions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DashBoardTabs from './DashBoardTabs.js';
import UserProfileCard from './UserProfileCard.js';
import UserDetailsCard from './UserDetailsCard.js';

const useStyles = theme => ({
  root: {
    minWidth: 460
  },
  dashboardTabs: {}
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserData(this.props.userId);
  }

  componentDidUpdate() {
    if (!this.props.isSignedIn) {
      this.props.history.push('/');
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className='container-flexbox-userprofile'>
          <UserProfileCard />
          <UserDetailsCard />
        </div>
        <div className={classes.dashboardTabs}>
          <DashBoardTabs />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  userId: state.auth.userId
});

export default connect(
  mapStateToProps,
  { getUserData }
)(withStyles(useStyles)(Dashboard));
