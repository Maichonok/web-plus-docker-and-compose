import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    create(req: any, createWishDto: CreateWishDto): Promise<{}>;
    findLast(): Promise<import("./entities/wish.entity").Wish[]>;
    findTop(): Promise<import("./entities/wish.entity").Wish[]>;
    findOne(id: string): Promise<import("./entities/wish.entity").Wish>;
    update(req: any, id: string, updateWishDto: UpdateWishDto): Promise<{}>;
    remove(id: string, req: any): Promise<import("./entities/wish.entity").Wish>;
    copy(req: any, id: string): Promise<{}>;
}
