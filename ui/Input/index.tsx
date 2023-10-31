import { HTMLInputTypeAttribute, InputHTMLAttributes, memo } from 'react'

type INPUT_COLORS = 'primary'

type INPUT_SIZES = 'lg'

const COLORS = {
  primary: `bg-[#080e12] border border-[#5c6063]`,
}

const SIZES = {
  lg: 'h-10 text-lg px-3', //48px + 18px
}

interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: React.Dispatch<any>
  name: string
  className?: string
  variant: INPUT_COLORS
  inputSize?: INPUT_SIZES
  ref?: React.Ref<any>
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value?: string | number
  disabled?: boolean
  id?: string
  inputClasses?: string
}

export const Input = memo(function Input({
  className,
  inputClasses,
  inputSize = 'lg',
  variant = 'primary',
  ...props
}: InputTypes) {
  return (
    <div
      className={`flex items-center gap-2 focus:outline-none ${COLORS[variant]} ${SIZES[inputSize]}  ${className} `}
      role="textbox"
      tabIndex={1}
    >
      <input className={`h-full w-full bg-transparent outline-none ${inputClasses}`} type={props.type} {...props} />
    </div>
  )
})
