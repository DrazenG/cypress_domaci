/// <reference types="Cypress" />
const Locators = require("../fixtures/Locators.json")

describe ("Testovi za login",()=>{

    let correctEmail = "apple@aaa.com"
    let correctPassword = "12345678"
    let invalidEmailFirst = "apis@aaa.com"
    let invalidEmailSecond = "apple aaa.com"
    let invalidEmailThird = "apple@aa?a.com"

    beforeEach("visit link",()=>{
        cy.visit("/")   //posle ovog mozemo da brisemo sve linkove ka bazicnoj stranici galerije... Valjda :D
    })

it("Visit Gallery App", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.url().should("contains", "https://gallery-app") //da li sadrzi rec koju smo prosledili
    cy.url().should("include", "https://gallery-app") // koristi se kada imamo funkciju dropdown
    //cy.url().should("have.text", "https://gallery-app/login") //pada zasto sto ima tekst koji nije u aplikaciji odnosno stavljen je pod dve crte da bi ostali testovi prosli
    

})
it.only("Click on Login",()=>{
    //cy.visit("https://gallery-app.vivifyideas.com/") ovaj red sam stavio pod // da ga ugasim i vidim da li ce test raditi bez njega, a u skladu sa testom od 12 reda. i RADI!
    cy.get(Locators.Header.Login).eq(1).click()
    cy.url().should("contains", "https://gallery-app.vivifyideas.com/login")
        //cy.url().should("contains", "/login") - moze i ovako
    cy.get(".title-style").should("have.text","Please login") // have test uporedjuje
        //cy.get(".title-style").should("have.text","PLEASE LOGIN") // nece raditi jer tedt u kodu nije ceo velikim slovima
    cy.get(Locators.Login.Submit).should("be.visible") //iako je tacan, nije efektivan
    cy.get(Locators.Login.Email).should("be.visible")
    cy.get(".title-style").should("be.visible").and("have.text", "Please login")
    //svaki test moze da se asertuje po vise puta sa koriscenjem  ___ funkcije
})


it("successfull login", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(Locators.Header.Login).eq(1).click()
    cy.get(Locators.Login.Email).type(correctEmail)
    cy.get(Locators.Login.Password).type("12345678")
    cy.get(Locators.Login.Submit).click()
    cy.wait(2000)
    //cy.get(".nav-link").eq(3).should("contains","logout")
    cy.get(Locators.Header.Login).eq(3).should("be.visible")
    
})
it("logout", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(Locators.Header.Login).eq(1).click()
    cy.url().should("contains","/login") //user je na login stranici asertacija
    cy.get(Locators.Login.Email).type(correctEmail)
    cy.get(Locators.Login.Password).type("12345678")
    cy.get(Locators.Login.Submit).click()
    cy.wait(1000)
    cy.get(Locators.Header.Login).eq(3).should("be.visible")  // user se ulogovao i vidi "logout"
    cy.get(Locators.Header.Login).eq(3).click()
})
it("login without password", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(Locators.Header.Login).eq(1).click()
    cy.get(Locators.Login.Email).type(correctEmail)
    cy.get(Locators.Login.Submit).click()
    cy.get(Locators.Login.Password).then(($input)=>{
    expect($input[0].validationMessage).to.eq("Please fill out this field.") // poredimo sa navigacionom porukom iz browserea da li je ista, da se poklapa jer u suprotnom nece proci

    })
   
})

it("login with incorrect email", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(Locators.Header.Login).eq(1).click()
    cy.get(Locators.Login.Email).type("apis@aaa.com")
    cy.get(Locators.Login.Password).type("12345678")
    cy.get(Locators.Login.Submit).click()
    cy.get(".alert").should("be.visible").and("have.text", "Bad Credentials") //  bad credentials su case sensisitve!
})

it("login with  email without monkey a", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(Locators.Header.Login).eq(1).click()
    cy.get(Locators.Login.Email).type("apple aaa.com")
    cy.get(Locators.Login.Password).type("12345678")
    cy.get(Locators.Login.Submit).click()
    cy.get(Locators.Login.Email).then(($input)=>{
        expect($input[0].validationMessage).to.eq("Please enter an email address.") // ova poruka zavisi od browsera, moguce su i druge poruke.
    })
})

it("enter password that dont match number", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(Locators.Header.Login).eq(1).click()
    cy.get(Locators.Login.Email).type("apple@aaa.com")
    cy.get(Locators.Login.Password).type("123456") // treba da padne jer nemamo dovoljno cifara
    cy.get(Locators.Login.Submit).click()
    cy.get(".alert").should("be.visible").and("have.text", "Bad Credentials")

})

it("enter password that have letters and numbers", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(Locators.Header.Login).eq(1).click()
    cy.get(Locators.Login.Email).type("apple@aaa.com")
    cy.get(Locators.Login.Password).type("123terarijum") // treba da padne jer imamo dovoljno cifara ali imamo i slova u passwordu
    cy.get(Locators.Login.Submit).click()

})

it("enter password that have suffucent character", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(Locators.Header.Login).eq(1).click()
    cy.get(Locators.Login.Email).type("apple@aa?a.com")
    cy.get(Locators.Login.Password).type("123456") // treba da padne jer ne valja character za mail
    cy.get(Locators.Login.Submit).click()
    cy.get(Locators.Login.Email).then(($input)=>{
        expect($input[0].validationMessage).to.eq("Please enter an email address.")
    })

})

afterEach("Clear cache", ()=>{
    cy.clearLocalStorage()
})

})