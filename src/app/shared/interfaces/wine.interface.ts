import { Tag } from "./tag.interface";
import { WineComposition } from "./wine-composition.interface";
import { Winery } from "./winery.interface";

export interface Wine {
    id: string;
    name: string;
    years: {
        harvest: string;
        bottling: string;
    };
    price: number;
    tags: Tag[];
    available: boolean;
    createdAt: Date;
    volume: number;
    alcohol: number;
    winery: Winery;
    wineComposition: WineComposition;
}