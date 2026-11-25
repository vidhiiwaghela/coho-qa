[![Playwright Tests](https://github.com/vidhiiwaghela/coho-qa/actions/workflows/playwright.yml/badge.svg)](https://github.com/vidhiiwaghela/coho-qa/actions/workflows/playwright.yml)

# CoHo QA

Manual test design, bug reporting and automated tests for **CoHo**, a housing society web app (Admin, Owner and Tenant roles, maintenance payments, notices, rules, festival fund). The app is a college team project that stores all data in the browser and uses fake data and Razorpay test mode.

App tested: https://coho-app.vercel.app

## Results

| What | Count |
|---|---|
| Test cases written and executed | 31 |
| Passed | 29 |
| Failed | 2 |
| Bugs logged in Jira | 4 (2 fixed, 2 open) |
| Tests automated with Playwright | 4 |

- Test cases: [CoHo Test Cases (Google Sheet)](https://docs.google.com/spreadsheets/d/1hcICQ0ttFjW5oj4hFxAEAGXsoHuGfJWWsBpGRvyxpQg/edit?usp=sharing)
- Bugs: Jira project "CoHo QA" (CH-1 to CH-4)

## What was tested

Login and wrong or empty PIN, role permissions (Admin, Owner, Tenant), maintenance payments and reminders, Razorpay test checkout and the UPI QR, receipts, notices, rules search, Hindi, Marathi and Gujarati translation, complaints and facility bookings, festival contributions with bad input, and small-screen layouts (320 px).

## Bugs found

| ID | Bug | Severity | Status |
|---|---|---|---|
| CH-1 | New-notice dot reappears after notices were viewed | Minor | Open |
| CH-2 | Admin has no option to post a festival drive | Major | Fixed |
| CH-3 | Send Reminder does not show a reminder to the flat owner | Major | Fixed |
| CH-4 | Festival payment screen lists QR, but checkout has no QR option | Minor | Open |

CH-2 and CH-3 were found while testing the finished app, then fixed. Their tickets were written afterwards and say so.

## Automated tests (Playwright, TypeScript)

| Test | Checks |
|---|---|
| TC-001 | Owner logs in with the correct PIN |
| TC-025 | The UPI QR is shown and decodes to the bill amount (₹6,200) |
| TC-029 | A payment receipt downloads as a PDF |
| TC-030 | Rules switch to Hindi |

The QR test takes a screenshot of the QR and decodes it with jsQR, so it checks the real UPI payload. No test completes a payment. They stop at the QR.

Tests run in GitHub Actions on every push, on Chromium.

## Run it locally

```bash
npm ci
npx playwright install chromium
```

Create a `.env` file (it is git-ignored):

```
COHO_URL=https://coho-app.vercel.app
COHO_PIN=1234
```

```bash
npx playwright test --project=chromium
```

`1234` is the demo PIN of a fake-data app.

## Limitations

- All CoHo data lives in browser storage, so there is no backend or API to test. All testing is through the UI.
- The remaining 27 cases are manual. Only stable, high-value flows were automated.
- CI runs on Chromium only.