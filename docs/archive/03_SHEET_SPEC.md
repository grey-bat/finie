# Sheet Spec

## Cashflow
- Size: 1000 rows x 20 cols
- Formula cells: 279
- Key header row (approx): 3
- Visible fields: Current cash position, =Assumptions!$B$4, Immediate-liquid investments net, =Assumptions!$B$5, Next 7 days cash needs, =SUMPRODUCT((Projection_Helper!$A$2:$A$200>$B$2)*(Projection_Helper!$A$2:$A$200<=$B$2+7)*(Projection_Helper!$B$2:$B$200="Outflow")*(Projection_Helper!$F$2:$F$200="All")*Projection_Helper!$E$2:$E$200)
Purpose: front-end operating view for current cash, near-term outflows/inflows, and daily base-case cash path.
Key inputs: Assumptions, Projection_Helper, Funding Plan.
Key outputs: current cash, next 7 days cash needs, first funding date, total base funding needed, daily opening/inflow/outflow/end balances.
Notes: this is the best “executive view” today, but it still depends on Projection_Helper being manually curated.

## Funding Plan
- Size: 1000 rows x 20 cols
- Formula cells: 3977
- Frozen panes: `A10`
- Key header row (approx): 2
- Visible fields: Date, Base Open, Base In, Base Out, Base PreClose, Base Funding Need, Base End, Cons Open, Cons In, Cons Out, Cons PreClose, Cons Funding Need, Cons End, Opt Open, Opt In, Opt Out, Opt PreClose, Opt Funding Need, Opt End, Event Count
Purpose: scenario engine for Base / Conservative / Optimistic daily liquidity.
Key inputs: Assumptions, Projection_Helper.
Key outputs: daily open/in/out/pre-close/funding-need/end for all three scenarios, plus first funding-gap date and total funding need.
Notes: this should become the system’s central engine in Google Sheets. Everything else should feed it.

## Raw_Ledger_All
- Size: 1000 rows x 17 cols
- Formula cells: 0
- Frozen panes: `A5`
- Hidden columns: B, D
- Key header row (approx): 4
- Visible fields: Date, Month, Amount (R$), Transaction ID, Payee (extracted), Is Shared Expense, Is Mortgage Reimbursement, Description, Source File, Is Shared Settlement, Settlement Direction, Apartment/Remodel Guess, Guess Basis, Category, Bucket, Recurring?, Rule Applied
Purpose: append-only normalized Nubank bank ledger from uploaded CSVs.
Key inputs: CSV imports.
Key outputs: normalized fields, shared flags, settlement flags, initial category/bucket/rule assignments.
Notes: treat this as a raw+lightly-enriched staging table, not a reporting tab.

## Shared_Ledger
- Size: 1000 rows x 17 cols
- Formula cells: 652
- Frozen panes: `A5`
- Hidden columns: C, I
- Key header row (approx): 4
- Visible fields: Date, Amount (R$), Transaction ID, Payee (extracted), Apartment/Remodel Guess, Review Override (0/1), Entry Class, Description, Source File, Include in Main Timeline, Guess Basis, Final Apartment Flag, Notes, Category, Bucket, Recurring?, Rule Applied
Purpose: rebuild the shared-account timeline from Raw_Ledger_All.
Key inputs: Raw_Ledger_All, manual overrides, categorization rules.
Key outputs: Shared Expense rows, Settlement From Sabrina rows, Settlement To Sabrina rows, mortgage reimbursement exclusion, final category/bucket tags.
Notes: this sheet is the source for shared-expense math and remodel-paid math.

## Shared_Daily
- Size: 1000 rows x 21 cols
- Formula cells: 3946
- Frozen panes: `A10`
- Hidden columns: N
- Key header row (approx): 9
- Visible fields: =SUM(B10:B1000), =SUM(C10:C1000), =SUM(D10:D1000), =SUM(E10:E1000), =SUM(F10:F1000), =SUM(H10:H1000), =SUM(G10:G1000), Net Burden on Greg Stmt, Cumulative Shared, Cumulative Net Burden, 2025-05-01 00:00:00, 2025-06-01 00:00:00, =SUMIFS($B$10:$B$435,$A$10:$A$435,">="&M9,$A$10:$A$435,"<"&N9), =SUMIFS($C$10:$C$435,$A$10:$A$435,">="&M9,$A$10:$A$435,"<"&N9), =SUMIFS($D$10:$D$435,$A$10:$A$435,">="&M9,$A$10:$A$435,"<"&N9), =SUMIFS($E$10:$E$435,$A$10:$A$435,">="&M9,$A$10:$A$435,"<"&N9), =SUMIFS($F$10:$F$435,$A$10:$A$435,">="&M9,$A$10:$A$435,"<"&N9), =SUMIFS($G$10:$G$435,$A$10:$A$435,">="&M9,$A$10:$A$435,"<"&N9), =SUMIFS($H$10:$H$435,$A$10:$A$435,">="&M9,$A$10:$A$435,"<"&N9)
Purpose: historical analysis of shared expense mechanics on Greg’s statement.
Key inputs: Shared_Ledger.
Key outputs: total shared, apt/remodel, other shared, settlements from/to Sabrina, net burden on Greg statement, monthly summaries.
Notes: useful historically, but too dense for daily decision-making; Shared_Daily_Summary is the cleaner layer.

