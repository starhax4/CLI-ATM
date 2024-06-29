#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";



let pin:number = 1234;
let balance = 10000;
let remainingBalance = balance; 

async function login() {
    const answer = await inquirer.prompt([
        {message:"Enter your Pin :",type:"password",name:"userPin"}
    ])
    return answer.userPin
}




async function checkPassword(upin?:number){
    if(upin == pin){
        return true
    }
    else{
        console.log(chalk.red("wrong pin code!"));
        const answer = await inquirer.prompt({message:"choose an option",type:"list",choices:["1.retry","2.exit"],name:"option"})
        if(answer.option=="1.retry"){

            let againPin = await login()
            if(againPin == pin){
                return true
            }
            else{
                let pin = await login()
                await checkPassword(pin)
                
            }
        }
        else{
            
        }
        
    }
}



async function mainMenu() {
    console.log(chalk.greenBright("ATM"));
    // console.log(chalk.greenBright(`Current Balance : ${remainingBalance}`));
    const answer = await inquirer.prompt([
        {message:"Choose an operation to perform :",type:"list",choices:["Withdraw Money","check Balance","Exit"], name:"choice"}
    ])
    if(answer.choice=="Withdraw Money"){
        withdraw()
    }
    else if(answer.choice=="check Balance"){
        checkBalance()
    }
    
    
}

async function userPrompt() {
    const answer = await inquirer.prompt({message:"Choose an option :",type:"list",name:"option",choices:["1.go to main menu.","2.exit"]})
    if(answer.option=="1.go to main menu."){
        await mainMenu()
    }else{

    }
}

async function withdraw(){
    const answer = await inquirer.prompt({message:"Enter the Amount:",type:"number",name:"amount"})
    let amount = answer.amount
    let pin = await login()
    let access = await checkPassword(pin)
    if(access){

        if(amount<=remainingBalance){

            remainingBalance = balance - amount
            console.log(chalk.green(`Withdraw successfull! Remaining Balance : ${remainingBalance}`));
            userPrompt()
        }
        else{
            console.log(chalk.red(`Insufficient Balance! maximum withdraw amount:${remainingBalance}`));   
            userPrompt()      
        }
    }
    else{
        console.log("Wrong credintials, try again!");
        await withdraw()
    }


}

function checkBalance(){
console.log(chalk.green.bgBlue(`Remaining Balance : ${remainingBalance}`));
userPrompt()

}


let uPin = await login()
let access = await checkPassword(uPin)
if(access){
    mainMenu()
}


