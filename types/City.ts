import { UUID } from "crypto";

export interface City {
    city_id: UUID;
    name: string;
    region: string;
    country: string;
}