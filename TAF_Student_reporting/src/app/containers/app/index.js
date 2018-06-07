// @flow weak

import { connect }              from 'react-redux';
import {
  bindActionCreators,
  compose
}                               from 'redux';
import { withRouter }           from 'react-router';
import * as viewsActions        from '../../redux/modules/views';
import * as userInfosActions    from '../../redux/modules/userInfos';
import * as sidemenuActions     from '../../redux/modules/sideMenu';
import * as earningGraphActions from '../../redux/modules/earningGraph';
import App                      from './App';


const mapStateToProps = (state) => {
  return {
    // views:
    currentView:         state.views.currentView,
    // sideMenu:
    sideMenuIsCollapsed: true,
    // userInfos:
    userInfos:           state.userInfos.data,
    userIsConnected:     state.userInfos.isConnected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        // views:
        ...viewsActions,
        // userInfos
        ...userInfosActions,
        // sideMenu
        ...sidemenuActions,
        // eaning graph
        ...earningGraphActions
      },
      dispatch
    )
  };
};

// we use here compose (from redux) just for conveniance (since compose(f,h, g)(args) looks better than f(g(h(args))))
export default compose(
  withRouter, // IMPORTANT: witRouter is "needed here" to avoid blocking routing:
  connect(mapStateToProps, mapDispatchToProps)
)(App);
