import { cn } from '@utils'
import * as React from 'react'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

// TODO: Finish it
export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-valid outline-0 disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
FormInput.displayName = 'FormInput'
