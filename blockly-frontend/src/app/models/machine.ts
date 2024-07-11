import { Error } from './error';
export interface Machine {
    id: number;
    name: string;
    errors: Error[];
}
