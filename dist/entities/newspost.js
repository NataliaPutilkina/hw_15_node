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
exports.Newspost = exports.Genre = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
var Genre;
(function (Genre) {
    Genre["Politic"] = "Politic";
    Genre["Business"] = "Business";
    Genre["Sport"] = "Sport";
    Genre["Other"] = "Other";
})(Genre || (exports.Genre = Genre = {}));
let Newspost = class Newspost {
};
exports.Newspost = Newspost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Newspost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Newspost.prototype, "header", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Newspost.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Genre,
        default: Genre.Other,
    }),
    __metadata("design:type", String)
], Newspost.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Newspost.prototype, "isPrivate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Newspost.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Newspost.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.newsposts, {
        eager: false,
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)({ name: "authorId" }),
    __metadata("design:type", user_1.User)
], Newspost.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Newspost.prototype, "authorId", void 0);
exports.Newspost = Newspost = __decorate([
    (0, typeorm_1.Entity)()
], Newspost);
