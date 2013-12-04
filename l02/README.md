# Laboration 2

# Uppgift 1 Optimering

## Flytta inlänkning av JavaScript till slutet av sidan
Webbläsare kan ladda resurser såsom css och bilder parallellt, vilket gör att sidan laddas snabbare än om bara en resurs kunde laddas åt gången. Javascript-filer blockar dock inladdningen vilket gör att alla resurser som länkas in efter en javascript fil måste vänta tills javascriptet är helt nedladdat förens de kan laddas in. Om man då har javascript inlänkat i början av HTML-filen kan inga andra resurser som kommer efter att laddas in, vilket gör att besökaren i värsta fall bara ser en vit (tom) sida innan javascriptet har laddats klart. Genom att istället länka in alla javascript-filer i slutet av HTML-filen har alla andra resurser redan laddats in utan att ha blockerats.

* Källa: (S Souders, High Performance Websites, 2007, 45-50)

### Effekt
* Laddningstid (innan): 2.40s
* Laddningstid (efter): 2.42s

### Reflektion
Lite förvånande så blev det nästintill ingen skillnad efter åtgärden. Medeladdningstiden blev till och med .2s långsammare. Detta tror jag beror på att jag endast flyttade de inlänkade javascript filerna och inte de inline scripten som fortfarande finns kvar i toppen på HTML-sidan.

## Flytta inline css & javascript till externa filer

Det är egentligen snabbare att ha css och javascript direkt i html-filen istället för i externa filer. Men då tittar man ganska snävt på problemet. Om man har css och javascript i externa filer får man istället fördelar såsom att dessa filer nu blir cachningsbara samt att man kan minimera dessa filer vilket gör att det blir mindre datamängd att skicka. En annan fördel med att ha dessa resurser i externa filer är att själva html-sidan blir mindre. Ponera att man har fem html-sidor som alla var tvungna att ha samma css och javascript. Om dessa resurser in fanns i externa filer så skulle varje html-sida behöva ha dem vilket skulle leda till tyngre sidor samt att klienten skulle behöva ladda ner dem varje gång istället för att kunna cacha dem vilket är möjligt med externa filer.

* Källa: (S Souders, High Performance Websites, 2007, 55-59)

### Effekt
* Laddningstid (före): 2.42
* Laddningstid (efter): 2.54

### Reflektion

Här ser vi ett ganska väntat resultat. Laddningstiden har ökat en del men det var väntat eftersom två nya requests görs mot servern. Allt som allt kommer ändå vinning av denna åtgärd bli positiv eftersom de två nya filerna nu kan bli cachade.

## Beskär och optimera bilder

Många av de bilder som används på sidan är betydligt mycket större (vissa uppemot 2mb) än vad de skulle behöva vara. Genom att skala ner bilderna samt optimera dem kan storleken reduceras vilket bidrar till att nedladdningstiden för bilderna kommer att minska.

### Effekt
* laddningstid (före): 2.54
* laddningstid (före): 2.29
* Laddningstid food.jpg (före): 1.07s
* Laddningstid food.jpg (efter):44ms

### Reflektion

Jag fick en liten vinning på att optimera bilden. Förvånande nog blev den totala inladdningen av sidan inte så mycket snabbare som förväntat. Med tanke på att inladdningstiden för bilden gick ifrån 1.07 sekunder till 44 millisekunder så trodde jag att det skulle påverka den totala inladdningen mer än det gjorde.

Värt att tänka på är att denna optimering kan vara kanska klurig om man inte har full kontroll på vilka bilder som kommer finnas på sidan. I många fall tillåter man tillexempel användarna att själva ladda upp bilder. I sådana fall bör man implementera någon lösning på servern som beskär och optimerar bilderna.

## Minimera javascript

Genom att minimera javascript bör laddningstiden påverkas positivt i och med att filens storlek blir mindre. När man minimerar javascript så tas alla kommentarer och blanksteg bort. Man kan även korta ner metodnamn och inparametrar till metoder genom att byta ut tillexempel "ettLängreMetodnamn" till "a". Allt detta leder till mindre kod vilket leder till en mindre fil vilket i sin tur leder till mindre data att ladda hem för klienten.

* Källa: (S Souders, High Performance Websites, 2007, 69-73)

### Effekt

* Laddningstid (innan): 2.29s
* Laddningstid (efter): 2.54s
* Laddningstid jQuery (innan): 341ms
* Laddningstid jQuery (efter): 182ms
* Laddningstid lightbox (innan): 98ms
* Laddningstid lightbox (efter): 2ms
* Laddningstid modernizr (innan): 52ms
* Laddningstid modernizr (efter): 43ms

