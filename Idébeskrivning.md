# What Are they up to

Den mashup-applikation som jag har valt att göra har arbetsnamnet "What Are They Up to". Tanken med applikationen är att användaren ska kunna få en snabb inblick i vad människor har för sig på olika platser runt om på jorden. Användaren söker på tillexempel "Stockholm" så kommer ett flöde tillbaka som försöker att visa vad människor i Stockholm gör.

Genom att använda mig av Instagrams och Twitters api:er kan jag hämta hem bilder samt tweets från från den sökterm som användaren har matat in. Genom att mixa bilderna och tweetsen får användaren en bra inblick i vad människor gör på den valda platsen, dels genom att se bilder, dels genom att läsa tweets.

Jag kommer även att använda mig av Google Places API för att transformera söksträngen till koordinater. Med hjälp av koordinaterna kan jag få en mer exakt sökning på tweets inom ett visst område. Bilderna från Instagrams kommer att hämtas med hjälp av en sökning på hashtags som har den givna söksträngen i sig.

I mån av tid kommer jag även att använda mig av Foursquare's api för att kunna mappa ut de mest populäraste platserna inom det sökta området på en karta.