// import axios from 'axios';

const types = {
  UPDATE_YEAR: 'UPDATE_YEAR',
  UPDATE_START_MONTH: 'UPDATE_START_MONTH',
  UPDATE_END_MONTH: 'UPDATE_END_MONTH',
  UPDATE_REQUEST_TYPE: 'UPDATE_REQUEST_TYPE',
  UPDATE_NEIGHBORHOOD_COUNCIL: 'UPDATE_NEIGHBORHOOD_COUNCIL',
};

export const updateYear = (year) => ({
  type: types.UPDATE_YEAR,
  payload: year,
});

export const updateStartMonth = (startMonth) => ({
  type: types.UPDATE_START_MONTH,
  payload: startMonth,
});

export const updateEndMonth = (endMonth) => ({
  type: types.UPDATE_END_MONTH,
  payload: endMonth,
});

export const updateRequestType = (requestType) => ({
  type: types.UPDATE_REQUEST_TYPE,
  payload: requestType,
});

export const updateNeighborhoodCouncil = (council) => ({
  type: types.UPDATE_NEIGHBORHOOD_COUNCIL,
  payload: council,
});

const initialState = {
  year: '2015',
  startMonth: '1',
  endMonth: '12',
  requestType: 'Bulky Items',
  council: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_YEAR:
      return {
        ...state,
        year: action.payload,
      };
    case types.UPDATE_START_MONTH:
      return {
        ...state,
        startMonth: action.payload,
      };
    case types.UPDATE_END_MONTH:
      return {
        ...state,
        endMonth: action.payload,
      };
    case types.UPDATE_REQUEST_TYPE:
      return {
        ...state,
        requestType: action.payload,
      };
    case types.UPDATE_NEIGHBORHOOD_COUNCIL:
      return {
        ...state,
        council: action.payload,
      };
    default:
      return state;
  }
};
