/// <reference types="Cypress" />

describe('Google website', function () {
    it.skip('should run lighthouse performance audits using default thresholds', function () {
        cy.visit('/');
        cy.lighthouse();
    });

    it.only('should run lighthouse performance audits using custom thresholds', () => {
        const thresholds = {
            performance: 50,
            'first-contentful-paint': 2000,
            'largest-contentful-paint': 3000,
            accessibility: 80,
            interactive: 2000,
            seo: 60,
            pwa: 50,
        };

        const lighthouseConfig = {
            formFactor: 'desktop',
            screenEmulation: {
                disabled: true
            }
        };

        cy.visit('/');
        cy.lighthouse(thresholds, lighthouseConfig);
    });
})