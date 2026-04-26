// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Study League — Google Apps Script
//  الصق الكود ده في Google Apps Script وانشريه كـ Web App
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SHEET_NAME = "التقييمات";
const BONUS_NAMES = {
  b1: "Mind Map أو ملخص",
  b2: "وسيلة حفظ جديدة",
  b3: "مصدر تعليمي",
  b4: "شرح لصاحبك",
  b5: "حل مشكلة لصاحبك",
  b6: "تحسن في امتحان",
  b7: "مراجعة أخطاء",
  b8: "التزام كامل 15/15",
  b9: "جودة ملخص أو تصميم"
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    writeToSheet(data);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function writeToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      "التاريخ", "اسم الطالب", "الأسبوع", "الشهر",
      "الالتزام /5", "التنظيم /5", "الاستمرارية /5",
      "الدرجة الأساسية /15", "البونص", "الإجمالي",
      "البونص التفصيلي", "ملاحظة الطالب"
    ];
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0F172A");
    headerRange.setFontColor("#F5C842");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    sheet.setFrozenRows(1);
  }

  const bonusLabels = (data.bonuses || [])
    .map(id => BONUS_NAMES[id] || id)
    .join(" | ");

  const row = [
    new Date(data.submittedAt),
    data.studentName,
    data.week,
    data.month,
    data.pillarScores.commitment,
    data.pillarScores.organization,
    data.pillarScores.consistency,
    data.totalBase,
    data.totalBonus,
    data.totalBase + data.totalBonus,
    bonusLabels,
    data.note || ""
  ];

  sheet.appendRow(row);

  const lastRow = sheet.getLastRow();
  const rowRange = sheet.getRange(lastRow, 1, 1, row.length);
  rowRange.setFontFamily("Arial");
  rowRange.setFontSize(11);

  const total = data.totalBase + data.totalBonus;
  const scoreCell = sheet.getRange(lastRow, 10);
  if (total >= 13) {
    scoreCell.setBackground("#D1FAE5");
    scoreCell.setFontColor("#065F46");
  } else if (total >= 10) {
    scoreCell.setBackground("#FEF9C3");
    scoreCell.setFontColor("#713F12");
  } else {
    scoreCell.setBackground("#FEE2E2");
    scoreCell.setFontColor("#7F1D1D");
  }
  scoreCell.setFontWeight("bold");
  sheet.getRange(lastRow, 1).setNumberFormat("dd/mm/yyyy hh:mm");
  sheet.autoResizeColumns(1, row.length);
}

function testWrite() {
  const testData = {
    studentName: "طالب تجريبي",
    week: "2025-W35",
    month: "2025-08",
    submittedAt: new Date().toISOString(),
    pillarScores: { commitment: 4.5, organization: 4, consistency: 3.5 },
    totalBase: 12,
    totalBonus: 3,
    bonuses: ["b1", "b4"],
    note: "ده اختبار"
  };
  writeToSheet(testData);
  Logger.log("✅ تم الكتابة بنجاح!");
}
