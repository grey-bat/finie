# Data Dictionary

## Raw_Ledger_All
Primary normalized bank ledger.
Important fields:
- `Date`
- `Month`
- `Amount (R$)` — negative = outflow, positive = inflow
- `Transaction ID`
- `Payee (extracted)`
- `Is Shared Expense`
- `Is Mortgage Reimbursement`
- `Is Shared Settlement`
- `Settlement Direction`
- `Apartment/Remodel Guess`
- `Category`
- `Bucket`
- `Recurring?`
- `Rule Applied`

## Shared_Ledger
Filtered/enriched shared-account view.
Important fields:
- `Entry Class` — `Shared Expense`, `Settlement From Sabrina`, `Settlement To Sabrina`
- `Include in Main Timeline`
- `Final Apartment Flag`
- `Category`
- `Bucket`
- `Recurring?`
- `Rule Applied`

## NuCarta_Ledger
Personal card ledger.
Important fields:
- `Txn Date`
- `Statement Date`
- `Txn Month`
- `Statement Month`
- `Title Raw`
- `Merchant Normalized`
- `Amount (R$)` — positive purchases
- `Txn Type`
- `Is Installment`
- `Inst. Current`
- `Inst. Total`
- `Include in Spend`
- `Scope`
- `Owner`
- `Category`
- `Bucket`

## Projection_Helper
Forward event table.
Important fields:
- `Date`
- `Type`
- `Bucket`
- `Description`
- `Amount`
- `Scenario`
- `Source`

## Loan_Schedule
Loan payments.
Important fields:
- `Due Date`
- `Month #`
- `Amortization`
- `Interest`
- `MIP`
- `DFI`
- `TAC`
- `Total Payment`
- `Remaining Balance`
- `In Horizon?`

## Investments_Inventory
Live investment inventory.
Important fields:
- `Platform`
- `Asset`
- `Type / Indexer`
- `Rate Multiple / Spread`
- `Effective Rate`
- `Gross Value (R$)`
- `Applied Value (R$)`
- `Known Gain (R$)`
- `Maturity`
- `Application Date`
- `Holding Days`
- `IR Rate`
- `Estimated Tax (R$)`
- `Net Liquidation Value (R$)`
- `Projection End Value (R$)`

## Categorization_Rules
Rule table.
Important fields:
- `Priority`
- `Regex / keyword`
- `Category`
- `Bucket`
- `Recurring?`
- `Applies to`
- `Purpose`
- `Notes`

## Buckets currently in use
- `Shared Daily`
- `Other Major Shared`
- `Remodel`
- `Settlement`
- `Personal/Other`
- `Investments`

## High-level categories currently in use
- `Education`
- `Health`
- `Remodel`
- `Utilities`
- `Internet`
- `Rent / Condominium`
- `Activities`
- `Domestic Help`
- `Investments`
- `Other / Miscellaneous`
