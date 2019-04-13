import React, { useState, useEffect } from 'react'
import './index.less'
import AdminAPI from '@api/Admin'
import StatisticCard from '@components/StatisticCard'
interface IData {
  userCount: number,
  materialCount: number,
  price: number,
  personalCount: number
}
const Statistic = () => {
  const [data, setData] = useState({userCount: 0, materialCount: 0, price: 0, personalCount: 0})
  useEffect( () => {
    AdminAPI.System.statistic().then((result: IData) => {
      setData(result)
      
    })
  }, [data.materialCount])

  return (
    <div className='cardContainer'>
      <StatisticCard title='成员' backgroundColor={'#006400'} data={data.userCount} />
      <StatisticCard title='物料' backgroundColor={'#FFAD25'} data={data.materialCount} />
      <StatisticCard title='金额' backgroundColor={'#2DB9FF'} data={data.price} />
      <StatisticCard title='个人物料' backgroundColor={'#FF6D58'} data={data.personalCount} />
    </div>
  )
}

export default Statistic