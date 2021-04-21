# cypress-audit demo project

This is an example repository to showcase how you can use cypress-audit to easily integrate lighthouse commands into your Cypress tests.

Slow websites has direct impact on business. For reference
1. [Slow Websites Are Silent Killers for Businesses](https://www.hospitalitynet.org/news/4089374.html)
1. [5 Ways a Slow Website Can Impact Your Business](https://wetopi.com/slow-website-impact-business/#:~:text=In%20other%20words%2C%20slow%20websites,experience%20resulting%20in%20lower%20engagement)

When we talk about performance, we tend to focus more on server or backend performance. At the backend we perform bulk of concurrent transactions (via Load and Stress testing) to check our application performance at that very moment. Load and Stress testing are essential since they give us insights on how our applications behave under heavy load conditions. So to address server performance issues, we do a mix of optimise database queries, implement load balancing to distribute network traffic to different servers, scale up our infrastructure (horizontally or vertically or both), use Caching, etc.

However, even if the response times for different requests are fast enough, at times, the client side is not optimised and contributes to an increase in overall response time especially if it's downloading a lot of scripts, css and images. Therefore single user performance testing (aka Client side performance testing) is as important as doing load and stress testing on the backend.

One of the most popular and used tools out there for testing the performance of a website is Google Lighthouse. It is an open source tool used for auditing the quality and performance of your website. It's a great choice due to its versatility and ability to measure different areas such as web performance, accessibility, search engine optimisation and more. 

You can run Lighthouse in Chrome DevTools, from the command line, from a [web UI](https://developers.google.com/speed/pagespeed/insights/), or as a Node module. You give Lighthouse a URL to audit, it runs a series of audits against the page, and then it generates a report on how well the page did. From there, use the failing audits as indicators on how to improve the page. Each audit has a reference doc explaining why the audit is important, as well as how to fix it.

Out of these five categories (performance, accessibility, progressive web apps, SEO and best-practices), performance is the most important one. The great thing about Google Lighthouse tool is, if we want to run Lighthouse in an automated fashion, we can. And it would be awesome if we can Run Lighthouse audits directly in our E2E test suites. Meaning, it's time to extend Cypress E2E tests to also accomodate Google Lighthouse Audits. Excited??? Cool.

1. Cypress - would be used for Functional Automation testing and
1. Lighthouse - would be used to run it against AUT web page, be it public or require authentication. 

How can we Audit Web Pages secured behind Authentication?

Answer is simple, Cypress would take care care of Authentication part and expose Secured Web Pages to be audited by Lighthouse. We require a plugin in Cypress to achieve this and the name of that Plugin is [*cypress-audit*](https://www.npmjs.com/package/cypress-audit). This plugin, lets you integrate Lighthouse scores straight from your Cypress tests.

There are six important performance metrics which are important to understand.

1. First Contentful Paint (FCP)
FCP measures how long it takes for the browser to render the first piece of DOM content after a user navigates to your page.
1. Large Contentful Paint (LCP)
LCP measures how long it takes for the browser to render the largest piece of DOM content (image or text block) after a user navigates to your page.
1. Speed Index
Speed index measures how long the content visually loads on page load.
1. Time to Interactive (TTI)
TTI measures how long it takes for the page to become fully interactive.
1. Total Blocking Time (TBT)
TBT measures the time the page is blocked from responding to user inputs. Anything that executes above 50ms is considered a blocking task.
1. Cumulative Layout Shift (CLS)
CLS measures the visual stability of your page.

Time to start the Setup part 
>*  Install cypress-audit
>```npm install --save-dev cypress-audit```
>*  Configure Lighthouse CLI
>The second step is to prepare the Lighthouse CLI configuration. Cypress-audit uses Lighthouse CLI under the hood and if you have used Lighthouse CLI already, it opens up a Chrome browser and runs the audit. Similarly, when you run your Cypress tests, it also launches the Chrome browser by default when you use the visual test runner. Because we want to run lighthouse inside the same browser as Cypress rather than opening a new one, the following code needs to be added in your plugins/index.js.
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
>Since Cypress reacts to various browser event before we launch the browser, we are simply going to pass the launchOptions object, which contains information on how the browser is launched, to the prepareAudit function. This way, cypress-audit will know information about our browser. Then we create a new task called lighthouse to invoke the lighthouse process. This is needed because Lighthouse CLI is a node.js backend process so in order for us to use this within our Cypress tests, we need to wrap it as a task.
>*  Inform Cypress of Lighthouse Command
> The third and final step that we need to complete the cypress-audit setup is to import the cy.lighthouse() command to our support/commands.js to make Cypress aware of this new command.
> ```import ‘cypress-audit/commands’;```


## Writing the Test
Visit any web page you want by calling cy.visit('/’). Then to actually run the audit, we need to call cy.lighthouse() afterwards.
```
describe('Lighthouse', () => {
  it('should run performance audits', () => {
    cy.visit('/');
    cy.lighthouse();
  });
});
```

By default, cypress-audit will run the test based on a score of 100 for every metric. Kindly also note that this plugin And only supports the following browsers at the moment: -
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
When using custom tools, it can be convenient to directly access the raw information they provide for doing manual things, such as generating a custom reports.

To do so, you can pass a callback function to the task initializer. Then, when an audit is run, this callback will we executed with the raw data of the underlying tool.

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












