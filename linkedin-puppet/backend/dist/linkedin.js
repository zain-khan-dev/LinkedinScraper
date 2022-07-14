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
// const puppeteer = require('puppeteer');
const puppeteer_1 = __importDefault(require("puppeteer"));
const utils_1 = require("./utils");
const user_agents_1 = __importDefault(require("user-agents"));
class LinkedinFetch {
    constructor() {
        this.login = (usernameValue, passwordValue) => __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer_1.default.launch();
            this.page = yield this.browser.newPage();
            const userAgent = new user_agents_1.default();
            console.log(userAgent.toString());
            console.log(JSON.stringify(userAgent.data, null, 2));
            yield this.page.setUserAgent(userAgent.toString());
            yield this.page.goto('https://www.linkedin.com/login');
            yield this.page.waitForSelector('#username');
            yield this.page.$eval("#username", (el, usernameValue) => el.value = usernameValue, usernameValue);
            yield this.page.$eval("#password", (el, passwordValue) => el.value = passwordValue, passwordValue);
            yield this.page.screenshot({ path: 'before_login.png' });
            yield this.page.click(".login__form_action_container");
            console.log("here");
            // await this.page.waitForNavigation();
            yield this.page.waitForTimeout(2000);
            yield this.page.screenshot({ path: 'after_login.png' });
            console.log("logged in");
        });
        this.closeBrowser = () => __awaiter(this, void 0, void 0, function* () {
            console.log("Closed");
            if (!this.browser)
                return;
            yield this.browser.close();
        });
        this.fetchInfo = (searchurl, type) => __awaiter(this, void 0, void 0, function* () {
            console.log(searchurl);
            if (!this.page) {
                console.log("Please login first");
                return;
            }
            yield this.page.goto(searchurl);
            yield this.page.screenshot({ path: 'new_click.png' });
            yield this.page.waitForSelector(".search-marvel-srp");
            yield this.page.waitForSelector(".reusable-search__entity-result-list");
            const content = yield this.page.$$(utils_1.SEARCH_DOM_NODES[type]);
            if (!this.page) {
                return;
            }
            const new_content = yield Promise.all(content.map((con) => __awaiter(this, void 0, void 0, function* () { return yield this.page.evaluate(el => el.textContent, con); })));
            console.log(new_content);
            yield this.page.screenshot({ path: 'clicks_map.png' });
            return new_content;
        });
        this.page = null;
        this.browser = null;
        this.login = this.login.bind(this);
        this.fetchInfo = this.fetchInfo.bind(this);
        this.closeBrowser = this.closeBrowser.bind(this);
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    // await page.$eval(".login__form_action_container", el=>el.click())
    // console.log("logged in")
    // await page.waitForSelector(".search-global-typeahead__input")
}))();
exports.default = LinkedinFetch;
