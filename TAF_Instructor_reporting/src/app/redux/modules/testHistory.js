// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import { appConfig }        from '../../config';
// import {
//   getEarningGraphData
// }                           from '../../services/API';
// import {
//   fetchMockEarningGraphData
// }                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_MODULE_DATA   = 'REQUEST_MODULE_DATA';
const RECEIVED_MODULE_DATA  = 'RECEIVED_MODULE_DATA';
const ERROR_MODULE_DATA     = 'ERROR_MODULE_DATA';

type ModuleDataset = {
  label: string,
  traineeData: Array<number>,
  heatMapData: Array<number>
};


type ModuleState = {
  isFetching: boolean,
  labels:     Array<string>,
  datasets:   Array<ModuleDataset>,
  currentModule: string
};

/*
  reducer
 */
const initialState: ModuleState = {
  isFetching: false,
  currentModule: "Module 01",
  labels:     [],
  datasets:   [],
};

//reducer

 export default function testHistory(state = initialState, action) {
 	switch (action.type) {
 		case REQUEST_MODULE_DATA:
 			return {
				...state,
				currentModule: action.module
 			};
 		default:
 			return state;
 	}
 }


export function chooseModule(_module) {
	console.log(_module);
	return {
		type: REQUEST_MODULE_DATA,
		module: _module
	}
}

 //action



// export default function fetchingModule(state = initialState, action) {
//   switch (action.type) {
//   case 'REQUEST_EARNING_GRAPH_DATA':
//     return {
//       ...state,
//       isFetching: action.isFetching,
//       time:       action.time
//     };
//   case 'RECEIVED_EARNING_GRAPH_DATA':
//     return {
//       ...state,
//       isFetching: action.isFetching,
//       labels:     action.labels,
//       datasets:   action.datasets,
//       time:       action.time
//     };
//   case 'ERROR_EARNING_GRAPH_DATA':
//     return {
//       ...state,
//       isFetching: action.isFetching,
//       time:       action.time
//     };
//   default:
//     return state;
//   }
// }


/*
  action creators


function requestfetchingModule() {
  return {
    type:       REQUEST_EARNING_GRAPH_DATA,
    isFetching: true,
    
  };
}
function receivedModuleData() {
  return {
    type:       RECEIVED_M_DATA,
    isFetching: false,
    labels:     [...data.labels],
    datasets:   [...data.datasets],
    time
  };
}
function errorEarningGraphData(error, time = moment().format()) {
  return {
    type:       ERROR_EARNING_GRAPH_DATA,
    isFetching: false,
    error,
    time
  };
}
function fetchEarningGraphData() {
  return dispatch => {
    dispatch(requestEarningGraphData());
    if (appConfig.DEV_MODE) {
      // DEV ONLY
      fetchMockEarningGraphData()
        .then(
          data => dispatch(receivedEarningGraphData(data))
        );
    } else {
      getEarningGraphData()
        .then(
          data => dispatch(receivedEarningGraphData(data))
        )
        .catch(
          error => dispatch(errorEarningGraphData(error))
        );
    }
  };
}
 */