function doGet(e) {
    return ContentService.createTextOutput("GAS is ready.");
}

function doPost(e) {
    const data = JSON.parse(e.postData.contents);
    const { title, questions, folderPath } = data; // folderPath: ["T-Lab", "テスト", "2026年度"]

    try {
        const folder = getOrCreateFolderRecursive(folderPath);
        const form = FormApp.create(title);
        const formFile = DriveApp.getFileById(form.getId());
        formFile.moveTo(folder);

        // スプレッドシート連携（成績管理用）
        const ss = SpreadsheetApp.create(title + "_成績管理");
        const ssFile = DriveApp.getFileById(ss.getId());
        ssFile.moveTo(folder);
        form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

        // クイズ設定
        form.setIsQuiz(true);
        form.setAllowResponseEdits(false);
        form.setCollectEmail(false);

        questions.forEach((q) => {
            const item = form.addMultipleChoiceItem();
            item.setTitle(q.text)
                .setChoices(q.options.map((opt, idx) =>
                    item.createChoice(opt, idx === q.correctIndex)
                ))
                .setPoints(5)
                .setRequired(true);

            const feedback = FormApp.createFeedback()
                .setText(q.explanation)
                .build();
            item.setFeedbackForCorrect(feedback);
            item.setFeedbackForIncorrect(feedback);
        });

        // 成績管理シートの初期設定（番号管理用）
        const sheet = ss.getSheets()[0];
        sheet.getRange("A1:C1").setValues([["出席番号", "氏名", "合計点"]]);
        sheet.setFrozenRows(1);

        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            formUrl: form.getPublishedUrl(),
            editUrl: form.getEditUrl(),
            ssUrl: ss.getUrl()
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function getOrCreateFolderRecursive(pathArray) {
    let currentFolder = DriveApp.getRootFolder();
    for (const name of pathArray) {
        const folders = currentFolder.getFoldersByName(name);
        if (folders.hasNext()) {
            currentFolder = folders.next();
        } else {
            currentFolder = currentFolder.createFolder(name);
        }
    }
    return currentFolder;
}
