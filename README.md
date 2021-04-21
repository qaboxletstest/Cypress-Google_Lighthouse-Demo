# cypress-audit demo project

This is an example repository to showcase how you can use cypress-audit to easily integrate lighthouse commands into your Cypress tests.

Slow websites has direct impact on business. For reference
1. [Slow Websites Are Silent Killers for Businesses](https://www.hospitalitynet.org/news/4089374.html)
1. [5 Ways a Slow Website Can Impact Your Business](https://wetopi.com/slow-website-impact-business/#:~:text=In%20other%20words%2C%20slow%20websites,experience%20resulting%20in%20lower%20engagement)

When we talk about performance, we tend to focus more on server or backend performance. At the backend we perform bulk of concurrent transactions (via Load and Stress testing) to check our application performance at that very moment. Load and Stress testing are essential since they give us insights on how our applications behave under heavy load conditions. So to address server performance issues, we do a mix of optimise database queries, implement load balancing to distribute network traffic to different servers, scale up our infrastructure (horizontally or vertically or both), use Caching, etc.

However, even if the response times for different requests are fast enough, at times, the client side is not optimised and contributes to an increase in overall response time especially if it's downloading a lot of scripts, css and images. Therefore single user performance testing (aka Client side performance testing) is as important as doing load and stress testing on the backend.

One of the most popular and used tools out there for testing the performance of a website is Google Lighthouse. It is an open source tool used for auditing the quality and performance of your website. It's a great choice due to its versatility and ability to measure different areas such as web performance, accessibility, search engine optimisation and more. 

1. Cypress - Functional Automation testing tool
1. Lighthouse - Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and best-practices.

You can run Lighthouse in Chrome DevTools, from the command line, from a [web UI](https://developers.google.com/speed/pagespeed/insights/), or as a Node module. You give Lighthouse a URL to audit, it runs a series of audits against the page, and then it generates a report on how well the page did. From there, use the failing audits as indicators on how to improve the page. Each audit has a reference doc explaining why the audit is important, as well as how to fix it.

Out of these five categories (performance, accessibility, progressive web apps, SEO and best-practices), performance is the most important one. 











