"use client";
import React, { useCallback, useEffect } from "react";

import {
	Button,
	FieldLabel,
	TextInput,
	useField,
	useFieldProps,
	useFormFields,
} from "@payloadcms/ui";

import type { TextFieldProps } from "payload";

import { formatSlug } from "./formatSlug";
import "./index.scss";

type SlugComponentProps = {
	fieldToUse: string;
	checkboxFieldPath: string;
} & TextFieldProps;

export const SlugComponent: React.FC<SlugComponentProps> = ({
	field,
	fieldToUse,
	checkboxFieldPath: checkboxFieldPathFromProps,
}) => {
	const { label } = field;
	const { path, readOnly: readOnlyFromProps } = useFieldProps();

	const checkboxFieldPath = path.includes(".")
		? `${path}.${checkboxFieldPathFromProps}`
		: checkboxFieldPathFromProps;

	const { value, setValue } = useField<string>({ path });

	const { value: checkboxValue, setValue: setCheckboxValue } =
		useField<boolean>({
			path: checkboxFieldPath,
		});

	const fieldToUseValue = useFormFields(([fields]) => {
		return fields[fieldToUse].value as string;
	});

	useEffect(() => {
		if (checkboxValue) setValue(formatSlug(fieldToUseValue));
	}, [fieldToUseValue, checkboxValue]);

	const handleLock = useCallback(
		(e) => {
			e.preventDefault();

			setCheckboxValue(!checkboxValue);
		},
		[checkboxValue, setCheckboxValue],
	);

	const readOnly = readOnlyFromProps || checkboxValue;

	return (
		<div className="field-type slug-field-component">
			<div className="label-wrapper">
				<FieldLabel field={field} htmlFor={`field-${path}`} label={label} />

				<Button className="lock-button" buttonStyle="none" onClick={handleLock}>
					{checkboxValue ? "Unlock" : "Lock"}
				</Button>
			</div>

			<TextInput
				label={""}
				value={value}
				onChange={setValue}
				path={path}
				readOnly={readOnly}
			/>
		</div>
	);
};
