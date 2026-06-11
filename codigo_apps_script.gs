// ============================================================
//  COLE ESTE CÓDIGO NO GOOGLE APPS SCRIPT
//  Passo a passo no arquivo INSTRUCOES.md
// ============================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    // ── PERGUNTA INICIAL (antes da oficina) ──────────────────
    if (data.tipo === 'medo_inicial') {
      var abaMedo = ss.getSheetByName("Medos_Iniciais");
      if (!abaMedo) {
        abaMedo = ss.insertSheet("Medos_Iniciais");
        abaMedo.appendRow(["Timestamp", "Resposta"]);
        abaMedo.getRange(1,1,1,2)
          .setBackground("#0D2D3E").setFontColor("#FFFFFF").setFontWeight("bold");
        abaMedo.setFrozenRows(1);
      }
      abaMedo.appendRow([data.ts || new Date().toISOString(), data.medo || ""]);

    // ── QUIZ FINAL ───────────────────────────────────────────
    } else {
      var abaQuiz = ss.getSheetByName("Respostas");
      if (!abaQuiz) {
        abaQuiz = ss.insertSheet("Respostas");
        abaQuiz.appendRow([
          "Timestamp", "Ferramenta preferida", "O que vai mudar",
          "Q3 Referências s/ verificar", "Q4 Declarar uso IA", "Q5 IA substitui pesquisador",
          "Confiança Claude", "Confiança ChatGPT", "Confiança NotebookLM",
          "Confiança Perplexity", "Confiança Zotero", "Palavra livre"
        ]);
        abaQuiz.getRange(1,1,1,12)
          .setBackground("#0D2D3E").setFontColor("#FFFFFF").setFontWeight("bold");
        abaQuiz.setFrozenRows(1);
      }
      abaQuiz.appendRow([
        data.ts || new Date().toISOString(),
        data.q1 || "", data.q2 || "",
        data.q3 || "", data.q4 || "", data.q5 || "",
        data.sc_Claude !== undefined ? data.sc_Claude : "",
        data.sc_ChatGPT !== undefined ? data.sc_ChatGPT : "",
        data.sc_NotebookLM !== undefined ? data.sc_NotebookLM : "",
        data.sc_Perplexity !== undefined ? data.sc_Perplexity : "",
        data.sc_Zotero !== undefined ? data.sc_Zotero : "",
        data.palavra || ""
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── TESTES MANUAIS ───────────────────────────────────────────

function testeMedo() {
  var fakeEvent = {
    postData: { contents: JSON.stringify({
      tipo: 'medo_inicial',
      medo: 'perder minha autoria como pesquisador',
      ts: new Date().toISOString()
    })}
  };
  Logger.log(doPost(fakeEvent).getContent());
}

function testeQuiz() {
  var fakeEvent = {
    postData: { contents: JSON.stringify({
      q1: "Claude", q2: "Verificar referências geradas pela IA",
      q3: "F", q4: "V", q5: "F",
      sc_Claude: 4, sc_ChatGPT: 3, sc_NotebookLM: 2, sc_Perplexity: 3, sc_Zotero: 2,
      palavra: "ferramenta",
      ts: new Date().toISOString()
    })}
  };
  Logger.log(doPost(fakeEvent).getContent());
}
