class Notes {
    constructor(dueOn, finishedOn, header, todoText, importance) {
        this.dueOn = dueOn;
        this.finishedOn = finishedOn;
        this.header = header;
        this.todoText = todoText;
        this.importance = importance;
    }
}

function loadData() {
    const noteEntryTemplate = document.getElementById("note-entry-template").innerHTML;
    const template = Handlebars.compile(noteEntryTemplate);
    const html = template({
        todos: [
            new Notes("26.04.2020", "21.05.2020", "Mami anrufen", "079 123 45 67"),
            new Notes("24.05.2020", "heute", "CAS FEE Selbststudium", "HTML für die note App erstellen"),
            new Notes("morgen", null, "Einkaufen", "Butter, Eier"),
        ]
    });
    document.getElementById("div_todo_components").innerHTML += html;
}

loadData();