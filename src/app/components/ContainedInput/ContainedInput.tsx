import { Select, TextInput } from '@mantine/core';
import classes from './ContainedInput.module.css';

interface ContainedInputProps {
    label: string;
    placeholder: string;
}

export function ContainedInput({label, placeholder}:ContainedInputProps) {
  return (<TextInput label={label} placeholder={placeholder} classNames={classes} />);
}