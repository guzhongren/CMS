import * as React from 'react'
export default ({match}) => {
  console.log('test', match)
  return (
    <div>用户信息{`${match.params.detail}`}</div>
  )
}