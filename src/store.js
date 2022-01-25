import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import postsSlice from "./features/postsSlice";
import appApi from "./services/appApi";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
	user: userSlice,
	posts: postsSlice,
	[appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	blacklist: [appApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk, appApi.middleware],
});

export default store;
