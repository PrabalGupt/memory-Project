// IMPORTANT => WE USE DISPATCH FUNCTION TO DISPATCH DATA TO REDUCER


import { combineReducers } from "redux";

import posts from './posts'
import auth from './auth'


export default combineReducers({ posts, auth });