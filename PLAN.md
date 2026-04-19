# PLAN

## Current Goal

- Archive this repo; confirm finnie has all needed context

## Code Review Findings (per CODE.md)

### Bugs / Correctness

- [x] **`.xlsx` and `.zip` data files are correctly gitignored** — `march_cashflow_schedule_v5_...xlsx` and `finie_fresh_start_pack.zip` are present on disk but NOT tracked (`git ls-files` confirms). `.gitignore` has `*.xlsx` and `*.xls`. No personal financial data is committed.

- [ ] **`12_APPS_SCRIPT_SCAFFOLD.gs` line 59 — `applyRules_()` ignores its `rows` parameter and returns it unchanged**
  - `applyRules_(rows, rules, overrides)` has a `// TODO` comment and `return rows` with no logic. It is called by `rebuildCategorizations()` (implied by the scaffold structure). This is expected for a handoff scaffold but means the function signature is misleading — callers assume enrichment has happened.
  - No fix needed now (archived repo), but note for finnie: ensure the real implementation enriches rows before returning.

- [ ] **`12_APPS_SCRIPT_SCAFFOLD.gs` line 132 — `snapshotChangeLog()` is called inside `refreshDashboards()` (line 118), creating an unintended coupling**
  - If `snapshotChangeLog` throws (e.g. sheet missing), it breaks the entire dashboard refresh mid-run with no partial rollback. In Apps Script there is no transaction support.
  - Note for finnie: call `snapshotChangeLog` as a separate step after dashboard rebuild, wrapped in its own try/catch.

### Code Quality

- [ ] **`10_WORKBOOK_MANIFEST.json` and `11_BACKLOG.csv` are committed — these are spec/planning artifacts and appropriate to track, but `10_WORKBOOK_MANIFEST.json` may contain personal financial structure details**
  - Checked: file contains sheet names and column definitions (not raw financial data). Safe to leave tracked.

- [ ] **`finie_fresh_start_pack/` directory (16 items) is not gitignored but was not committed**
  - Untracked directory with 16 files — likely the same content as `finie_fresh_start_pack.zip`. Neither is committed, which is correct. However, the `.gitignore` does not explicitly exclude `finie_fresh_start_pack/` or `*.zip`, so a future `git add .` could accidentally commit them.
  - Fix: add `finie_fresh_start_pack/` and `*.zip` to `.gitignore`

- [ ] **Scaffold function `getConfig_()` at line 35 always returns `{}`**
  - Every scaffold function that needs config (e.g. Drive folder IDs) calls `getConfig_()` which returns nothing. When handed off to finnie/Codex, this is the first thing to implement, but it is not documented in the scaffold comments.
  - Note for finnie: `getConfig_()` must read from a named range or a dedicated Config sheet before any other function works.

### Usability / Ops

- [x] XLSX and personal data correctly gitignored
- [ ] Add `finie_fresh_start_pack/` and `*.zip` to `.gitignore`
- [ ] Archive this repo (set to read-only on GitHub)
- [ ] Confirm `finnie` has all context from `06_TODO.md` / `11_BACKLOG.csv`

## Now

- [ ] Add `finie_fresh_start_pack/` and `*.zip` to `.gitignore` to prevent accidental commit
- [ ] Archive repo on GitHub (Settings → Archive)
- [ ] Verify finnie PLAN.md covers all P0/P1 items from `11_BACKLOG.csv`

## Notes

- Archived / reference repo — superseded by `finnie`
- No active development; no code to execute here
