# Finance Workbook -> Codex Handoff Pack

This package is the working handoff for continuing the finance model in Codex and migrating it to a **Google Sheets-native** workflow.

## Included files

- `march_cashflow_schedule_v5_with_investments_final_v2.xlsx` — current workbook snapshot
- `01_README.md` — overview and how to use this handoff
- `02_CURRENT_STATE.md` — what the workbook currently does
- `03_SHEET_SPEC.md` — sheet-by-sheet purpose, inputs, outputs, and dependencies
- `04_MODEL_LOGIC.md` — how the model works today
- `05_DATA_DICTIONARY.md` — key columns, entities, and table semantics
- `06_TODO.md` — prioritized backlog
- `07_GOOGLE_SHEETS_NATIVE_PLAN.md` — target architecture for Sheets + Apps Script + GitHub
- `08_CODEX_HANDOFF_PROMPT.md` — ready-to-paste prompt for Codex
- `09_ASSUMPTIONS_AND_RISKS.md` — assumptions, ambiguities, and validation gaps
- `10_WORKBOOK_MANIFEST.json` — machine-readable sheet manifest
- `11_BACKLOG.csv` — backlog in CSV form
- `12_APPS_SCRIPT_SCAFFOLD.gs` — starter Apps Script skeleton
- `13_FORMULA_NOTES.md` — important formulas and migration notes

## Current workbook snapshot

File: `march_cashflow_schedule_v5_with_investments_final_v2.xlsx`

Core tabs:
- Cashflow
- Funding Plan
- Raw_Ledger_All
- Shared_Ledger
- Shared_Daily
- NuCarta_Ledger
- NuCarta_Monthly
- Investments_Inventory
- Assumptions
- Projection_Helper
- Loan_Schedule
- Categorization_Rules
- Shared_Daily_Summary
- Contribution_Imbalance
- Remodel_Dashboard

## Immediate goal

Move from a brittle file-based workbook to a **single Google Sheets source of truth** with:

1. append-only raw import tabs
2. deterministic categorization rules
3. one projection event table
4. one scenario engine
5. dashboards built off those tables
6. Apps Script for import / refresh / validation
7. GitHub version control for script + docs, not for binary xlsx files

## What Codex should do first

1. Create a Google Sheet with the target tabs listed in `07_GOOGLE_SHEETS_NATIVE_PLAN.md`
2. Port the logic of `Assumptions`, `Projection_Helper`, `Funding Plan`, `Cashflow`, `Remodel_Dashboard`, and `Contribution_Imbalance`
3. Add Apps Script utilities for import, categorization, and rebuild
4. Preserve manual override surfaces for category / bucket / owner / remodel flags
5. Add change logging and validation checks

## Non-negotiables

- No merged cells
- Preserve logical column order
- Dates in `yyyy-mm-dd`
- Manual corrections always override rules
- Use one main field, not “guess vs override” duplicate columns, except where an explicit override field is operationally necessary
- Keep future ingestion append-only
