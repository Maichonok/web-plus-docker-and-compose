import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/utils/baseEntity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Wishlist extends BaseEntity {
    name: string;
    image: string;
    owner: User;
    items: Wish[];
}
