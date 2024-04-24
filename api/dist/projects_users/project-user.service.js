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
exports.ProjectUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_user_entity_1 = require("./project-user.entity");
let ProjectUserService = class ProjectUserService {
    findByUsername(username) {
        throw new Error("Method not implemented.");
    }
    findByrepoId(projectId) {
        throw new Error("Method not implemented.");
    }
    constructor(projectUserRepository) {
        this.projectUserRepository = projectUserRepository;
    }
    async create(createProjectUserDto) {
        const UserProject = this.projectUserRepository.create(createProjectUserDto);
        return this.projectUserRepository.save(UserProject);
    }
    async findAll() {
        return this.projectUserRepository.find();
    }
    async findOne(userId, projectId) {
        return this.projectUserRepository.findOne({ where: { user_id: userId, project_id: projectId } });
    }
    async findByUserId(userId) {
        return this.projectUserRepository.find({ where: { user_id: userId } });
    }
    async findByprojectId(projectId) {
        return this.projectUserRepository.find({ where: { project_id: projectId } });
    }
    async update(userId, projectId, createProjectUserDto) {
        await this.projectUserRepository.update({ user_id: userId, project_id: projectId }, createProjectUserDto);
        return this.findOne(userId, projectId);
    }
    async remove(userId, projectId) {
        await this.projectUserRepository.delete({ user_id: userId, project_id: projectId });
    }
    async removeByprojectId(projectId) {
        await this.projectUserRepository.delete({ project_id: projectId });
    }
    async findUserById(userId) {
        const user = await this.projectUserRepository.query(`SELECT username FROM staff WHERE staff_id = $1`, [userId]);
        return user[0] || null;
    }
};
exports.ProjectUserService = ProjectUserService;
exports.ProjectUserService = ProjectUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_user_entity_1.UserProject)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectUserService);
//# sourceMappingURL=project-user.service.js.map