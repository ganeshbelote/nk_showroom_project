"use client"

import { useEffect, useState } from 'react'
import clsx from 'clsx'

type cornerType = 'square' | 'rounded' | 'pill'
type btnType = 'submit' | 'reset' | 'button'
type BgColorType =
  | 'transparent'
  | 'white'
  | 'black'
  | 'pink'
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'gray'
  | 'purple'
type ColorType =
  | 'transparent'
  | 'white'
  | 'black'
  | 'pink'
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'gray'
  | 'purple'

const bgColors: Record<BgColorType, string> = {
  transparent: 'bg-transparent',
  white: 'bg-white',
  black: 'bg-black',
  blue: 'bg-indigo-800',
  red: 'bg-red-500',
  green: 'bg-green-500',
  pink: 'bg-pink-500',
  yellow: 'bg-yellow-500',
  gray: 'bg-gray-500',
  purple: 'bg-purple-500'
}

const textColors: Record<ColorType, string> = {
  transparent: 'text-black',
  white: 'text-white',
  black: 'text-black',
  pink: 'text-pink-500',
  red: 'text-red-500',
  blue: 'text-indigo-800',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  gray: 'text-gray-500',
  purple: 'text-purple-500'
}

const ColoredBtn = ({
  Animated = false,
  Color = 'white',
  BackgroundColor = 'transparent',
  Content = 'Button',
  Type,
  Shadow,
  Border,
  Corner,
  className,
  ...rest
}: {
  Animated?: boolean
  Color?: ColorType
  BackgroundColor?: BgColorType
  Content: string
  Type?: btnType
  Shadow?: boolean
  Border?: boolean
  Corner?: cornerType
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [cornerStyle, setCorner] = useState<string>('rounded-3xl')
  const [hover, setHover] = useState<boolean>(false)

  useEffect(() => {
    switch (Corner) {
      case 'pill':
        break
      case 'rounded':
        setCorner('rounded-md')
        break
      case 'square':
        setCorner('rounded-none')
        break
    }
  }, [Corner])

  return (
    <div>
      <button
        {...rest}
        className={clsx(
          'text-nowrap relative overflow-hidden px-4 pt-2.5 pb-3 transition-all duration-600 ease-in-out cursor-pointer active:scale-95 font-medium',
          cornerStyle,
          !Animated && bgColors[BackgroundColor],
          hover ? bgColors[Color] : bgColors[BackgroundColor],
          hover ? textColors[BackgroundColor] : textColors[Color],
          Border && 'border-[1.5px]',
          className
        )}
        style={{
          boxShadow: Shadow
            ? `0 1px 8px -4px ${Color}`
            : '0 1px 8px -4px rgba(0,0,0,0.25)'
        }}
        type={Type ? Type : 'button'}
        onMouseEnter={() => {
          Animated && setHover(true)
        }}
        onMouseLeave={() => setHover(false)}
      >
        {Content}
      </button>
    </div>
  )
}

export default ColoredBtn