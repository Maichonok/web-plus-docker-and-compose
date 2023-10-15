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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const baseEntity_1 = require("../../utils/baseEntity");
const wish_entity_1 = require("../../wishes/entities/wish.entity");
const typeorm_1 = require("typeorm");
let Wishlist = class Wishlist extends baseEntity_1.BaseEntity {
};
exports.Wishlist = Wishlist;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Wishlist.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Wishlist.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id),
    __metadata("design:type", user_entity_1.User)
], Wishlist.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => wish_entity_1.Wish),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Wishlist.prototype, "items", void 0);
exports.Wishlist = Wishlist = __decorate([
    (0, typeorm_1.Entity)()
], Wishlist);
//# sourceMappingURL=wishlist.entity.js.map