# Current State

## What exists now

The workbook has been upgraded from a static tracker into a partial forward model with these major capabilities:

### Cashflow
- Current cash position
- Immediate-liquid investment proceeds
- Daily future inflow/outflow events
- Base-case funding gap view

### Funding plan
- Daily scenario engine for:
  - Base
  - Conservative
  - Optimistic
- First funding-gap date
- Total funding needed by scenario

### Remodel visibility
- Remodel dashboard with:
  - already paid
  - committed but unpaid
  - off-model risk
  - near-term remodel need
  - major upcoming payments

### Greg vs Sabrina
- Exact current imbalance at total level
- Forward bucket-level imbalance estimates

### Ledger and categorization
- Shared ledger normalization
- NuCarta normalization
- Rule-based categorization table
- Manual edits preserved in ledgers

### Investments
- Live inventory of still-relevant positions
- Estimated tax by holding period
- Net liquidation values
- Forward projection assumptions

### Loan schedule
- Loan payment schedule normalized into a tab
- Integrated into forward projection logic

## What is still weak

1. Some projections still depend on manually curated rows in `Projection_Helper`
2. Some investment application dates and tax estimates are inferred, not fully sourced
3. Bucket-level future Greg/Sabrina splits are directional, not fully deterministic
4. Pau Pau floor timing remains uncertain
5. The workbook is still file-centric, not operationally native to Google Sheets

## Best current tabs for human use

- `Cashflow`
- `Funding Plan`
- `Remodel_Dashboard`
- `Contribution_Imbalance`
- `Shared_Daily_Summary`
- `Assumptions`

## Best current tabs for system logic

- `Raw_Ledger_All`
- `Shared_Ledger`
- `NuCarta_Ledger`
- `Projection_Helper`
- `Loan_Schedule`
- `Categorization_Rules`
- `Assumptions`
