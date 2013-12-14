## Del 1 - Projektidé

Min projektidé är att ge en inblick i vad folk gör på olika platser runt om på jorden. Tanken är att som användare av min applikation kunna välja en plats och få en inblick i vad folk som befinner sig på den valda platsen har för sig.

Tanken är att hämta bilder från Instagram och tweets från Twitter. Jag har valt dessa två källor eftersom bilderna från Instagram ger en rolig och i många fall intressant inblick i människors vardag och informationen från Twitter ger en inblick i vad som sägs om den valda platsen.

Jag kommer även att hämta koordinater från Goggle Places Api, får att på så vis kunna transformera den inmatade platsen till longitud och latitud koordinater. På så vis kan jag få ut mer precis information från Twitter.

Bilderna från Instagram kommer att hämtas ut med hjälp av sökning på hashtags som matchar den givna platsen. Hämtningar av tweets kommer att göras med hjälp av koordinater från den angivna platsen eller en sökning av den angivna platsen om inga koordinater kunnat hämtas.

### Dokumentation - Instagram

Instagrams api-dokumentation är väldigt enkel och lättförstådd. Det går snabbt att överblicka vilka metoder som API:et erbjuder, men även snabbt att navigera till specifik mer information över en viss metod. I dokumentationen hittar man enkel beskrivning av vad metoden erbjuder, exempel på hur man anropar metoden, de olika parametrar som kan användas samt exempel på hur svaret ser ut.

__Dataformat__: JSON

__Begränsningar__: För att kunna använda Instagrams api måste ma n först registrera sin applikation. Man blir då tilldelad en "application secret" som man måste skicka med varje anrop för att på så vis autentisera sig. De har även en begränsning i antalet anrop som får göras i from av 5000 anrop i timmen från en och samma klient.

__Risker__: Risker som alltid finns när man använder sig av externa api:er, nämligen att de kan sluta fungera eller sluta uppdateras finns givetvis också i Instagrams api. Utöver det så bör man ha i åtanke att det bara är bildlänkarna man hämtar från api:et vilket gör att själva bilden måste hämtas den med. Det är då givetvis inte så smart att hämta 200 bilder och sedan rendera ut all på samma gång eftersom detta skulle leda till 200 ytterligare anrop för att hämta hem bilderna. Detta skulle i sin tur leda till den slö inladdnings tid för applikationen och en inte så glad användare.

### Dokumentation - Twitter

Tillskillnad från Instagrams api-dokumentation så är Twitters api-dokumentation inte lika lätt navigerad. Det tog ett tag att få en grundläggande överblick. Ofta när man kom till den mer specifika informationen visade det sig att den inte längre var aktuell. Det fanns i och för sig en länk till den uppdaterade informationen men det hade varit bättre och lättare om man direkt blev hänvisad till den nyaste versionen av api:et. Om man dessutom läser dokumentationen lite slarvigt eller vara ska kolla upp ett visst anrop finns risken att man missar att informationen inte är den senaste. Det gick i många fall faktiskt lättare att google och på så vis hamna rätt i dokumentationen.

När man väl hittat rätt så var informationen tydlig och lätt att sätta sig in i. De erbjuder en tydlig lista på alla parametrar som kan användas vid anropet samt en beskrivning till vad varje parameter gör. De visar även exempel på hur ett anrop kan byggas samt hur responsen från anropet är formaterat. Det finns även en ruta med information om begränsningar samt om det krävs autentisering för det aktuella anropet vilket är smidigt eftersom man direkt kan få en uppfattning om det kommer att fungera med sina applikations behov.

__Dataformat__: JSON

__Begränsningar__: För att få använda sig av api:et så måste man registrera sin applikation hos twitter. Man måste även via sin applikation göra ett anrop för att få ut sin "application token" för att kunna göra vidare anrop. Detta är lite mer komplicerat än de flesta andra api:er där man man får en statisk nyckel som skickas med varje anrop eftersom man måste skriva kod för att hämta ut sin nyckel i fallet med Twitter.

Det finns även begränsningar med antalet anrop som får göras. Dessa skiljer sig lite beroende på vilka delar av api:et man använder samt om du använder en nyckel för varje användare eller en nyckel för hela applikationen. Om man tillexempel bara ska söka efter tweets, får man göra 180 anrop varje kvart. 

