import * as React from 'react'
export default ({ match }) => {
  return (
    <div>物料信息{`${match.params.detail}`}</div>
  )
}