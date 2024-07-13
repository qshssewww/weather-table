import { useTypedSelector } from "./useTypedSelector";

const useCities = () => {
	const cities = useTypedSelector(state => state.cities)

	return cities;
};

export default useCities;