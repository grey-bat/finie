# Formula Notes

## Funding Plan core pattern
For each scenario, daily rows should follow:

- Open = prior End
- In = sum of matching inflows from event table
- Out = sum of matching outflows from event table
- PreClose = Open + In - Out
- Funding Need = MAX(0, -PreClose)
- End = PreClose + Funding Need

## Shared imbalance exact current logic
- Total shared expenses captured = negative sum of Shared Expense rows
- Settlements from Sabrina = positive reimbursement rows
- Settlements to Sabrina = absolute value of negative transfer rows
- Greg net burden = shared expenses - settlements from Sabrina + settlements to Sabrina
- Greg fair share = 50% of total shared expenses
- Greg owes Sabrina = fair share - net burden

## Remodel dashboard logic
- Already paid = shared-ledger rows tagged bucket/category remodel
- Committed unpaid = future event rows tagged remodel
- Off-model risk = assumptions cell for uncertain but committed payments
- Total captured remodel = already paid + committed unpaid + off-model risk

## Investment tax logic
Tax only the gain.
IR rate by holding days:
- <=180 days -> 22.5%
- 181-360 -> 20.0%
- 361-720 -> 17.5%
- >720 -> 15.0%

Net liquidation = gross value - estimated tax

## Migration notes to Google Sheets
- Prefer helper tables over giant nested formulas
- Use named ranges for assumptions
- Keep event-table builders in Apps Script if formulas become too brittle
- Preserve user-editable override columns and never overwrite them in refresh jobs
