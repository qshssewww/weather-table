import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger';
import {reducer as citiesReducer} from './cities/cities.slice.ts' 
import { api } from "./api/api"


const logger = createLogger({
	collapsed: true,
})

const reducers = combineReducers({
	cities: citiesReducer,
	[api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware).concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
