import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {reducer as citiesReducer} from './cities/cities.slice.ts' 
import { api } from "./api/api"


const reducers = combineReducers({
	cities: citiesReducer,
	[api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
