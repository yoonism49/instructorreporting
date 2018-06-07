// @fow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import BasicProgressBar       from './BasicProgressBar';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterBasicProgressBar: actions.enterBasicProgressBar,
        leaveBasicProgressBar: actions.leaveBasicProgressBar
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicProgressBar);