## NuCarta_Ledger
- Size: 1000 rows x 20 cols
- Formula cells: 0
- Frozen panes: `A5`
- Key header row (approx): 4
- Visible fields: Txn Date, Statement Date, Txn Month, Statement Month, Title Raw, Merchant Normalized, Amount (R$), Txn Type, Is Installment, Inst. Current, Inst. Total, Include in Spend, Scope, Owner, Account, Source File, Category, Bucket, Recurring?, Rule Applied
Purpose: append-only normalized personal credit-card ledger.
Key inputs: NuCarta CSV imports.
Key outputs: purchase/refund/bill-payment normalization, installment parsing, include-in-spend logic, category/bucket tags.
Notes: preserve statement month and txn month separately; both are useful.

## NuCarta_Monthly
- Size: 1000 rows x 16 cols
- Formula cells: 192
- Frozen panes: `A5`
- Key header row (approx): 4
- Visible fields: Statement Date, Purchases, Refunds / Credits, Bill Payments, Net Card Spend, Installment Purchases, Rows, Txn Month, Purchases, Refunds / Credits, Bill Payments, Net Card Spend, Installment Purchases, Rows
Purpose: monthly rollups for the NuCarta ledger by statement month and txn month.
Key inputs: NuCarta_Ledger.
Key outputs: purchases, refunds/credits, bill payments, purchase counts, total rows by month.
Notes: keep this formula-driven off the ledger rather than manually edited.

## Investments_Inventory
- Size: 1000 rows x 21 cols
- Formula cells: 140
- Frozen panes: `A6`
- Key header row (approx): 5
- Visible fields: Platform, Asset, Type / Indexer, Rate Multiple / Spread, Effective Rate, Gross Value (R$), Applied Value (R$), Known Gain (R$), Maturity, Application Date, Holding Days, IR Rate, Tax on Gain (R$), Net Value (R$), Projected Gross +90d, Projected Net @ Maturity, Status / Assumption, Source, Gross current value, =SUM(F6:F24)
Purpose: live inventory of still-relevant investments, with gross value, estimated tax, net liquidation value, and projection fields.
Key inputs: older investment inventory, January 2026 Inter report, assumptions for CDI/IPCA.
Key outputs: gross value, applied value, known gain, maturity, app date, holding days, IR rate, tax estimate, net liquidation, projected value.
Notes: do not include liquidated Master / Real Financier / Raquel / Will positions in the live inventory.

## Assumptions
- Size: 14 rows x 3 cols
- Formula cells: 0
- Frozen panes: `A3`
- Key header row (approx): 2
- Visible fields: Model Item, Value, Units / Notes
Purpose: single control panel for model date, bank balance, recurring spend baselines, projection horizon, and rate assumptions.
Key inputs: manual model assumptions.
Key outputs: values consumed throughout workbook.
Notes: in Google Sheets this should become a very small, very stable config tab with named ranges.

## Projection_Helper
- Size: 49 rows x 7 cols
- Formula cells: 0
- Frozen panes: `A2`
- Key header row (approx): 1
- Visible fields: Date, Type, Bucket, Description, Amount, Scenario, Source
Purpose: normalized event table for future-dated inflows/outflows.
Key inputs: known obligations, modeled recurring expenses, investment receipts, optional funding sources.
Key outputs: date, type, bucket, description, amount, scenario, source.
Notes: this should become the canonical event ledger for all forward projections.

## Loan_Schedule
- Size: 407 rows x 10 cols
- Formula cells: 0
- Frozen panes: `A5`
- Key header row (approx): 4
- Visible fields: Due Date, Month #, Amortization, Interest, MIP, DFI, TAC, Total Payment, Remaining Balance, In Horizon?
Purpose: structured amortization/payment schedule pulled from ALTTO simulation.
Key inputs: ALTTO schedule assumptions.
Key outputs: due date, month number, amortization, interest, MIP, DFI, TAC, total payment, remaining balance, in-horizon flag.
Notes: in Sheets this should be importable from a raw amortization table or regenerated from loan parameters.

## Categorization_Rules
- Size: 11 rows x 8 cols
- Formula cells: 0
- Frozen panes: `A3`
- Key header row (approx): 2
- Visible fields: Priority, Regex / keyword, Category, Bucket, Recurring?, Applies to, Purpose, Notes
Purpose: reusable rule table for category/bucket assignment.
Key inputs: priority order, regex/keyword, category, bucket, recurring flag, applies-to scope.
Key outputs: deterministic first-pass classification for ledger rows.
Notes: this should become stronger and more deterministic over time as manual corrections accumulate.

## Shared_Daily_Summary
- Size: 29 rows x 5 cols
- Formula cells: 7
- Frozen panes: `A5`
- Key header row (approx): 14
- Visible fields: Month, Shared Daily, Other Major Shared, Remodel, Personal/Other
Purpose: simplified decision-useful summary of shared economics.
Key inputs: Shared_Ledger, Assumptions.
Key outputs: shared expenses captured, settlements, Greg net burden, Greg fair share, Greg owes Sabrina now, monthly directional summaries.
Notes: this is better for human review than Shared_Daily.

## Contribution_Imbalance
- Size: 21 rows x 3 cols
- Formula cells: 10
- Key header row (approx): 4
- Visible fields: Current exact calculation, Amount
Purpose: current and projected Greg vs Sabrina imbalance.
Key inputs: Shared_Daily_Summary, Projection_Helper, Assumptions.
Key outputs: exact current imbalance plus future modeled obligations split by bucket.
Notes: current math is exact at total level; future bucket splits are assumption-driven.

## Remodel_Dashboard
- Size: 18 rows x 4 cols
- Formula cells: 5
- Key header row (approx): 13
- Visible fields: Due Date, Description, Amount, Source
Purpose: compact remodel spending summary.
Key inputs: Shared_Ledger, Projection_Helper, Assumptions.
Key outputs: already paid, committed but unpaid, off-model risk, total captured remodel cost, near-term remodel need, major upcoming payments.
Notes: this is the main visibility layer for obra cash demands.
