describe("Vezba za register, pa za login", ()=>{ //sam pocetak i opis vezbe

it("visit gallery site",()=> { // 1.sta i kako posecujemo
cy.visit("baseUrl") //unosimo url stranice. Ovde vec imamo sacuvan url, pa ga koristimo skracenog.
})

it("click on 'All Galleries'", ()=>{ // 2. sta radimo
    cy.visit("baseUrl")                 //korak 1.
    cy.get(".nav-link").eq(0).click() // 3. u inspect trazimo koji element nam treba,
    //kao i poziciju na ekranu. Brojevi su isti kao na nizovima. Prvi broj nam krece od 0.
    //kada ga nadjemo, pisemo koji je .eq(0) i komandujemo .click()

})

it("register",()=>{
    cy.visit("baseUrl")             //korak 1.
    cy.get(".nav-link").eq(2).click() // isto kao korak 3. samo je drugi klik u pitanju

})

it("Fill out registration-happy flow",()=>{
    cy.visit("baseUrl")
    cy.get(".nav-link").eq(2).click() // korak 3.
    cy.get("#first-name").type("Hajduk") // 4. U inspect trazimo koje polje popunjavamo,
    // dodamo prefix # i da bismo znali sta u polje da ukucavamo, imamo .type
    cy.get("#last-name").type("Veljko") //sve isto kao 4. 
    cy.get("#email").type("hajve@ssd.com")
    cy.get("#password").type("12345678")
    cy.get("#password-confirmation").type("12345678")
    cy.get(".form-check-input").click() // za razliku od 4 nemamo tekst vec checkbox i zato imamo click
    cy.get(".btn").click() //isto kao za 4 vec samo imamo da kliknemo. 
    //VAZNO! kada imamo checkbox kada nemamo id(popunu polja) onda gledam class(za click i checkbox)

})


})