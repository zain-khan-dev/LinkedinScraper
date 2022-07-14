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
const linkedin_1 = __importDefault(require("./linkedin"));
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const linkedin = new linkedin_1.default();
app.use(express_1.default.urlencoded({ "extended": false }));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(req.body);
    console.log(username, password);
    try {
        yield linkedin.login(username, password);
    }
    catch (_a) {
        return res.status(401).send("Failed to authenticate");
    }
    return res.send("Logged In");
}));
app.post("/fetchCompany", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.body;
    const info = yield linkedin.fetchInfo((0, utils_1.buildURL)("COMPANIES", keyword), "COMPANIES");
    res.json({ "result": info });
}));
app.post("/fetchPerson", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.body;
    const info = yield linkedin.fetchInfo((0, utils_1.buildURL)("PEOPLE", keyword), "PEOPLE");
    return res.json({ "result": info });
}));
app.get("/close", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    linkedin.closeBrowser();
}));
app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`);
});
