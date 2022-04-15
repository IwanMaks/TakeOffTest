import { ChangeEvent } from "react";

export interface IAppInputProps {
    type: 'text' | 'password',
    placeholder: string,
    id: string,
    label: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}