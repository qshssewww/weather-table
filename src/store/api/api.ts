import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {ICityResponseLocation, ICityResponseCurrent, ICity, IInputData} from '../../types/city.types'
import {actions} from '../cities/cities.slice.ts'




const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=`

const searchUrl = `http://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=`

interface IData {
	location: ICityResponseLocation,
	current: ICityResponseCurrent,
}




export const api = createApi({ 
	reducerPath: 'api',
	tagTypes: ['City'],
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders: (headers) => {
      headers.set('origin', window.location.origin);
      headers.set('x-requested-with', 'XMLHttpRequest');
      return headers;
    },
	}),
	endpoints: build => ({
		getCity: build.mutation<IData, string>({
			queryFn: async (arg: string, { dispatch }: {dispatch: any}, _, baseQuery) => {
				try{
					const response = await baseQuery({
            url: `${arg}&aqi=no`,
            method: 'GET',
          });
					const data: ICity = {
						name: response.data.location.name,
						country: response.data.location.country,
						temp_c: response.data.current.temp_c,
						humidity: response.data.current.humidity,
						condition: {
							text: response.data.current.condition.text,
							icon: response.data.current.condition.icon,
						},
						wind_mph: response.data.current.wind_mph,
					}
					dispatch(actions.addCity(data));
				} catch {
					return { error: { status: 'CUSTOM_ERROR', data: 'Something went wrong' } }
				}
			}
	}),
	getCityInput: build.query<Array<IInputData>, string>({
		queryFn: async (arg: string, d, _, baseQuery) => {
			try{
				const response = await baseQuery({
					url: searchUrl+arg,
					method: 'GET',
				});
				return response
			} catch {
				return { error: { status: 'CUSTOM_ERROR', data: 'Something went wrong' } }
			}
		}
		}
	)
})
})

export const { useGetCityMutation, useGetCityInputQuery } = api;