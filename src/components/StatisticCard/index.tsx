import React from 'react'
import './index.less'
interface IProps {
  title: string,
  data: number,
  backgroundColor: string,
}
const StatisticCard = (props: IProps) => {
  return(
    <div className='card' style={{backgroundColor: props.backgroundColor}}>
      <span className='title'>{props.title}</span>
      <div className='container'>
        {props.data}
      </div>
    </div>
  )
}

export default StatisticCard