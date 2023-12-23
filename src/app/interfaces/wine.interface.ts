import { WineComposition } from "./wine-composition.interface";
import { Winery } from "./winery.interface";

export interface Wine {
    id: string;
    name: string;
    year: number;
    date: Date;
    price: number;
    isAvailable: boolean;
    winery: Winery;
    wineComposition: WineComposition;
}