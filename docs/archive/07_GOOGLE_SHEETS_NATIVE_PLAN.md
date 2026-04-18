# Google Sheets Native Plan

## Goal
Make Google Sheets the operational source of truth so future work does not depend on uploading/downloading xlsx files.

## Target architecture

### A. Config / control tabs
1. `Config`
   - sheet id / folder ids / run settings
2. `Assumptions`
   - model date
   - scenario parameters
   - rates
   - balances
3. `Categorization_Rules`
   - deterministic rule table
4. `Owners_Shares`
   - default share rules by bucket/vendor/item if needed

### B. Raw append-only tabs
5. `Raw_Bank_Nubank`
6. `Raw_Sharing_Transfers`
7. `Raw_NuCarta`
8. `Raw_Investments`
9. `Raw_Loans`
10. `Raw_Remodel_Docs_Index`

### C. Normalized/enriched tabs
11. `Ledger_All_Normalized`
12. `Shared_Ledger`
13. `NuCarta_Ledger`
14. `Investments_Inventory`
15. `Loan_Schedule`
16. `Remodel_Obligations`
17. `Projection_Events`

### D. Reporting / output tabs
18. `Cashflow`
19. `Funding_Plan`
20. `Remodel_Dashboard`
21. `Contribution_Imbalance`
22. `Shared_Daily_Summary`
23. `Validation`
24. `Change_Log`

## Operational pattern

### Import
Apps Script pulls CSV/PDF metadata/manual inputs from Drive-linked folders and appends into raw tabs.

### Normalize
Apps Script or formulas normalize:
- dates
- ids
- merchants
- installment fields
- signs
- source file names

### Classify
Apps Script applies:
1. manual override
2. exact match rules
3. regex rules
4. fallback

Writes back:
- category
- bucket
- recurring flag
- rule id / rule text
- needs review flag

### Build projections
A builder creates `Projection_Events` from:
- remodel obligations
- loan schedule
- recurring shared baseline assumptions
- investment liquidation options
- expected deposits/funding
- any other committed future outflow/inflow

### Report
Dashboards read from structured tables only.

## Why this is better than xlsx
- no local file drift
- easier collaboration
- easier recurring imports
- Apps Script can automate refresh
- GitHub can track script/docs changes cleanly

## GitHub version-control approach

Track in GitHub:
- Apps Script code
- markdown docs
- exported rule tables as CSV
- changelog docs
- sample test fixtures

Do not treat the Sheet file itself as the version-control unit.

Recommended repo layout:

```text
finance-workbook/
  README.md
  docs/
    handoff/
    model/
  apps-script/
    appsscript.json
    Config.gs
    Importers.gs
    Normalize.gs
    Classify.gs
    Projections.gs
    Dashboards.gs
    Validate.gs
    Utils.gs
  test-fixtures/
    sample_bank.csv
    sample_nucarta.csv
    sample_rules.csv
```

## Minimal Apps Script menu
- Finance > Import new files
- Finance > Rebuild categorizations
- Finance > Rebuild projections
- Finance > Refresh dashboards
- Finance > Run validations
- Finance > Snapshot change log

## Change tracking
Use both:
1. `Change_Log` tab in the Sheet for business-visible changes
2. GitHub commits for code/docs/rules changes

Change_Log columns:
- Timestamp
- User
- Area
- Change Type
- Before
- After
- Notes

## Practical first migration
1. Upload current xlsx into Google Sheets
2. Create the target tabs above inside the Sheet
3. Copy formulas/structures from the working tabs
4. Move future event logic into `Projection_Events`
5. Add Apps Script to refresh normalized tabs and rebuild outputs
6. Cut over daily use to the Sheet
