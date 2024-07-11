import { Machine } from "./machine";

export interface Category {
    id: number;
    name: string;
    machine: Machine[];
}
