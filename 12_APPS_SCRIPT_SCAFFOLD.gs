/**
 * Finance workbook Google Sheets migration scaffold
 *
 * Purpose:
 * - import raw files
 * - normalize ledgers
 * - apply categorization rules
 * - rebuild projection events
 * - refresh dashboards
 * - validate model state
 * - log changes
 *
 * This is a scaffold only. Codex should turn this into working modules.
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Finance')
    .addItem('Import new files', 'importNewFiles')
    .addItem('Rebuild categorizations', 'rebuildCategorizations')
    .addItem('Rebuild projections', 'rebuildProjections')
    .addItem('Refresh dashboards', 'refreshDashboards')
    .addItem('Run validations', 'runValidations')
    .addItem('Snapshot change log', 'snapshotChangeLog')
    .addToUi();
}

function getSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error(`Missing sheet: ${name}`);
  return sheet;
}

function getConfig_() {
  // TODO: read Config / Assumptions / folder ids / run settings
  return {};
}

function importNewFiles() {
  // TODO:
  // 1. read Drive folders from Config
  // 2. identify new CSV/PDF/manual source files
  // 3. append rows into raw tabs
  // 4. store source file id / import timestamp / unique hash
  // 5. write Change_Log entry
}

function normalizeLedgers_() {
  // TODO:
  // - normalize dates
  // - normalize amounts/signs
  // - parse installments
  // - derive transaction month / statement month
  // - derive merchant normalized
  // - preserve raw fields
}

function applyRules_(rows, rules, overrides) {
  // TODO:
  // Rule priority:
  // 1. manual override
  // 2. exact match rule
  // 3. regex rule
  // 4. fallback
  // Return enriched rows with:
  // category, bucket, recurring, rule_id, review_flag
  return rows;
}

function rebuildCategorizations() {
  // TODO:
  // 1. load normalized ledgers
  // 2. load rules
  // 3. load manual overrides
  // 4. write enriched ledgers back
  // 5. write Change_Log entry
}

function rebuildProjectionEvents() {
  // TODO:
  // Build Projection_Events from:
  // - Remodel_Obligations
  // - Loan_Schedule
  // - recurring shared assumptions
  // - investment liquidation options
  // - expected deposits/funding
  // - other committed obligations
}

function rebuildFundingPlan_() {
  // TODO:
  // Build daily scenario engine:
  // Open / In / Out / PreClose / Funding Need / End
}

function rebuildCashflow_() {
  // TODO:
  // Update executive summary tab from Funding_Plan and Projection_Events
}

function rebuildRemodelDashboard_() {
  // TODO:
  // Compute already paid / committed unpaid / off-model risk / near-term need
}

function rebuildContributionImbalance_() {
  // TODO:
  // Current exact total from shared ledger mechanics
  // Future modeled by bucket/scenario
}

function refreshDashboards() {
  rebuildFundingPlan_();
  rebuildCashflow_();
  rebuildRemodelDashboard_();
  rebuildContributionImbalance_();
  snapshotChangeLog();
}

function runValidations() {
  // TODO:
  // - duplicate ids
  // - missing dates
  // - missing categories/buckets
  // - missing investment application dates
  // - scenario rows outside horizon
  // - negative net liquidation
  // Write results to Validation sheet
}

function snapshotChangeLog() {
  // TODO:
  // append timestamped note to Change_Log
}

function writeRows_(sheetName, rows) {
  // TODO: safe bulk write helper
}

function readTable_(sheetName) {
  // TODO: generic table reader
  return [];
}
