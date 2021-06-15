import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../redux/actions/userActions';
import { loadCookie } from '../../redux/actions/authActions';
import { withStyles } from '@material-ui/core/styles';
import DashBoardTabs from './DashBoardTabs';
import UserProfileCard from './dashboardCards/UserProfileCard';
import UserDetailsCard from './dashboardCards/UserDetailsCard/UserDetailsCard.js';
import PostHubCard from './dashboardCards/PostHubCard/PostHubCard';

const useStyles = (theme) => ({
  root: {
    minWidth: 460,
    margin: '1rem',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
  },
  dashboardTabs: {},
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.loadCookie().then(() => {
      console.log(this.props.userId);
      this.props.getUserData(this.props.userId);
    });
  }

  componentDidUpdate() {
    // if (!this.props.isSignedIn) {
    //   this.props.history.push('/');
    // }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.cardContainer}>
          <UserProfileCard />
          <UserDetailsCard />
          <PostHubCard />
        </div>
        <div className={classes.dashboardTabs}>
          <DashBoardTabs />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, { getUserData, loadCookie })(
  withStyles(useStyles)(Dashboard)
);
