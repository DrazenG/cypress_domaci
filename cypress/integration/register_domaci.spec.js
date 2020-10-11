// Napomena: napravljeno na bazi koda koji je radjen na casu i koji je radjen za prethodni domaci. 
//Stavljeni su u isti folder kako bi se videla razlika izmedju izvornog koda i novog sa naprednijim funkcijama poput Locators, i sl.

/// <reference types="Cypress" />
const Locators = require("../fixtures/Locators.json")


describe("testovi za register",()=>{  


    let correctEmail = "apple@aaa.com"
    let correctPassword = "12345678"
    let confirmPassword = "12345678"
    let invalidEmailFirst = "apis@aaa.com"
    let invalidEmailSecond = "apple aaa.com"
    let invalidEmailThird = "apple@aa?a.com"
   
    
    beforeEach("visit link",()=>{
        cy.visit("/")   //posle ovog mozemo da brisemo sve linkove ka bazicnoj stranici galerije... Valjda :D
    })

    it("Visit register page",()=>{
        cy.get(Locators.Header.Register).eq(2).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Header.Register).should("be.visible")
    })

    it("create user with existing email", ()=>{
        cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Registration.FirstName).type("Drazen")
        cy.get(Locators.Registration.LastName).type("Gajic")
        cy.get(Locators.Registration.Email).type(invalidEmailFirst)
        cy.get(Locators.Registration.Password).type(correctPassword)
        cy.get(Locators.Registration.ConfirmPassword).type(confirmPassword)
        cy.get(Locators.Registration.CheckBox).click()
        cy.get(Locators.Registration.Email).should("be.visible")
        cy.get(Locators.Registration.Submit).click()
        cy.get(".alert").should("be.visible").and("have.text", "The email has already been taken.")
        
    })

    it("create user with wrong email format", ()=>{
        cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Registration.FirstName).type("Drazen")
        cy.get(Locators.Registration.LastName).type("Gajic")
        cy.get(Locators.Registration.Email).type(invalidEmailSecond)
        cy.get(Locators.Registration.Password).type(correctPassword)
        cy.get(Locators.Registration.ConfirmPassword).type(confirmPassword)
        cy.get(Locators.Registration.CheckBox).click()
        cy.get(Locators.Registration.Submit).click()
        cy.get(Locators.Registration.Email).should("be.visible")
        cy.get(Locators.Registration.Email).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please enter an email address.")
        })
    })   

    it("create user without first name", ()=>{
        cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Registration.LastName).type("Gajic")
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Registration.Password).type(correctPassword)
        cy.get(Locators.Registration.ConfirmPassword).type(confirmPassword)
        cy.get(Locators.Registration.CheckBox).click()
        cy.get(Locators.Registration.Submit).click()
        cy.get(Locators.Registration.FirstName).should("be.visible")
        cy.get(Locators.Registration.FirstName).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.") 
        })
    
    })
    
    it("create user without last name", ()=>{
        cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Registration.FirstName).type("Drazen")
        cy.get(Locators.Registration.LastName).should("be.visible")
        cy.get(Locators.Registration.LastName).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Registration.Password).type(correctPassword)
        cy.get(Locators.Registration.ConfirmPassword).type(confirmPassword)
        cy.get(Locators.Registration.CheckBox).click()
        cy.get(Locators.Registration.Submit).click()

    })
    
    it("create user without password", ()=>{
        cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Registration.FirstName).type("Drazen")
        cy.get(Locators.Registration.LastName).type("Gajic")
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Registration.CheckBox).click()
        cy.get(Locators.Registration.Submit).click()
        cy.get(Locators.Registration.Password).should("be.visible")
        cy.get(Locators.Registration.ConfirmPassword).should("be.visible")
        cy.get(Locators.Registration.Password).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    
    })
    
    afterEach("Clear cache", ()=>{
        cy.clearLocalStorage()
    })
    
    })