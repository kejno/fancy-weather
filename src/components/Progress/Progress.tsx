import React, { FC } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import './index.scss'

interface IProps {
  size?: number
}

export const Progress: FC<IProps> = ({ size = 60 }: IProps) => (
    <div className="progress-container">
      <CircularProgress size={size} color="primary" />
    </div>
)
