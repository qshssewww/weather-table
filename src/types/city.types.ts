export interface IInputData{
	id: number,
	name: string,
	region: string,
	country: string,
	lat: number,
	lon: number,
	url: string
}


export interface ICity{
	name: string 
	country: string
	temp_c: number
	condition: {
		text: string
		icon: string
	},
	humidity: number
	wind_mph: number
}

export interface ICityResponseLocation{
	name: string
	country: string
}
export interface ICityResponseCurrent{
	temp_c: number
	condition: {
		text: string
		icon: string
	}
	humidity: number
	wind_mph: number
}
