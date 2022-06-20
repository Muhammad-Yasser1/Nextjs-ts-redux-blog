import { useMemo } from 'react';

interface Props {
	name: string;
	type: 'input' | 'textarea';
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onBlur?: (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onFocus?: (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	rows?: number;
	inputType?: string;
	id?: string;
	label?: string;
	placeholder?: string;
	defaultValue?: string;
	customClassName?: string;
	errors: { id: string; message: string }[];
}

function Input({
	type = 'input',
	inputType = 'text',
	rows = 10,
	id,
	errors = [],
	name,
	label,
	onChange,
	onBlur = () => undefined,
	onFocus = () => undefined,
	placeholder = '',
	defaultValue = '',
	customClassName = '',
}: Props) {
	const formattedLabel = useMemo(() => {
		if (!label) {
			const firstLetter = name.charAt(0).toUpperCase();
			const restOfTheWord = name.slice(1);
			return `${firstLetter + restOfTheWord}: `;
		}
		return label;
	}, [label, name]);

	return (
		<div className='form-group Input'>
			<label htmlFor={id ?? name}>{formattedLabel}</label>
			{type === 'input' ? (
				<input
					onBlur={onBlur}
					onFocus={onFocus}
					type={inputType}
					className={`form-control ${
						errors.length ? 'form-control--invalid' : ''
					}${customClassName}`}
					name={name}
					id={id ?? name}
					placeholder={placeholder}
					onChange={onChange}
					defaultValue={defaultValue}
				/>
			) : (
				<textarea
					onBlur={onBlur}
					onFocus={onFocus}
					rows={rows}
					className={`form-control ${
						errors.length ? 'form-control--invalid' : ''
					}${customClassName}`}
					name={name}
					id={id ?? name}
					placeholder={placeholder}
					onChange={onChange}
					defaultValue={defaultValue}
				/>
			)}
			<div>
				{errors.map((error) => {
					return (
						<div key={error.id}>
							<small>{error.message}</small>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Input;
