import React from 'react';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

export type ArrowButtonProps = {
  isOpen: boolean;
  handleClick: () => void;
};

 export const ArrowButton: React.FC<ArrowButtonProps> = ({ isOpen, handleClick }) => {
  return (
    <div
      role='button'
      aria-label={`${isOpen ? 'Закрыть' : 'Открыть'} форму параметров статьи`}
      tabIndex={0}
      className={clsx(styles.container, isOpen && styles.container_open)}
      onClick={handleClick}
    >
      <img src={require('src/images/arrow.svg').default} alt='иконка стрелочки' className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })} />
    </div>
  );
};

export default ArrowButton;
