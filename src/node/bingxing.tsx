import LogicFlow from '@logicflow/core'
import { RectNode, RectNodeModel, BaseNodeModel } from '@logicflow/core'
const NODE_COLOR = '#000'

export const registerDownload = (lf: LogicFlow) => {
    lf.register('diamond-b', ({PolygonNode, PolygonNodeModel, h}) => {
        class View extends PolygonNode{
            getIconShape () {
                const {width, height, properties: {lineColor}} = this.getAttributes()
                const iconHeight = 30
                return  h(
                    'svg',
                        {
                            x: (width - iconHeight) / 2,
                            y: (width - iconHeight) / 2, 
                            viewBox:"0 0 1027 1024",
                            width: iconHeight,
                            height: iconHeight,
                        },
                    h(
                        'path',
                        {
                            stroke: 'purple',
                            fill: lineColor || NODE_COLOR,
                            d: "M865.72687752 474.25069304h-320.7593876v-311.18469631c0-14.36237715-14.36237715-33.51218498-33.51218498-33.51218498-19.14980785 0-33.51218498 19.14980785-33.51218498 38.29961567v311.18469632H166.75740297c-19.14980785-4.78745622-38.29961567 14.36237715-38.29961568 33.51218498s19.14980785 33.51218498 33.51218499 33.51218498h311.18469632v311.18469632c4.78745622 19.14980785 19.14980785 38.29961567 38.29961567 38.29961568s33.51218498-19.14980785 33.51218498-33.51218498v-315.97246724h315.97246725c19.14980785 0 33.51218498-19.14980785 33.51218498-33.51218498s-9.57494645-38.29961567-28.7247543-38.29961567Z"
                        }
                    )
                )
            }
            getShape () {
                    const attributes = this.getAttributes()
                    const {
                      width,
                      height,
                      x,
                      y,
                      fill,
                      fillOpacity,
                      strokeWidth,
                      stroke,
                      strokeOpacity,
                      points,
                      properties: {lineColor, fillColor}
                    } = attributes
                    const transform = `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`
                    const pointsPath = points.map(point => point.join(',')).join(' ')
                    return h(
                      'g',
                      {
                        transform
                      },
                      [
                        h(
                          'polygon',
                          {
                            points: pointsPath,
                            fill: fillColor || fill,
                            stroke: lineColor || stroke,
                            strokeWidth,
                            strokeOpacity,
                            fillOpacity
                          }
                        ),
                        this.getIconShape()
                      ]
                    )
                  }
                
        }
        class Model extends PolygonNodeModel{
            constructor (data: any, graphModel: any) {
                data.text = {
                  value: (data.text && data.text.value) || '',
                  x: data.x,
                  y: data.y + 60
                }
                super(data, graphModel)
                //  修改菱形大小
                const lenght = 50
                this.points = [
                  [lenght, 0],
                  [lenght * 2, lenght],
                  [lenght, lenght * 2],
                  [0, lenght]
                ]
                this.stroke = NODE_COLOR
              }
        }
        return {
            view: View,
            model: Model
        }
    })
}
