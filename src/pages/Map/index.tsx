import * as React from 'react'
// import Draggable from 'react-draggable'
import MaptalksCom from '@components/mapComponents/MaptalksCom'
import './index.less'

interface IState {
  hasMapLoaded?: boolean,
  // toolArr?: ITool[], // 工具条显示配置
  layerContainerVisible: boolean // 图层控制窗口显示状态控制
}

interface IProps {
  test?: string
}

export default class Map extends React.Component<IProps, IState> {
  map: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      hasMapLoaded: false,
      layerContainerVisible: false,
    }
  }

  /**
   * 获取创建的地图
   *
   * @param {*} map 返回的地图对象
   * @memberof Map
   */
  getMap = (map) => {
    this.map = map
    this.setState({
      hasMapLoaded: true
    })
  }

  render() {
    const mapOption = {
      center: [108.93, 34.27],
      zoom: 10,
      scaleControl: {
        'maxWidth': 100,
        'metric': true,
        // 'containerClass': 'scaleControl'
      }
    }
    return (
      <div className= 'MapInstance' >
        <MaptalksCom className='maptalksContainer' mapOptions={mapOption} onCreate={this.getMap} />
      </div >
    )
  }
}
