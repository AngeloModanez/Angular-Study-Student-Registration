import { Author } from "./author";

export interface Book {
    id: number;
    title: string;
    nameauthor: Author;
    synopsis: string;
    date: Date;
    genre: string;
}