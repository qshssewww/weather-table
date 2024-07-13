import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICity } from "../../types/city.types";


const initialState: ICity[] = []

export const citiesSlice = createSlice({
	name: 'cities',
	initialState,
	reducers: {
		addCity: (state, {payload: city}: PayloadAction<ICity>) => {
			state.push(city)
		},
		removeCity: (state, {payload: cityIndex}: PayloadAction<number>) => {
			state.splice(cityIndex, 1)
		}
	},
})

export const { actions, reducer } = citiesSlice