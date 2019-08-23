import React from 'react'
import cn from 'classnames'

import styles from './loading.module.css'

const Loading = ({ viewport }) => (
  <div className={cn(styles.wrapper, { [styles.viewport]: viewport })}>
    <div className={styles.grid}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)

export default Loading
