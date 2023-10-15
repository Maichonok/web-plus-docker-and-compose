"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const wish_entity_1 = require("../wishes/entities/wish.entity");
let OffersService = class OffersService {
    constructor(dataSource, offersRepository) {
        this.dataSource = dataSource;
        this.offersRepository = offersRepository;
    }
    offerIsLegit(user, wish, offer) {
        if (!wish)
            throw new common_1.NotFoundException('Виш не найден.');
        if (wish.owner.id === user.id)
            throw new common_1.BadRequestException('Нельзя скинуться на собственный виш.');
        if (Number(wish.raised) + Number(offer.amount) > wish.price) {
            throw new common_1.BadRequestException('Сумма превышает стоимость виша.');
        }
        return true;
    }
    async create(userId, createOfferDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        const user = await queryRunner.manager.findOneBy(user_entity_1.User, { id: userId });
        const wish = await queryRunner.manager.findOne(wish_entity_1.Wish, {
            where: { id: createOfferDto.itemId },
            relations: { owner: true },
        });
        if (this.offerIsLegit(user, wish, createOfferDto)) {
            const newOffer = new wish_entity_1.Wish();
            Object.assign(newOffer, { ...createOfferDto, user, item: wish });
            await queryRunner.startTransaction();
            try {
                await queryRunner.manager.save(wish_entity_1.Wish, {
                    ...wish,
                    raised: Number(wish.raised) + Number(createOfferDto.amount),
                });
                await queryRunner.manager.save(offer_entity_1.Offer, newOffer);
                await queryRunner.commitTransaction();
                return {};
            }
            catch (err) {
                await queryRunner.rollbackTransaction();
                throw new common_1.InternalServerErrorException('Внутренняя ошибка сервера.');
            }
            finally {
                await queryRunner.release();
            }
        }
    }
    findAllByUser(id) {
        return this.offersRepository.find({
            relations: ['user', 'item', 'item.owner'],
            where: {
                user: {
                    id: id,
                },
            },
        });
    }
    findOne(id) {
        return this.offersRepository.findOne({
            relations: ['user', 'item', 'item.owner'],
            where: { id },
        });
    }
};
exports.OffersService = OffersService;
exports.OffersService = OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], OffersService);
//# sourceMappingURL=offers.service.js.map