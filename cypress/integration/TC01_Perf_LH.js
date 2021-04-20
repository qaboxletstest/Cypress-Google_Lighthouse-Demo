/// <reference types="Cypress" />

describe('Google website', function () {
    it.only('should run lighthouse performance audits using default thresholds', function () {
        cy.visit('/');
        const thresholds = {
            "performance": 50,
            "accessibility": 50,
            "best-practices": 50,
            "seo": 50,
            "pwa": 50
        };

        const lighthouseOptions = {
            disableStorageReset: false
        };

        const lighthouseConfig = {
            formFactor: 'desktop',
            screenEmulation: {
                disabled: true
            }
        };
        const name = `${this.test.fullTitle}`
        cy.lighthouse(thresholds, lighthouseConfig);
    });

    it.skip('should run lighthouse performance audits using custom thresholds', () => {
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

    it.skip('Generate HTML Report', { baseUrl: 'https://googlechrome.github.io/lighthouse/viewer/' }, () => {
        cy.visit('/')
        cy.readFile('./result.json').then(data => {
            cy.get('div.viewer-placeholder').invoke('val', data).trigger('change')
        })
    });
});