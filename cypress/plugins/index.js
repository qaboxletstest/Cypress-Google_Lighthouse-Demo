/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }

const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');
const fs = require('fs')
// const path = require('path')
// const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on('task', {
    lighthouse: lighthouse((lighthouseReport) => {
      const dirPath = './PerfReports'
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
      }
      const name = (lighthouseReport.lhr.requestedUrl).replace(/:|\//g, function (x) { return '' }) + " - " + (lighthouseReport.lhr.fetchTime).split('T')[0]
      fs.writeFileSync(`${dirPath}/GLH-(${name}).json`, JSON.stringify(lighthouseReport, null, 2))
      // const categories = lighthouseReport.lhr.categories;
      // const audits = lighthouseReport.lhr.audits;
      // const formattedAudit = Object.keys(audits).reduce(
      //   (metrics, curr) => ({
      //     ...metrics,
      //     [curr]: audits[curr].numericValue
      //   }),
      //   {}
      // );
      // const formattedAuditsResults = { url: lighthouseReport.lhr.requestedUrl, ...formattedAudit };
      // fs.writeFileSync(`./audit.json`, JSON.stringify(formattedAuditsResults, null, 2));
      // const formattedCategories = Object.keys(categories).reduce(
      //   (metrics, curr) => ({
      //     ...metrics,
      //     [curr]: categories[curr].score * 100
      //   }),
      //   {}
      // );
      // const formattedCategoriesResults = { url: lighthouseReport.lhr.requestedUrl, ...formattedCategories };
      // fs.writeFileSync(`./categories.json`, JSON.stringify(formattedCategoriesResults, null, 2));
    }),
  });
};