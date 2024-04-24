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
exports.ProjectUserController = void 0;
const common_1 = require("@nestjs/common");
const project_user_service_1 = require("./project-user.service");
const project_user_entity_1 = require("./project-user.entity");
const create_project_user_dto_1 = require("../DTOs/create-project-user.dto");
let ProjectUserController = class ProjectUserController {
    constructor(projectUserService) {
        this.projectUserService = projectUserService;
    }
    async create(createProjectUserDto) {
        return this.projectUserService.create(createProjectUserDto);
    }
    async findByStaffId(userId) {
        return this.projectUserService.findByUserId(userId);
    }
    async findByrepoId(projectId) {
        return this.projectUserService.findByprojectId(projectId);
    }
    async removeByrepoId(projectId) {
        return this.projectUserService.removeByprojectId(+projectId);
    }
    async findUsersByprojectId(projectId) {
        try {
            const members = await this.projectUserService.findByprojectId(projectId);
            const usernames = await Promise.all(members.map(async (member) => {
                const user = await this.projectUserService.findUserById(member.user_id);
                return user ? user.username : null;
            }));
            return usernames.filter((username) => username !== null);
        }
        catch (error) {
            console.error("Error fetching users by project ID:", error.message);
            throw new Error("Failed to fetch users");
        }
    }
    async findOne(userId, projectId) {
        return this.projectUserService.findOne(+userId, +projectId);
    }
    async findAll() {
        return this.projectUserService.findAll();
    }
    async update(userId, projectId, staffProjectDto) {
        return this.projectUserService.update(+userId, +projectId, staffProjectDto);
    }
    async remove(userId, projectId) {
        return this.projectUserService.remove(+userId, +projectId);
    }
    async findByUsername(username) {
        return this.projectUserService.findByUsername(username);
    }
};
exports.ProjectUserController = ProjectUserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_user_dto_1.CreateProjectUserDto]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("users/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "findByStaffId", null);
__decorate([
    (0, common_1.Get)("projects/:projectId"),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "findByrepoId", null);
__decorate([
    (0, common_1.Delete)("project/:projectId"),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "removeByrepoId", null);
__decorate([
    (0, common_1.Get)("projects/:projectId/users"),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "findUsersByprojectId", null);
__decorate([
    (0, common_1.Get)(":userId/:projectId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(":userId/:repoId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("projectId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, project_user_entity_1.UserProject]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":userId/:repoId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("repo/:username"),
    __param(0, (0, common_1.Param)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectUserController.prototype, "findByUsername", null);
exports.ProjectUserController = ProjectUserController = __decorate([
    (0, common_1.Controller)("user-project"),
    __metadata("design:paramtypes", [project_user_service_1.ProjectUserService])
], ProjectUserController);
//# sourceMappingURL=project-user.controller.js.map