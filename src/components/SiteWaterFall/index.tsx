'use client'

import { useEffect, useRef, useState } from 'react'

const getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + n.slice(0, 6)
}

const waterFallList = Array.from({ length: 100 }, () => ({
  height: getRandomNum(40, 300),
  color: randomHexColorCode(),
}))

export default function SiteWaterFall() {
  const [waterList, setWaterList] = useState<
    {
      left: number
      top: number
      height: number
      color: string
      content: any
    }[]
  >([])
  const [heightList, setHeightList] = useState<number[]>([])
  const [width, setWidth] = useState<number>(0)
  const containerRef = useRef(null)

  // 初始化
  useEffect(() => {
    const containerWidth = (containerRef.current as any).getBoundingClientRect().width
    const column = 8
    const width = containerWidth / column

    setWidth(width)

    const newWaterList = []
    const newHeightList: number[] = []

    for (let i = 0; i < waterFallList.length; i++) {
      if (i < column) {
        newWaterList.push({
          left: i * width,
          top: 0,
          height: waterFallList[i].height,
          color: waterFallList[i].color,
          content: i,
        })
        newHeightList.push(waterFallList[i].height)
      } else {
        let index = 0
        let current = newHeightList[0]

        newHeightList.forEach((h, i) => {
          if (current > h) {
            current = h
            index = i
          }
        })

        newWaterList.push({
          left: index * width,
          top: newHeightList[index],
          height: waterFallList[i].height,
          color: waterFallList[i].color,
          content: i,
        })

        newHeightList[index] = newHeightList[index] + waterFallList[i].height // 10是边距
      }
    }

    setWaterList(newWaterList)
    setHeightList(newHeightList)
  }, [containerRef])

  return (
    <div ref={containerRef} className="relative" style={{ height: Math.max(...heightList) + 'px' }}>
      {waterList.map((item, index) => (
        <div
          className="absolute px-3 pb-3"
          style={{
            left: item.left + 'px',
            top: item.top + 'px',
            width: width + 'px',
            height: item.height + 'px',
          }}
          key={index}
        >
          <div className="h-full" style={{ background: item.color }}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  )
}
