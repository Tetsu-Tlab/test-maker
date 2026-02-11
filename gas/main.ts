function doGet(e: any) {
    return ContentService.createTextOutput("GAS is ready.");
}

function doPost(e: any) {
    const data = JSON.parse(e.postData.contents);
    const { title, questions, folderName } = data;

    try {
        const folder = getOrCreateFolder(folderName);
        const form = FormApp.create(title);
        const formFile = DriveApp.getFileById(form.getId());
        formFile.moveTo(folder);

        // スプレッドシート連携
        const ss = SpreadsheetApp.create(title + "_成績");
        const ssFile = DriveApp.getFileById(ss.getId());
        ssFile.moveTo(folder);
        form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

        form.setIsQuiz(true);

        questions.forEach((q: any) => {
            const item = form.addMultipleChoiceItem();
            item.setTitle(q.text)
                .setChoices(q.options.map((opt: string, idx: number) =>
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

        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            formUrl: form.getPublishedUrl(),
            editUrl: form.getEditUrl()
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error: any) {
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function getOrCreateFolder(folderName: string) {
    const root = DriveApp.getRootFolder();
    const folders = root.getFoldersByName(folderName);
    if (folders.hasNext()) {
        return folders.next();
    } else {
        return root.createFolder(folderName);
    }
}
