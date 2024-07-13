import React, { useState } from 'react';
import styles from './header.module.css'
import { useGetCityMutation } from "../../store/api/api.ts"

const Header: React.FC = () => {

	const [cityValue, setCityValue] = useState<string>('');

	const [getCity] = useGetCityMutation()

	const changeCityInput = (e: React.FormEvent<HTMLInputElement>) => {
		setCityValue(e.currentTarget.value);
	}
	
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
			getCity(cityValue)
			setCityValue('');
    }
  };

	return (
		<header className={styles.header}>
			<h1>Weather Dashboard</h1>
      <input
				value={cityValue}
        type="text"
        placeholder="Search city..."
				onKeyDown={handleKeyDown}
				onChange={changeCityInput}
      />
		</header>
	);
};

export default Header;