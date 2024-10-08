'use client'
import type React from 'react'
import { useCallback, useEffect } from 'react'

import {
	Button,
	FieldLabel,
	TextInput,
	useField,
	useFieldProps,
	useFormFields,
} from '@payloadcms/ui'

import { formatSlug } from './formatSlug'
import './index.scss'
import type { TextFieldClientProps } from 'payload'

type SlugComponentProps = {
	fieldToUse: string
	checkboxFieldPath: string
} & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = ({
	field,
	fieldToUse,
	checkboxFieldPath: checkboxFieldPathFromProps,
}) => {
	const { label } = field
	const { path, readOnly: readOnlyFromProps } = useFieldProps()

	const checkboxFieldPath = path.includes('.')
		? `${path}.${checkboxFieldPathFromProps}`
		: checkboxFieldPathFromProps

	const { value, setValue } = useField<string>({ path })

	const { value: checkboxValue, setValue: setCheckboxValue } =
		useField<boolean>({
			path: checkboxFieldPath,
		})

	const fieldToUseValue = useFormFields(([fields]) => {
		return fields[fieldToUse]?.value as string
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (checkboxValue) setValue(formatSlug(fieldToUseValue))
	}, [fieldToUseValue, checkboxValue])

	const handleLock = useCallback(
		(e) => {
			e.preventDefault()

			setCheckboxValue(!checkboxValue)
		},
		[checkboxValue, setCheckboxValue],
	)

	const readOnly = readOnlyFromProps || checkboxValue

	return (
		<div className='field-type slug-field-component'>
			<div className='label-wrapper'>
				<FieldLabel field={field} htmlFor={`field-${path}`} label={label} />

				<Button className='lock-button' buttonStyle='none' onClick={handleLock}>
					{checkboxValue ? 'Unlock' : 'Lock'}
				</Button>
			</div>

			<TextInput
				label={''}
				value={value}
				onChange={setValue}
				path={path}
				readOnly={readOnly}
			/>
		</div>
	)
}
