import React from 'react'
import cn from 'classnames'

import styles from './iconLabel.module.css'

const IconLabel = ({ icon: Icon, children, size, className }) => (
  <div className={cn(styles.iconLabel, className)}>
    <Icon size={size} />
    <span>{children}</span>
  </div>
)

export default IconLabel
