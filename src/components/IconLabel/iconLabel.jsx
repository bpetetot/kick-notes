import React from 'react'
import cn from 'classnames'

import styles from './iconLabel.module.css'

const IconLabel = ({ icon: Icon, children, size, className }) => (
  <div className={cn(styles.iconLabel, className)}>
    <div>
      <Icon size={size} />
    </div>
    <span>{children}</span>
  </div>
)

export default IconLabel
