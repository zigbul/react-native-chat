const SET_USER = "SET_USER";
const SET_LOGIN = "SET_LOGIN";

const initialState = {
   currentUser: null,
   isLogin: false,
}

export const reducer = (state = initialState, action) => {
   switch(action.type) {
      case SET_USER:
         return {...state, currentUser: action.payload};
      case SET_LOGIN:
         return {...state, isLogin: action.payload};
      default: 
         return state;
   }
}

export const setUser = (payload) => ({type: SET_USER, payload});
export const setLogin = (payload) => ({type: SET_LOGIN, payload});