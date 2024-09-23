import {  } from 'dotenv/config';
import { env } from 'node:process';

exports.LoginPage = class LoginPage {

    /**
    * @param {import {  } from "plawright/test";} page
    * @param {import {  } from 'dotenv/config';}
    * @param {import { env } from 'node:process';}
    */

constructor(page){
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
}

async navigateToLogin(){
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded')
}

async login (){
    const username = process.env.USER;
    const password = process.env.PASSWORD;

    // console.log(username);
    // console.log(password);
    if (!username || !password) {
        throw new Error('Environment variables USERNAME and PASSWORD must be defined');
      }

    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
}

};


