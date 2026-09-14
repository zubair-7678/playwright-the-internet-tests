# playwright-the-internet-tests
A Playwright test automation project written in JavaScript with 20 automated test cases for the-internet.herokuapp.com, covering login, form validation, UI interactions, alerts, dynamic controls, file uploads, and keyboard events.
# the-internet Playwright Suite

A real, runnable [Playwright](https://playwright.dev/) test suite (JavaScript) against
[the-internet.herokuapp.com](https://the-internet.herokuapp.com/) — Dave Haeffner's classic
practice site for automated UI testing.

## A note on scope

`the-internet.herokuapp.com` is a collection of individual UI-testing widgets (login,
checkboxes, dropdowns, alerts, drag-and-drop, file upload, tables, etc.) — it does **not**
have a native search box or an e-commerce checkout flow. Rather than fake those against a
site that doesn't have them, this suite maps each requested category onto the closest real
page:

| Requested category | What this suite actually exercises |
|---|---|
| Login (valid/invalid) | `/login` — Form Authentication, with the site's real test credentials |
| Search | `/tables` — Sortable Data Tables (closest analog: verifying ordering/filtering of result sets) |
| Form validation | `/checkboxes`, `/dropdown`, `/inputs` — checkbox/select state and HTML5 numeric input validation |
| Checkout flow | A 4-step chained journey across `/add_remove_elements`, `/dynamic_loading`, and `/status_codes` — standing in for "add to cart → processing → confirmation" |
| Misc. UI/E2E patterns | `/javascript_alerts`, `/drag_and_drop`, `/hovers`, `/upload`, `/windows` |

## Project structure

```
.
├── playwright.config.js          # baseURL, reporters, browser projects, tracing
├── package.json
├── .github/workflows/playwright.yml   # CI: runs the suite on every push/PR
└── tests/
    ├── login.spec.js              # 4 tests  — Form Authentication
    ├── form-validation.spec.js    # 4 tests  — checkboxes, dropdown, numeric inputs
    ├── search-and-tables.spec.js  # 2 tests  — sortable table (search/filter analog)
    ├── checkout-flow.spec.js      # 4 tests  — add/remove cart items, processing, confirmation
    └── ui-interactions.spec.js    # 6 tests  — JS dialogs, drag & drop, hover, upload, new windows
```

**20 test cases total.**

## Test case list

**Login — `login.spec.js`**
1. Successful login with valid credentials redirects to the secure area
2. Login fails with an invalid username
3. Login fails with an invalid password
4. Logout returns the user to the login page and clears the session

**Form validation — `form-validation.spec.js`**
5. Checkboxes reflect their real default state and toggle correctly
6. Dropdown starts unselected and allows choosing each option
7. Numeric input accepts a valid number
8. Numeric input rejects non-numeric characters (HTML5 `type="number"` validation)

**Search/filter analog — `search-and-tables.spec.js`**
9. Sorting by Last Name ascending then descending re-orders rows correctly
10. Sorting by Due amount orders rows numerically

**Checkout-style flow — `checkout-flow.spec.js`**
11. Adding items increases the cart (delete button) count
12. Removing an item decreases the cart count by one
13. Order "processing" spinner resolves to a success state
14. Order confirmation returns a successful (200) response

**UI interactions — `ui-interactions.spec.js`**
15. Accepting a JS alert shows the expected result text
16. Dismissing a JS confirm dialog reports Cancel
17. Dragging column A onto column B swaps their contents
18. Hovering over a figure reveals the caption and profile link
19. Uploading a file displays its filename on the result page
20. Clicking the link opens a new tab with the expected content

## Getting started

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright's browser binaries
npx playwright install --with-deps

# 3. Run the full suite (headless, all 3 browsers: Chromium, Firefox, WebKit)
npm test
```

### Useful variants

```bash
npx playwright test --headed              # watch the browser while it runs
npx playwright test --ui                  # interactive UI mode / debugger
npx playwright test tests/login.spec.js   # run a single file
npx playwright test --project=chromium    # run against one browser only
npm run report                            # open the last HTML report
```

After a run, an HTML report is generated at `playwright-report/index.html` (opened via
`npm run report`), and traces/screenshots/video for any failing test are captured
automatically (see `playwright.config.js`).

## CI

`.github/workflows/playwright.yml` runs the entire suite on every push and pull request to
`main` via GitHub Actions, and uploads the HTML report as a build artifact.

## Design notes

- Tests use Playwright's built-in [web-first assertions](https://playwright.dev/docs/test-assertions)
  (`expect(locator).toHaveText(...)`, `toBeVisible()`, etc.) rather than manual waits, so they
  self-retry and stay resilient to the app's natural load/render timing.
- `baseURL` is centralized in `playwright.config.js`, so every test uses relative paths
  (`page.goto('/login')`) instead of hardcoding the domain.
- The drag-and-drop test manually dispatches `DataTransfer` events because the target site
  uses native HTML5 drag events, which Chromium's automated input doesn't trigger via a
  simple mouse-drag simulation.
- The file-upload test creates a temporary file at runtime (via Node's `fs`/`os` modules) and
  cleans it up afterward, so the suite has no external file dependencies.
- Each spec file is scoped to one feature area so failures are easy to localize, and
  `fullyParallel: true` lets independent specs run concurrently for faster CI runs.

