import React from 'react';
import styles from './ButtonCustom.module.scss';
import clsx from 'clsx';
const ButtonCustom = ({ size = 'normal', error, children, ...props }) => {
  return (
    <button class={clsx(styles.btn, size === 'large' && styles.large, error && styles.error)} {...props}>
      {children}
    </button>
  );
};

export default ButtonCustom;
