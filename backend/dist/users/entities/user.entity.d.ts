import { Offer } from 'src/offers/entities/offer.entity';
import { BaseEntity } from 'src/utils/baseEntity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
export declare class User extends BaseEntity {
    username: string;
    about: string;
    avatar: string;
    email: string;
    password: string;
    wish: Wish[];
    offer: Offer[];
    wishlist: Wishlist[];
}
