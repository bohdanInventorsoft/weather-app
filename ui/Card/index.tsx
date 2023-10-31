import { ComponentType } from 'react'

export type CardVariantsI = 'grey1' | 'tertiaryAqua' | 'darkgrey'

const VARIANTS: { [variant in CardVariantsI]: string } = {
  grey1: 'bg-grey1',
  darkgrey: 'bg-darkgrey',
  tertiaryAqua: 'bg-tertiaryAqua border border-grey1',
}

interface CardI {
  children: React.ReactNode
  className?: string
  variant?: CardVariantsI
  borderRadius?: string
  onClick?: (event: any) => void
  as?: ComponentType | keyof JSX.IntrinsicElements
  id?: string
  style?: React.CSSProperties
}
const Card = ({
  children,
  className = '',
  variant = 'grey1',
  borderRadius = 'rounded-xl',
  onClick,
  id = '',
  as = 'div',
  style,
}: CardI) => {
  const Tag = as

  return (
    <Tag className={`${className} ${VARIANTS[variant]} ${borderRadius}`} id={id} onClick={onClick} style={style}>
      {children}
    </Tag>
  )
}

export default Card
