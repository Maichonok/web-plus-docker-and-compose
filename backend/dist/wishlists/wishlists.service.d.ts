import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wishlist } from './entities/wishlist.entity';
export declare class WishlistsService {
    private wishlistRepository;
    private usersRepository;
    constructor(wishlistRepository: Repository<Wishlist>, usersRepository: Repository<User>);
    create(userId: any, createWishlistDto: CreateWishlistDto): Promise<Wishlist>;
    findAll(id: number): Promise<Wishlist[]>;
    findOne(id: number): Promise<Wishlist>;
    update(userId: any, id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist>;
    remove(userId: any, id: number): Promise<Wishlist>;
}
