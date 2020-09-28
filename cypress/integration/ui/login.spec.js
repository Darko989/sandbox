describe("Login test", () => {
	beforeEach(() => {
		cy.visit("/login");
	});

	const email = Cypress.env("email");
	const pass = Cypress.env("password");

	it ("greets with Log in", () => {
        cy.contains("h1,display-4.text-center","Log In");
        cy.contains("p","Sign in to your QA Sandbox account");
	});

	it ("link to Forget your password link", () => {
		cy.contains("Forgot Password").should("have.attr", "href", "/forgot-password");
    });
    
    it ("verify forgot password page", () => {
        cy.visit("/forgot-password");
        //cy.contains(".btn btn-secondary btn-lg-secondary").should("have.css", "cursor: pointer;");
        cy.contains(".text-center > b", "Forgot Password");
        cy.get('.value', "Email Adress");
        cy.get('.col-xl-12 > :nth-child(3)', "* = required field");
        cy.get('.form-group > .form-text',"Enter your email address and we will send you instructions to reset your password.");

    });

	it ("requires email", () => {
		cy.get("#cy.get(':nth-child(1) > .value')").should("have.attr", "required", "required");
		cy.get("button[type='submit']").click();
		cy.get("#form_username:invalid");
		cy.url().should("include", "/login");
	});

	it ("requires password", () => {
		cy.get("#form_password").should("have.attr", "required", "required");
		cy.get("#form_username").type(email+"{enter}");
		cy.get("#form_password:invalid");
		cy.url().should("include", "/login");
	});

	it ("requires valid username and password", () => {
		cy.get("#form_username").type(email);
		cy.get("#form_password").type("INVALIDpassword{enter}");
		cy.get("#form_password:invalid");
		cy.url().should("include", "/login");
	});

	it ("requires password is more than 6 characters", () => {
		cy.get("#form_username").type(email);
		cy.get("#form_password").type("INV{enter}");
		cy.get("#form_password:invalid");
		cy.get(".form-error-message")
		.contains("This value is too short. It should have 6 characters or more.");
		cy.url().should("include", "/login");
	});

	it ("sucessfull login", () => {
		cy.get("#form_username").type(email);
		cy.get("#form_password").type(pass);
		cy.get("button[type='submit']").click();
		cy.url().should("include", "/overview");
	});
});