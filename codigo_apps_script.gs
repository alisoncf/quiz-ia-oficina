// ============================================================
//  COLE ESTE CÓDIGO NO GOOGLE APPS SCRIPT
// ============================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    if (data.tipo === 'medo_inicial') {
      var abaMedo = ss.getSheetByName("Medos_Iniciais");
      if (!abaMedo) {
        abaMedo = ss.insertSheet("Medos_Iniciais");
        abaMedo.appendRow(["Timestamp", "Resposta"]);
        abaMedo.getRange(1,1,1,2).setBackground("#0D2D3E").setFontColor("#FFFFFF").setFontWeight("bold");
        abaMedo.setFrozenRows(1);
      }
      abaMedo.appendRow([data.ts || new Date().toISOString(), data.medo || ""]);

    } else {
      var abaQuiz = ss.getSheetByName("Respostas");
      if (!abaQuiz) {
        abaQuiz = ss.insertSheet("Respostas");
        abaQuiz.appendRow([
          "Timestamp","Ferramenta preferida","O que vai mudar",
          "Q3","Q4","Q5",
          "Confiança Claude","Confiança ChatGPT","Confiança NotebookLM",
          "Confiança Perplexity","Confiança Zotero","Palavra livre"
        ]);
        abaQuiz.getRange(1,1,1,12).setBackground("#0D2D3E").setFontColor("#FFFFFF").setFontWeight("bold");
        abaQuiz.setFrozenRows(1);
      }
      abaQuiz.appendRow([
        data.ts || new Date().toISOString(),
        data.q1||"", data.q2||"",
        data.q3||"", data.q4||"", data.q5||"",
        data.sc_Claude!==undefined?data.sc_Claude:"",
        data.sc_ChatGPT!==undefined?data.sc_ChatGPT:"",
        data.sc_NotebookLM!==undefined?data.sc_NotebookLM:"",
        data.sc_Perplexity!==undefined?data.sc_Perplexity:"",
        data.sc_Zotero!==undefined?data.sc_Zotero:"",
        data.palavra||""
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({status:"ok"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status:"error",message:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── LEITURA DOS DADOS PARA O PAINEL ─────────────────────────
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = { medos: [], quiz: [] };

  var abaMedo = ss.getSheetByName("Medos_Iniciais");
  if (abaMedo && abaMedo.getLastRow() > 1) {
    var mRows = abaMedo.getRange(2, 1, abaMedo.getLastRow()-1, 2).getValues();
    result.medos = mRows.map(function(r){ return r[1]; }).filter(function(v){ return v; });
  }

  var abaQuiz = ss.getSheetByName("Respostas");
  if (abaQuiz && abaQuiz.getLastRow() > 1) {
    var qRows = abaQuiz.getRange(2, 1, abaQuiz.getLastRow()-1, 12).getValues();
    result.quiz = qRows.map(function(r){
      return {
        q1:r[1], q2:r[2], q3:r[3], q4:r[4], q5:r[5],
        sc_Claude:r[6], sc_ChatGPT:r[7], sc_NotebookLM:r[8],
        sc_Perplexity:r[9], sc_Zotero:r[10], palavra:r[11]
      };
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── TESTES ───────────────────────────────────────────────────
function testeMedo() {
  try {
    var nome = SpreadsheetApp.getActiveSpreadsheet().getName();
    Logger.log("Planilha: " + nome);
    var fakeEvent = { postData: { contents: JSON.stringify({
      tipo:'medo_inicial', medo:'perder minha autoria como pesquisador',
      ts: new Date().toISOString()
    })}};
    Logger.log(doPost(fakeEvent).getContent());
  } catch(e) { Logger.log("ERRO: " + e.toString()); }
}

function testeQuiz() {
  try {
    var fakeEvent = { postData: { contents: JSON.stringify({
      q1:"Claude", q2:"Verificar referências geradas pela IA",
      q3:"F", q4:"V", q5:"F",
      sc_Claude:4, sc_ChatGPT:3, sc_NotebookLM:2, sc_Perplexity:3, sc_Zotero:2,
      palavra:"ferramenta", ts: new Date().toISOString()
    })}};
    Logger.log(doPost(fakeEvent).getContent());
  } catch(e) { Logger.log("ERRO: " + e.toString()); }
}

function testeGet() {
  Logger.log(doGet({}).getContent());
}
