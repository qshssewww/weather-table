import styles from './weatherCard.module.css'
import {ICity} from '../../types/city.types'

interface ICityCard{
	city: ICity
}

const WeatherCard = ({ city }: ICityCard) => {
	return (
		<div className={styles.weatherCard}>
			<h2>{city?.name}</h2>
			<h3>{city?.country}</h3>
			<p className={styles.temperature}>{city?.temp_c}°C</p>
			<p className={styles.description}>{city?.condition.text}</p>
			<p className={styles.details}>Humidity: {city?.humidity}%</p>
			<p className={styles.details}>Wind: {city?.wind_mph} mp/h</p>
	</div>
	);
};

export default WeatherCard;