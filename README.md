# cypress-audit demo project

This is an example repository to showcase how you can use cypress-audit to easily integrate lighthouse commands into your Cypress tests.

## Setup 
>*  Install cypress-audit
>```npm install --save-dev cypress-audit```
>*  Configure Lighthouse CLI

```const { lighthouse, prepareAudit } = require('cypress-audit');

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on('task', {
    lighthouse: lighthouse(),
  });
};
```
>*  Inform Cypress of Lighthouse Command

> ```import ‘cypress-audit/commands’;```


## Writing the Test

```
describe('Lighthouse', () => {
  it('should run performance audits', () => {
    cy.visit('/');
    cy.lighthouse();
  });
});
```

By default, cypress-audit will run the test based on a score of 100 for every metric. Kindly also note that this plugin only supports the following browsers at the moment: -
```
const defaultThresholds = {
  performance: 100,
  accessibility: 100,
  "best-practices": 100,
  seo: 100,
  pwa: 100,
};

const VALID_BROWSERS = {
  Chrome: true,
  Chromium: true,
  Canary: true,
};
```

This code is taken from cypress-audit/src/performances/command-handler.js file.

The thresholds can be modified and you are free to customise which metrics you want to track. You can also pass in a custom configuration to update the metric scores. Here is a code snippet on how you can pass custom configurations in cypress-audit.

```
describe('Lighthouse', () => {
  it('should run performance audits using custom thresholds', () => {
      cy.visit('/');

      const customThresholds = {
        performance: 50,
        accessibility: 50,
        seo: 70,
        'first-contentful-paint': 2000,
        'largest-contentful-paint': 3000,
        'cumulative-layout-shift': 0.1,
        'total-blocking-time': 500,
      };

      const desktopConfig = {
        formFactor: 'desktop',
        screenEmulation: { disabled: true },
      };

      cy.lighthouse(customThresholds, desktopConfig);
    });
});
```

## Accessing the raw reports

In the cypress/plugins/index.js file:
```
const { lighthouse, pa11y, prepareAudit } = require("cypress-audit");

module.exports = (on, config) => {
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on("task", {
    lighthouse: lighthouse((lighthouseReport) => {
      console.log(lighthouseReport); // raw lighthouse reports
    }),
    pa11y: pa11y((pa11yReport) => {
      console.log(pa11yReport); // raw pa11y reports
    }),
  });
};
```

However, printing to the console isn't that helpful. Hence we have following options: -
* Save the Audits and Categories scores in seperate JSON files. 
```
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on('task', {
    lighthouse: lighthouse((lighthouseReport) => {
      const categories = lighthouseReport.lhr.categories;
      const audits = lighthouseReport.lhr.audits;
      const formattedAudit = Object.keys(audits).reduce(
        (metrics, curr) => ({
          ...metrics,
          [curr]: audits[curr].numericValue
        }),
        {}
      );
      const formattedAuditsResults = { url: lighthouseReport.lhr.requestedUrl, ...formattedAudit };
      fs.writeFileSync(`./audit.json`, JSON.stringify(formattedAuditsResults, null, 2));
      const formattedCategories = Object.keys(categories).reduce(
        (metrics, curr) => ({
          ...metrics,
          [curr]: categories[curr].score * 100
        }),
        {}
      );
      const formattedCategoriesResults = { url: lighthouseReport.lhr.requestedUrl, ...formattedCategories };
      fs.writeFileSync(`./categories.json`, JSON.stringify(formattedCategoriesResults, null, 2));
    }),
  });
};
```
* Save the whole report in a JSON file.

```
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
    }),
  });
};
```

Now, with the full JSON file, you can view the html report from [Lighthouse-Report-Viewer](https://googlechrome.github.io/lighthouse/viewer/). 










