import React, { useState } from 'react'
import cn from 'classnames'

import styles from './switch.module.css'

const Switch = ({
  name,
  label,
  defaultChecked,
  onChange,
  className,
  ...rest
}) => {
  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = e => {
    const { checked } = e.target
    setChecked(checked)
    if (onChange) onChange(checked)
  }

  return (
    <label className={cn(styles.wrapper, className)} htmlFor={name}>
      <div className={styles.switch}>
        <input
          {...rest}
          id={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className={styles.switchItem} />
      </div>
      {label && <div className={styles.label}>{label}</div>}
    </label>
  )
}

Switch.defaultProps = {
  name: 'switch',
  defaultChecked: false,
}

export default Switch
