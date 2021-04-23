/// <reference types="Cypress" />

describe('Login website', () => {
    it.skip('Login Page', { baseUrl: 'https://react-redux.realworld.io/#/login?_k=x44w03' }, () => {
        cy.visit('/')
        cy.get('input[type=email]').type('qaboxletstest@gmail.com')
        cy.get('input[type=password]').type('password123')
        cy.get('button[type=submit]').click()
        cy.contains('New Post')

        const thresholds = {
            "performance": 50,
            "accessibility": 50,
            "best-practices": 50,
            "seo": 50,
            "pwa": 50
        };

        const lighthouseConfig = {
            formFactor: 'desktop',
            screenEmulation: {
                disabled: true
            },
        };
        cy.lighthouse(thresholds, lighthouseConfig)
    });
});