### Reflektion

Här ser vi en tydlig vinning med att använda den minerade versionen av jQuery. Att den total laddningstiden på sidan blev lite högre än tidigare måste bero på andra faktorer. Men alla bäckar små som man brukar säga. Nu använder denna sida sig inte av så mycket javascript, men man kan verkligen tänka sig att den gör en betydlig skillnad på sidor som använder sig av mycket javascript. Så att minimera sina javascript är ett måste enligt mig.

## Konkatenera javascript och css

Genom att slå ihop flera filer till en fil reduceras antalet HTTP anrop vilket är oerhört viktigt för inladdningsprestanadan eftersom HTTP-anrop är väldigt kostsamma. En nackdel med att konkatenera filer är att man får en stor fil istället för flera mindre. En stor fil innebär att nedladdningen för den filen kommer att ta längre tid jämfört med de små. Men eftersom själva HTTP-anropet till servern är så kostsamt samt att filen kan cachas efter första anropet bör vinningen bli större med denna åtgärd.

* Källa: (S Souders, High Performance Websites, 2007, 15)

### Effekt 

* Laddningstid (innan): 2.54s
* Laddningstid (efter): 2.7s
* HTTP-anrop (innan): 19
* HTTP-anrop (efter): 14

### Reflektion

Genom att konkatenera javascript och css filerna till varsin fil så fick jag ned HTTP-anropen från 19 till 14 anrop. Att det inte bidrog till att laddningstiden minskades beror på att två css filer som laddas in från en annan server hoppar väldigt i sina anropstider. I teorin ska dock fem anrop mindre göra skillnad.

## Undvik redirects

Man bör undvika redirects i största möjliga mån eftersom de hindrar hela HTML dokumentet från att laddas in tills redirected är färdig. Innan jag gjorde denna optimering så gjordes det två redirects när en användare loggar in. Genom att ta bort den andra redirecten så bör prestandan påverkas positivt.

### Effekt

* Laddningstid (efter): -2s

### Reflektion

Genom att ta bort den andra redirected som gjordes fick jag bort en fördröjning på hela två sektunder. Detta gör att HTML dokumentet kan laddas in två sekunder snabbare än innan. Ett riktigt stort lyft när det kommer till inladdningsprestandan.

* Källa: (S Souders, High Performance Websites, 2007, 76-79)

## Byte av långsam server 

Applikationen hämtar två css-filer från servern http://vhost3.lnu.se:20080/~1dv449/scrape/. Denna server har externt långa responstider (över två sekunder) vilket påverkar hela sidans inladdningshasitighet på ett mycket negativt sätt. Genom att flytta dessa resurser till den egna servern kan mycket tid sparas.

### Effekt 

* Laddningstid (före): 2.7s
* Laddningstid (efter): 0.72s

### Reflektion

Genom att flytta resurser från den externt slöa servern till den egna servern kunde hela 2 sekunder skalas bort från laddningstiden. Detta är den absolut största vinningen av alla de optimeringar som jag har gjort. Det finns dock en del problem med denna optimering. 

Eftersom resurserna laddades in från en annan server kanske det fanns en tanke med det. Kanske var det någon annan utvecklare som hade som uppgift att underhålla just dessa filer och att han ville lagra dem på sin egen server. Eftersom resurserna inte längre länkas in från den servern så kommer inte ändringar som görs där att så igenom på sidan i dagsläget.

Jag personligen ser inte detta som ett jätte stort problem eftersom man kan kollaborera på Github eller liknande tjänster så att alla jobbar mot samma kodbas. I och med ett sådant workflow får man en massa andra fördelar såsom issue-tracking och versions hantering på köpet.

## Övriga optimeringar (inte implementerade)

### Skapa imagesprites

Vissa bildresurser skulle kunna bakas ihop till en spite. Detta betyder att man kombinerar flera bildfiler till en. Man kan sedan komma åt de olika bilderna via "position" attributet i css. Fördelen med denna princip är att man får ner antalet HTTP anrop.

# Uppgift 2 Säkerhet

## Paramatiserade SQL-satser

Inga av de sql-satser som körs mot databasen är paramatiserade. Detta gör att applikationen är öppen för SQL-injections. Detta är en mycket allvarlig brist som kan leda till att data läcker ut eller att någon tar bort hela databasen.

