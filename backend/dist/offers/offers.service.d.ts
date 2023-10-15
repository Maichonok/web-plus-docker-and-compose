import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class OffersService {
    private readonly dataSource;
    private offersRepository;
    constructor(dataSource: DataSource, offersRepository: Repository<Offer>);
    offerIsLegit(user: User, wish: Wish, offer: CreateOfferDto): boolean;
    create(userId: any, createOfferDto: CreateOfferDto): Promise<{}>;
    findAllByUser(id: number): Promise<Offer[]>;
    findOne(id: number): Promise<Offer>;
}
