"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
require("winston-daily-rotate-file");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const connection_1 = __importDefault(require("../database/connection"));
const customer_routes_1 = __importDefault(require("../routes/customer.routes"));
const question_routes_1 = __importDefault(require("../routes/question.routes"));
const role_routes_1 = __importDefault(require("../routes/role.routes"));
const comment_routes_1 = __importDefault(require("../routes/comment.routes"));
const answer_routes_1 = __importDefault(require("../routes/answer.routes"));
const survey_routes_1 = __importDefault(require("../routes/survey.routes"));
const validation_routes_1 = __importDefault(require("../routes/validation.routes"));
class Server {
    constructor() {
        this.paths = {
            auth: '/api/auth',
            customer: '/api/customer',
            question: '/api/question',
            role: '/api/role',
            comment: '/api/comment',
            answer: '/api/answer',
            survey: '/api/survey',
            validation: '/api/validation'
        };
        this.limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000,
            max: 2000,
            standardHeaders: true,
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        });
        this.loggerConsole = express_winston_1.default.logger({
            transports: [
                new (winston_1.default.transports.Console)(),
                new (winston_1.default.transports.DailyRotateFile)({
                    filename: 'logs/success-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                })
            ],
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json())
        });
        this.loggerError = express_winston_1.default.errorLogger({
            transports: [
                new (winston_1.default.transports.Console)(),
                new (winston_1.default.transports.DailyRotateFile)({
                    filename: 'logs/error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                })
            ],
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json(), winston_1.default.format.timestamp({
                format: 'YYYY-MM-DD hh:mm:ss.SSS A'
            }), winston_1.default.format.align())
        });
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.databaseConnection();
        this.middlewares();
        this.routes();
    }
    databaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '100kb' }));
        this.app.use(express_1.default.static('public'));
        this.app.use((0, helmet_1.default)());
        this.app.use(this.limiter);
        this.app.use(this.loggerConsole);
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.paths.auth, auth_routes_1.default);
        this.app.use(this.paths.customer, customer_routes_1.default);
        this.app.use(this.paths.question, question_routes_1.default);
        this.app.use(this.paths.role, role_routes_1.default);
        this.app.use(this.paths.comment, comment_routes_1.default);
        this.app.use(this.paths.answer, answer_routes_1.default);
        this.app.use(this.paths.survey, survey_routes_1.default);
        this.app.use(this.paths.validation, validation_routes_1.default);
        this.app.use(this.loggerError);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`😂 Servidor corriendo en puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map