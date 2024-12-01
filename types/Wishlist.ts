import { UUID } from "crypto";
import { User } from "./User";
import { Experience } from "./Experience";

export interface Wishlist {
    wishlist_id: UUID;
    user: UUID;
    user_info: User;
    title: string;
}

export interface WishlistItem {
    wishlist_item_id: UUID;
    wishlist: UUID;
    experience: UUID;
    experience_info: Experience;
    date_added: Date;
}