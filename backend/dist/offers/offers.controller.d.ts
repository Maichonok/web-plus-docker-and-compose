import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(req: any, createOfferDto: CreateOfferDto): Promise<{}>;
    findAll(req: any): Promise<import("./entities/offer.entity").Offer[]>;
    findOne(id: string): Promise<import("./entities/offer.entity").Offer>;
}
