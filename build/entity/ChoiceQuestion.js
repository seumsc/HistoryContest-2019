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
const typeorm_1 = require("typeorm");
let ChoiceQuestion = class ChoiceQuestion extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChoiceQuestion.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChoiceQuestion.prototype, "text", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChoiceQuestion.prototype, "a", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChoiceQuestion.prototype, "b", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChoiceQuestion.prototype, "c", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChoiceQuestion.prototype, "d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ChoiceQuestion.prototype, "answer", void 0);
ChoiceQuestion = __decorate([
    typeorm_1.Entity()
], ChoiceQuestion);
exports.ChoiceQuestion = ChoiceQuestion;
//# sourceMappingURL=ChoiceQuestion.js.map