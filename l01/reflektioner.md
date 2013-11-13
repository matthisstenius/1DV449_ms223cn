# Reflektioner Webbskrapning

Jag valde att arbete med Node.js, ramverket Express.js samt NOSQL databasen mongoDB med ORM:en mongoose. Jag valde node
eftersom det är väldigt smidigt att arbete med. Man kommer igång väligt snabbt med ett projekt och om man gillar att
arbeta med JavaScript som jag gör så är det väldigt trevligt. För själva skrapandet jobbade jag med
en biblotek som heter request. Request bygger på nodes inbyggda requestmodul och gör det oerhört smidigt att skicka med
cookies i headern tillexempel.

Risker med applikationer som innehåller skrapning är framförallt att man är helt beroende på att sidan man skrapar behåller
samma struktur som den hade när man byggde skrapan. Om struktiren ändras så kommer inte skrapan att fungera längre.
Om din applikation är beroende på den skrapande datan kan du även få problem om sidan du skrapar ligger nere eller liknande.
Om du inte har tillstånd att använda den informatin du skrapar kan du även få problem med lagen om det är så att du använder
tillexempel copyright information utan tillåtelse.

Problem som kan uppstå när man ska skrapa en webformssida är bland annat att webforms generar svårtydliga ID:n på sina taggar.
Vissa delar av sidan kan vara beroende på JavaScript för att kunna visas. Ett annat problem kan vara att den viewstate som finns
kan göra sidan långsam att skrapa.

I mitt försök att vara en god webbskrapare har jag sett till att felhantera koden. Jag kollar så att responsen från servern stämmer överens
med det jag försväntar mig innan jag går vidare. Detta är vktigt eftersom jag inte har någon direkt kontroll över om en resurs finns
eller inte. 

Jag har lärt mig hur man kan använda webbskrapning vilket är användbart i de fall man vill ha information och inget API finns.
Jag har även lärt mig att analysera en sidas uppbyggnad samt att inspektera de resuer som skickas till och från serverrn med 
HTTP protokollet. Jag har även lärt mig att uppskatta APIer mycket mer eftersom dessa är oerhört mycket trevligare att jobba med 
jämfört med när man skrapar information själv.