Detta hål gör det möjligt för hackare att skjuta in kod i tillexempel input fält. Eftersom denna kod inte behandlas på servern så skjuts den in i databasen och då kan hackaren komma åt uppgifter eller rent ut av förstöra databasen.

Genom att använda prepared statements innan sql-satserna körs så skyddat jag databasen mot sql-injections.

## Skydda mot xss

I nuvarande skick så är applikationen helt öppen för xss attacker i och med att input data inte tas om hand om på ett korrekt sätt.

Genom att html som skickas till klienten inte escapeas så kan en illasinnad användare skicka in ett javascript i ett formulär. När sedan denna input renderas ut på sidan så kommer script-taggen att renderas vilket gör det möjligt för det illasinnade javascriptet att exekveras.

Detta är livsfarligt eftersom en hackare då kan stjäla tillexempel kakor från användaren. Detta kan gå till på så vis att hackaren renderar ut en länk via sitt inskjutna skript. När nästa användare kommer och klickar på den länken skickas hans kakor ovetandes med till hackarens server.

Genom att escapa all html innan den skickas till klient strippas alla "<", ">" och "&" tecken. Då tolkar inte klienten strängen som en skript tag utan som en vanlig sträng. Skriptet kan inte exekveras och en eventuellt xss attack kan på så vis undvikas.

## Skydda mot CSRF (Cross site request forgery)

I nuvarande skick är webbappliaktionen sårbar för en CSRF-attack. CSRF står för Cross site request forgery och går ut på att något gör requests i ditt "namn" utan din vetskap.

Hur kan denna sårbarhet utnyttjas? Ponera att du är inloggad på tillexempel Facebook. En sessions kaka har sats i din klient så att du slipper logga in för varje request som körs mot Facebook. Innan din session har gått ut klickar du på en länk går till en hackades sida. Den skadliga sidan som du är inne på börjar köra requests mot Facebook och eftersom din sessionskaka fortfarande är giltig tror Facebook att det är du som gör förfrågan och autentiserar dig.

Detta är givetvis livsfarligt eftersom en den skadliga sidan nu kan skicka tillexempel "friend requests" i ditt namn eller skriva på din "wall". 

För att förhindra CSRF-attacker kan man generera en unik token i samband med att sessionen sätts. Denna token kan man sedan placera i ett dolt input-fält. När du gör en post till sidan så kommer tokenen att skickas med till servern som jämför den med tokenen som finns i sessionen. Eftersom dessa två stämmer överens så kan förfrågan fortsätta att behandlas. Om nu en skadlig sida försöker att skicka en förfrågan till severn så kommer inte den dolda tokenen att skickas med eftersom den skadliga sidan inte har tillgång till html-koden. Eftersom ingen token kommer att skickas med till servern så kommer inte jämförelsen att gå igenom och förfrågan inte att behandlas.

## Blev inte utloggad

I applikationens grundskick så var "utloggningen" implementerad i javascript. När man klickade på "Logga ut" gjordes enbart en window.location till index-sidan vilket gjorde att sessionen forfarande var aktiv och att man kunde komma åt sidan som krävde inloggning.

Detta synnerligen allvarliga säkerhetshål kan utnyttjas av andra som har åtkomst till samma dator. Om person a är inloggad och loggar ut tror den att den är helt utloggad eftersom inloggninssidan visas. Men eftersom sessionen inte har tagits bort så kan person b komma åt person a:s konto om denne har åtkomst till samma dator och att sessionen inte har gått ut.

Om person b kan komma åt person a konto så kan person b göra vad som helst eftersom han har full åtkomst till kontot.

Jag har täppt igen detta hål genom att sköta utläggningen på severn som tar bort sessionen när en utloggning sker. På så vis så kan man inte komma åt sidor som kräver inloggning förens man loggat in igen.

# Uppgift 3 Ajax

Innan var man tvungen att ladda om sidan för att få se det meddelande man precis skrivit. Även fast meddelandet postades via Ajax så renderades det inte ut direkt i Javascriptet. Detta gjorde att användaren själv var tvungen att ladda om sidan så att det nya meddelandet hämtades från databasen och sedan visades på sidan.

Genom att rendera ut meddelandet direkt i callback-metoden som kallas när anropet är klart så renderas meddelandet nu direkt vilket gör att användaren slipper att ladda om sidan.

Detta ger även effekten att sidan känns snabbare eftersom användaren som skriver meddelandet direkt kan se sitt nya meddelande.

[Repo](https://github.com/matthisstenius/1DV449_ms223cn/tree/master/l02)