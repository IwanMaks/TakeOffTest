import { MouseEvent } from "react";

export interface IAppButtonProps {
    className?: string,
    text: string,
    onClick: (e: MouseEvent<HTMLDivElement>) => void
}