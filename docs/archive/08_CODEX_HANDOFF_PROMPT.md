# Codex Handoff Prompt

You are taking over a personal finance / remodel cashflow model that currently exists in an Excel workbook and needs to become a Google Sheets-native system.

## Objective
Rebuild the model so Google Sheets is the operational source of truth, with Apps Script handling import, categorization, projection rebuilds, dashboards, validations, and change logging.

## Source package
Use the files in this handoff pack, especially:
- 02_CURRENT_STATE.md
- 03_SHEET_SPEC.md
- 04_MODEL_LOGIC.md
- 05_DATA_DICTIONARY.md
- 06_TODO.md
- 07_GOOGLE_SHEETS_NATIVE_PLAN.md
- 09_ASSUMPTIONS_AND_RISKS.md
- 10_WORKBOOK_MANIFEST.json
- 12_APPS_SCRIPT_SCAFFOLD.gs

## Non-negotiables
- No merged cells
- Dates in yyyy-mm-dd
- Manual corrections override automated rules
- Append-only raw tabs
- One canonical future event table for projections
- One scenario engine
- Human-readable dashboards
- Maintainable and auditable change tracking

## Immediate deliverables
1. A Google Sheets tab architecture matching the handoff plan
2. Apps Script modules for:
   - import
   - normalize
   - classify
   - build projection events
   - rebuild funding plan / cashflow / dashboards
   - validate
   - write changelog
3. A deterministic categorization engine using the rules table
4. A remodel obligations table that feeds projection events
5. A contribution imbalance model with exact current total and projected future splits
6. Validation checks and a red-flag dashboard block

## Modeling priorities
1. Cashflow accuracy
2. Funding plan projection
3. Remodel spend visibility
4. Greg vs Sabrina imbalance
5. Investment net-of-tax accuracy

## Key design principle
Do not let dashboards contain hidden logic. Put logic in normalized tables and builder functions.

## First implementation milestone
- Get the following tabs working in Google Sheets:
  - Assumptions
  - Categorization_Rules
  - Projection_Events
  - Funding_Plan
  - Cashflow
  - Remodel_Dashboard
  - Contribution_Imbalance
- Then wire in raw imports and ledger normalization

## Ask of Codex
Produce:
- final tab schema
- Apps Script code
- migration instructions
- validation logic
- concise notes on any formula differences between Excel and Google Sheets
