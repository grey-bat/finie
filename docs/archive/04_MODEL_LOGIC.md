# Model Logic

## 1) Assumptions as control layer
`Assumptions` feeds:
- as-of date
- starting bank balance
- immediate-liquid investments net
- recurring monthly shared baseline by scenario
- optimistic discretionary funding
- projection horizon
- CDI / IPCA projection assumptions

This should become named ranges in Google Sheets.

## 2) Projection_Helper as canonical future-event ledger
Every future inflow/outflow should exist as one row with:
- Date
- Type (`Inflow` / `Outflow`)
- Bucket
- Description
- Amount
- Scenario (`All`, `Base`, `Conservative`, `Optimistic`)
- Source

This is the heart of the forward model. The funding engine should never pull directly from random tabs if it can avoid it.

## 3) Funding Plan as daily scenario engine
For each date in horizon:
- Open cash = prior day end cash
- In = sum of inflow events active in scenario
- Out = sum of outflow events active in scenario
- PreClose = Open + In - Out
- Funding Need = max(0, -PreClose)
- End = PreClose + Funding Need

This creates:
- first funding-gap date
- total funding needed
- fully bridged ending cash series

## 4) Cashflow as executive output
The `Cashflow` tab is a summarized front-end on top of:
- Assumptions
- Projection_Helper
- Funding Plan

It should stay readable and small. It should not become a second engine.

## 5) Shared economics logic
The shared-account mechanics are:

- Shared Expense = negative shared-account spend row
- Settlement From Sabrina = positive reimbursement to Greg
- Settlement To Sabrina = negative transfer to Sabrina
- Mortgage reimbursement = excluded from shared operating math

Current exact total imbalance:
- Greg net burden = Shared Expense - Settlement From Sabrina + Settlement To Sabrina
- Greg fair share = 50% of Shared Expense
- Greg owes Sabrina = fair share - net burden

This exact total-level logic is stronger than the bucket-level forward logic.

## 6) Remodel logic
Current remodel visibility is built from:
- already-paid remodel spend in `Shared_Ledger`
- future modeled remodel rows in `Projection_Helper`
- off-model committed risk in `Assumptions` for uncertain timing

In the Sheets-native build, remodel obligations should be its own append-only table:
- vendor
- due date
- amount
- status
- category
- linked source doc
- confidence level

Then `Projection_Helper` should be generated from that table.

## 7) Investment logic
Each live position should carry:
- platform
- asset
- type / indexer
- spread
- effective rate
- gross value
- applied value
- known gain
- maturity
- application date
- holding days
- IR rate
- tax estimate
- net liquidation value
- projection value

Tax estimate:
- <=180 days -> 22.5%
- 181-360 -> 20.0%
- 361-720 -> 17.5%
- >720 -> 15.0%

Only gain should be taxed.

## 8) Categorization logic
Rule application order should be:

1. manual override
2. exact/payee-specific rule
3. regex/keyword rule
4. installment rule
5. fallback category

Today the rule table exists, but the application is still mixed between formulas and user edits. In the next build, apply rules in Apps Script and write back deterministic values plus rule id.

## 9) Native Sheets target
In the new architecture:
- raw tabs are append-only
- enrichment tabs are formula/script-built
- dashboards do not contain hidden business logic
- all critical assumptions are centralized
- change logging is explicit