__Risker__: Som beskrivit tidigare finns alltid risken att api:et slutar att fungera.

### Dokumentation Google Places API

Google places api var väldigt bra strukturerat och lättnavigerat. Genom en bra utformad meny kan man snabbt hitta den del av api:et man söker. När man väl hittat till den informationen står det ganska mycket om hur man använder den samt exempel på hur anrop kan se ut samt hur responsen är utformad. Det som är extra skönt med api:et är att de inte kräver att du ska använda dig av en nyckel vilket gör att det går snabbt att komma igång.

__Dataformat__: JSON/XML

__Begränsningar__: Om man använder api:et utan att registrera sin applikation får man göra 1000 anrop varje dygn. Om man däremot stärker sin identitet genom att registrera sitt kreditkort får man göra 100 000 anrop varje dygn. Enligt dokumentationen ska det inte kosta något extra utan enbart vara ett sätt för Google att stärka din identitet.

__Risker:__ En risk med api:et kan vara att den platssträng som tillexempel "stockholm" inte kan översättas till koordinater vilket är api:ets syfte. Det gäller då att man kan falla tillbaka på någonting så att inte hela applikationen faller bara för att man inte kan hitta de exakta koordinaterna. Om det är så att applikationen absolut inte kan fungera utan de exakta koordinaterna bör man kanske fundera på att använda sig av geo locations api:et och kräva att användaren har stöd för det för att kunna använda applikationen.

## Del 2 - Fallstudie 

Jag har valt att kika lite närmare på en applikation som heter _Tink_. _Tink_ är en ekonomiapplikation som samlar alla dina konton från dina olika banker och presenterar den informationen på ett snyggt och pedagogiskt vis. Då kan dels få en överblick på dina saldon från alla dina olika konton, vilket är väldigt smidigt eftersom du bara behöver logga in på ett ställa istället för att logga in på alla dina olika banksidor för att se dina saldon. 

Utöver att presentera information över dina banksaldon så visar _Tink_ alla dina transaktioner och försöker automatiskt att kategorisera dem åt dig. De erbjuder även olika vyer så att du kan se inom vilket kategori som du spenderat mest pengar och även jämföra med hur du spenderade dina pengar över tid. Man kan överblicka enstaka månader eller år för att få en historisk insikt om hur man spenderat sina pengar eller tillexempel hur mycket man har spenderat på mat de seanser tre månaderna. 

En annan väldigt smidigt aspekt med _Tink_ är att man kan få notiser när en ovanligt stor summa har dragits från ditt konto. Efter att man har använt _Tink_ ett tag lär den sig om vilka summor som brukar dras från dina konton och kan på så vis varna om en ovanligt stor summa dragits. Detta är förstås väldigt smidigt eftersom du snabbt kan bli varse om någon har kapar ditt konto.

_Tink_ är som sagt ett väldigt smidig mashup-applikation som hämtar data från dina olika konton och presenterar den datan på ett pedagogiskt och visuellt tilltalande sätt. Den för också in vissa AI element genom att den själv försöker att kategorisera dina transaktioner och lär sig om storleken på din olika transaktioner.

### Källor 

* Instagram API Endpoints, Instagram Developer Documentation, 2013 [http://instagram.com/developer/endpoints/](http://instagram.com/developer/endpoints/)

* Instagram API Locations, Instagram Developer Documentation, 2013 [http://instagram.com/developer/endpoints/locations/](http://instagram.com/developer/endpoints/locations/)

* Documentation, Twitter Developers, 2013, 
[https://dev.twitter.com/docs](https://dev.twitter.com/docs)

* GET Search/tweets, Twitter Developers, 2013, 
[https://dev.twitter.com/docs/api/1.1/get/search/tweets](https://dev.twitter.com/docs/api/1.1/get/search/tweets)

* REST API Rate Limiting in v1.1, Twitter Developers, 2013, [https://dev.twitter.com/docs/rate-limiting/1.1](https://dev.twitter.com/docs/rate-limiting/1.1)

* Place Search, Google Places API, 2013, 
[https://developers.google.com/places/documentation/search](https://developers.google.com/places/documentation/search)

* Usage Limits, Google Places API, 2013, 
[https://developers.google.com/places/policies#usage_limits](https://developers.google.com/places/policies#usage_limits)