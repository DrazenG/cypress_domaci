describe("testovi za register",()=>{  

it("Visit register page",()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(".nav-link").eq(2).click
})
it("create user without first name", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/")
    cy.get(".nav-link").eq(2).click()
    cy.get("#last-name").type("Gajic")
    cy.get("#email").type("apple@aaa.com")
    cy.get("#password").type("12345678")
    cy.get("#password-confirmation").type("12345678")
    cy.get(".form-check-input").click()
    cy.get(".btn").click()

})

it("create user without last name", ()=>{
    cy.visit("https://gallery-app.vivifyideas.com/register") //u ovom redu smo skratili putanju i ne pisemo red 9, jer smo ubacili /register i tako skratili duzinu koda
    cy.get("#first-name").type("Drazen")
    cy.get("#email").type("apple@aaa.com")
    cy.get("#password").type("12345678")
    cy.get("#password-confirmation").type("12345678")
    cy.get(".form-check-input").click()
    cy.get(".btn").click()

})

it("create user without password", ()=>{
    cy.visit("/register") //u ovom redu smo JOS skratili putanju jer smo ubacili samo /register , a ne ceo link i tako skratili duzinu koda
    cy.get("#first-name").type("Drazen")
    cy.get("#last-name").type("Gajic")
    cy.get("#email").type("apple@aaa.com")
    cy.get(".form-check-input").click()
    cy.get(".btn").click()

})


})