import { Wine } from "./wine.interface";

export interface Winery {
    id: string;
    name: string;
    location: string;
    wines: Wine[];
}