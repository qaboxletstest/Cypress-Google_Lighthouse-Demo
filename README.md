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


To Install it 
> npm install --save-dev cypress-audit













