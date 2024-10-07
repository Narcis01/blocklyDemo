import { ErrorMachine } from './errorMachine';
export interface Machine {
    id: number;
    name: string;
    errors: ErrorMachine[];
}
