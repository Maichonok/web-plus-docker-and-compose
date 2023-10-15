import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { DataSource, Repository } from 'typeorm';
export declare class WishesService {
    private readonly dataSource;
    private wishesRepository;
    constructor(dataSource: DataSource, wishesRepository: Repository<Wish>);
    create(id: any, createWishDto: CreateWishDto): Promise<{
        owner: any;
        copied: number;
        raised: number;
        name: string;
        image: string;
        link: string;
        price: number;
        description: string;
    } & Wish>;
    findLatest(): Promise<Wish[]>;
    findPopular(): Promise<Wish[]>;
    findOne(id: number): Promise<Wish>;
    update(userId: number, id: number, updateWishDto: UpdateWishDto): Promise<{}>;
    remove(userId: number, id: number): Promise<Wish>;
    copy(userId: any, id: number): Promise<{}>;
}
