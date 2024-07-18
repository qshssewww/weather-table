import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IData, ICity, IInputData} from '../../types/city.types'
import {actions} from '../cities/cities.slice.ts'




const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=`

const searchUrl = `http://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=`



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
			queryFn: async (arg, { dispatch }, _, baseQuery)=> {
					const response = await baseQuery({
            url: `${arg}&aqi=no`,
            method: 'GET',
          });

					const responseData = response.data as IData;
					
					const data: ICity = {
						name: responseData.location.name,
						country: responseData.location.country,
						temp_c: responseData.current.temp_c,
						humidity: responseData.current.humidity,
						condition: {
							text: responseData.current.condition.text,
							icon: responseData.current.condition.icon,
						},
						wind_mph: responseData.current.wind_mph,
					}
					dispatch(actions.addCity(data));
					return {data: responseData}
			}
	}),
	getCityInput: build.query<IInputData[], string>({
		queryFn: async (arg, _api, _extraOptions, baseQuery) => {
				const response = await baseQuery({
					url: searchUrl+arg,
					method: 'GET',
				});
				return { data: response.data as IInputData[] };
		}
		}
	)
})
})

export const { useGetCityMutation, useGetCityInputQuery } = api;