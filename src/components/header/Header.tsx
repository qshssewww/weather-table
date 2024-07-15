import React, { useState, MouseEvent } from 'react';
import styles from './header.module.css'
import { useGetCityMutation, useGetCityInputQuery } from "../../store/api/api.ts"
import { IInputData } from '../../types/city.types.ts';

const Header: React.FC = () => {

	const [cityValue, setCityValue] = useState<string>('');
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

	const [getCity] = useGetCityMutation()

	const { data } = useGetCityInputQuery(cityValue, { skip: cityValue.length < 3 });


	const changeCityInput = (e: React.FormEvent<HTMLInputElement>) => {
		setCityValue(e.currentTarget.value);
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(cityValue.length >= 3 && data[0]?.name){
			setIsDropdownOpen(true);
		} else {
			setIsDropdownOpen(false);
		}
    if (event.key === 'Enter') {
			getCity(cityValue)
			setCityValue('');
			setIsDropdownOpen(false);
    }
  };

	const clickDropItem = (e: MouseEvent<HTMLDivElement>, cityName: string) => {
		e.preventDefault();
		setCityValue('');
		setIsDropdownOpen(false);
		getCity(cityName)
	}

	return (
		<header className={styles.header}>
			<div className={styles.searchContainer}>
				<h1>Weather Dashboard</h1>
				<input
					value={cityValue}
					type="text"
					placeholder="Search city..."
					onKeyDown={handleKeyDown}
					onChange={changeCityInput}
				/>
				{
					isDropdownOpen &&
					<div className={styles.dropdown}>
						{
							data?.map((city: IInputData) => {
							return (
								<div onClick={e => clickDropItem(e, city.name)} key={city.id} className={styles.dropdownItem}>
									{city.name}, {city.country}
								</div>
							)
						})
						}
				</div>
				}
			</div>
		</header>
	);
};

export default Header;