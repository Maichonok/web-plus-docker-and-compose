import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/utils/baseEntity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Offer extends BaseEntity {
    user: User;
    item: Wish;
    amount: number;
    hidden: boolean;
}
