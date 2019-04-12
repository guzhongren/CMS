import React, { useState } from 'react'

const Statistic = () => {
  const [result, setResult] = useState(0)

  return (
    <div onClick={() => { setResult(result + 1) }}>{result}</div>
  )
}

export default Statistic