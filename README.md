# CASFEE Project1 von Sarah Bur

## Install und Start
npm install<br>
npm start

## Inhalt und Funktionalität
- <b>controller > notes-controller-backen.js</b><br>wird vom Notes-Router aufgerufen, ruft den DB-Service auf und setzt die Resultate als JSON in die Response)

- <b>data > notes.db</b><br>DB-File

- <b>public > css > style.css</b><br>Style-Sheet für die Notez-Applikation

- <b>public > html >  index.html</b><br>HTML für die Notez-Applikation

- <b>public > images > background.jpg</b><br>Hintergrundbild für den Titelbereich

- <b>public > scripts > bl > date-formatter.js</b><br>Hilfsklasse für Datumsformate

- <b>public > scripts > dl > notes-rest-service.js</b><br>Logik der client-seitigen REST-API

- <b>public > scripts > dl > notes-storage-ajax.js</b><br>Ruft die client-seitige REST-API auf und bereitet die Daten für die Anzeige im HTML auf.

- <b>public > scripts > ui > notes-controller.js</b><br>Schnittstelle zwischen HTML und Javascript. Handelt die Events ab und befüllt die HTML Container mit Daten.

- <b>public > scripts > utils > cookie.js</b><br>Interpretiert den Cookie-String und bereitet ihn auf, damit dieser im Notes-Controller verwendet werden kann.

- <b>public > scripts > utils > handlebar-helpers.js</b><br>Enthält die benötigten Handlebar-Helpers (Datumsformat, Zeilenumbrüche und die Wichtigkeit). 

- <b>public > scripts > utils > shared.js</b><br>Enthält diverse Enums und die compare-Methode.

- <b>public > scripts > bootstrapper-index.js</b><br>Initialisiert die Notez-Applikation.

- <b>public > favicon.ico</b>

- <b>routes > note-routes.js</b><br>Verbindet die verschiedenen REST-Aufrufe mit den entsprechenden Methoden des Backend-Note-Controllers.

- <b>services > note-db-handler.js</b><br>Schnittstelle zur Datenbank

- <b>index.js</b><br>Startpunkt des Backend-Servers

- <b>package.json</b>

- <b>package-lock.json</b>


