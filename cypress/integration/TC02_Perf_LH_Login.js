/// <reference types="Cypress" />

describe('Login website', () => {
    //https://googlechrome.github.io/lighthouse/viewer/
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

        const lighthouseOptions = {
            chromeFlags: ['--show-paint-rects'],
            output: 'html',
            'output-path': './lighthouse-results.html',
            'save-assets': true
        };

        const lighthouseConfig = {
            // formFactor: 'desktop',
            screenEmulation: {
                disabled: false
            },
            disableStorageReset: true
        };
        cy.lighthouse(thresholds, lighthouseConfig)
    });

    it.skip('Login Page', { baseUrl: 'https://the-internet.herokuapp.com/login' }, () => {
        cy.visit('/', { failOnStatusCode: false })
        cy.get('input#username').type('tomsmith')
        cy.get('input#password').type('SuperSecretPassword!')
        cy.get('button[type=submit]').click()
        cy.contains('Secure Area')
        const thresholds = {
            "performance": 50,
            "accessibility": 50,
            "best-practices": 50,
            "seo": 50,
            "pwa": 50
        };

        const lighthouseOptions = {
            chromeFlags: ['--show-paint-rects'],
            output: 'html',
            'output-path': './lighthouse-results.html',
            'save-assets': true
        };

        const lighthouseConfig = {
            // formFactor: 'desktop',
            screenEmulation: {
                disabled: false
            },
            disableStorageReset: true
        };
        cy.lighthouse(thresholds, lighthouseConfig)
    });

    it.skip('should run lighthouse performance audits using default thresholds', { baseUrl: 'https://react-redux.realworld.io/#/login?_k=x44w03' }, () => {
        cy.visit('/');
        const thresholds = {
            "performance": 50,
            "accessibility": 50,
            "best-practices": 50,
            "seo": 50,
            "pwa": 50
        };

        const lighthouseOptions = {

        };

        const lighthouseConfig = {
            formFactor: 'mobile',
            screenEmulation: {
                disabled: false
            },
            disableStorageReset: false
        };
        cy.lighthouse(thresholds, lighthouseConfig);
    });
});