import React, { useState, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

interface ArticleParamsForm {
	date: ArticleStateType;
	setDate: (date: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ date, setDate }: ArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [formState, setFormState] = useState(date);

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	// const closeForm = () => {
	// 	setIsOpen(false)
	// }

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const handleOptionChange =
		(optionType: keyof ArticleStateType) => (selected: OptionType) => {
			setFormState((prevState) => ({
				...prevState,
				[optionType]: selected,
			}));
		};

	function handleReset() {
		setFormState(defaultArticleState);
		setDate(defaultArticleState);
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setDate(formState);
	}

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} handleClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text weight={800} uppercase={true} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleOptionChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleOptionChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleOptionChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleOptionChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleOptionChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
