// const puppeteer = require('puppeteer');
import puppeteer from "puppeteer"
import {SEARCH_DOM_NODES} from "./utils"
import UserAgent from "user-agents"


class LinkedinFetch {

    page:puppeteer.Page|null
    browser:puppeteer.Browser|null
    
    
    constructor(){
        this.page = null
        this.browser = null
        this.login = this.login.bind(this)
        this.fetchInfo = this.fetchInfo.bind(this)
        this.closeBrowser = this.closeBrowser.bind(this)
    }


    login = async (usernameValue:string, passwordValue:string) => {


        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();

        const userAgent = new UserAgent();
        console.log(userAgent.toString());
        console.log(JSON.stringify(userAgent.data, null, 2));
        await this.page.setUserAgent(userAgent.toString())
 
        await this.page.goto('https://www.linkedin.com/login');

        await this.page.waitForSelector('#username')
        
        await this.page.$eval("#username", (el,usernameValue) => (el as HTMLInputElement).value=usernameValue,usernameValue)

        await this.page.$eval("#password", (el,passwordValue)=>(el as HTMLInputElement).value=passwordValue, passwordValue)

        await this.page.screenshot({ path: 'before_login.png' })

        await this.page.click(".login__form_action_container")

        console.log("here")

        // await this.page.waitForNavigation();

        await this.page.waitForTimeout(2000)

        await this.page.screenshot({ path: 'after_login.png' })

        console.log("logged in")
    }


    closeBrowser = async () => {

        
        console.log("Closed")

        if(!this.browser)
            return 
        await this.browser.close();

    }

    fetchInfo = async (searchurl:string, type:"COMPANIES"|"PEOPLE") => {


        console.log(searchurl)

        if(!this.page){
            console.log("Please login first")
            return
        }

        await this.page.goto(searchurl)
        

        await this.page.screenshot({ path: 'new_click.png' }) 

        await this.page.waitForSelector(".search-marvel-srp")


        await this.page.waitForSelector(".reusable-search__entity-result-list")


        const content = await this.page.$$(SEARCH_DOM_NODES[type])

        if(!this.page){
            return 
        }


        const new_content = await Promise.all(content.map(async (con)=>await (this.page as puppeteer.Page).evaluate(el => el.textContent, con)))


        console.log(new_content)

        await this.page.screenshot({ path: 'clicks_map.png' })

        return new_content
        
    }

}



(async () => {
    

    // await page.$eval(".login__form_action_container", el=>el.click())





    // console.log("logged in")

    // await page.waitForSelector(".search-global-typeahead__input")

})();

export default LinkedinFetch