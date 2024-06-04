import { Author } from "./author";

export interface Book {
    id: number;
    title: string;
    author: Author;
    synopsis: string;
    date: Date;
    genre: string;
}