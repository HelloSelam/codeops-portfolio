# Performance Notes

## Measurement Context

The baseline below is the previously recorded Lighthouse result for the project. It is included as a historical reference, not as a claim that it represents the final Vercel deployment.

**Baseline environment:** Previous local/project Lighthouse run.

**Final environment:** Vercel production deployment — measure after the final deployment using the same Lighthouse mode, device profile, and throttling settings.

## Before and After

| Metric                         | Previous baseline | Final deployed build |
| ------------------------------ | ----------------: | -------------------: |
| Lighthouse Performance         |                73 |     Not measured yet |
| First Contentful Paint (FCP)   |             0.9 s |     Not measured yet |
| Largest Contentful Paint (LCP) |             1.3 s |     Not measured yet |
| Total Blocking Time (TBT)      |          1,650 ms |     Not measured yet |
| Cumulative Layout Shift (CLS)  |                 0 |     Not measured yet |
| Speed Index                    |             3.0 s |     Not measured yet |

Do not fill the final column with estimates. Run Lighthouse against the deployed Vercel URL and replace each "Not measured yet" value with the actual result.

## Performance Work and Implementation Choices

* The menu route uses revalidation (`revalidate = 3600`) so menu data can be cached and refreshed periodically.
* Menu data is fetched in the server page and passed to the interactive dish grid.
* The cart and category filter use client-side interactivity only where needed.
* Next.js Image is used for dish imagery with responsive size hints.
* The dashboard is dynamic because it depends on the current authenticated staff session and order data.
* The dashboard chart is isolated in a client component while the page-level data aggregation remains on the server.

## Final Measurement Procedure

1. Deploy the final commit to Vercel.
2. Open the production URL in Chrome.
3. Open DevTools → Lighthouse.
4. Run a Mobile performance audit using the same settings as the baseline, if known.
5. Record Performance, FCP, LCP, TBT, CLS, and Speed Index.
6. Save the Lighthouse report or screenshots as evidence.
7. Update the final column above with the measured values and add the test date and production URL.

## Performance Targets

Use these as project targets, not as claimed results:

* **LCP:** Below 2.5 seconds
* **CLS:** Below 0.1
* **INP:** Below 200 milliseconds

Lighthouse's Total Blocking Time is a lab diagnostic and is not the same metric as field-measured Interaction to Next Paint (INP).
