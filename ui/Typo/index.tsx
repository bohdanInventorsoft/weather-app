import React, { ElementType } from 'react'

type COLOR = 'white' | 'grey'

export type TYPO_WEIGHTS = 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'

const FONT_WEIGHTS: { [variant in TYPO_WEIGHTS]: string } = {
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

const TYPO_VARIANTS: { [variant in COLOR]: string } = {
  white: 'dark:text-white',
  grey: 'dark:text-grey',
}

interface BaseTypoI {
  children: React.ReactNode
  as?: ElementType
  className?: string
  weight?: TYPO_WEIGHTS
  variant: COLOR
  onClick?: any
}
const Typo = ({ children, as = 'p', className = '', variant, weight, ...props }: BaseTypoI) => {
  const Tag = as
  return (
    <Tag className={`${TYPO_VARIANTS[variant]} ${weight ? FONT_WEIGHTS[weight] : ''} ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default Typo
