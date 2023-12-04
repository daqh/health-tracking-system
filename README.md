# Health Traking System

health-tracking-system è un sistema Cloud-based ideato per il tracciamento di dati sanitari da dispositivi IoT, realizzato come progetto Universitario per il corso di *Cloud Computing* del dipartimento di informatica presso l'Università degli Studi di Salerno.

## Missione

<descrizione del progetto>

I concetti sulla base dei quali, sono state motivate le scelte relative ai servizi e alle tecnologie impiegate per la realizzazione di questo servizio sono due: la **semplicità di migrazione**, intesa come la capacità di poter cambiare in maniera economica e veloce il *Cloud Provider* di riferimento, in questo caso rappresentato da *Microsoft Azure*; il desiderio di scrivere **meno codice**, prediligendo soluzioni *ready-to-use* tipiche del *Cloud Computing*.

## Architettura

Di seguito è riportata l'architettura generale del sistema, progettato indipendentemente dal fatto che saranno successivamente integrati servizi forniti dal Cloud Provider Azure.

![General Architecture](assets/Health%20Tracking%20System%20-%20General%20Architecture.drawio.png)

### Frontend

### App Service vs Static Web App

Nonostante il titolo della sezione, tra le diverse componenti che strutturano questa architettura, il frontend sicuramente si distingue per l'assenza di *Trade Off* nella scelta del servizio, infatti, nonostante la nostra applicazione non abbia la necessità di gestire un frontend molto complesso, l'utilizzo di un framework è desiderabile al fine di scrivere interfacce complesse evitando la ridondanza del codice. In generale, per la maggior parte delle applicazioni, questo può essere guidato principalmente da motivazioni estetiche, sulla base di varie ed eventuali componenti più o meno accattivanti che sono integrati in maniera predefinita nei framework frontend o sviluppati da autori di terze parti.

Nel caso specifico di questo progetto, le caratteristiche che hanno guidato la scelta di questo framework sono: essere *lightweight* ed esente da elementi che potrebbero appesantire il caricamento delle interfacce; integrabile facilmente con la libreria Bootstrap nella versione 5.3 (che al momento della scrittura rappresenta l'ultima versione in distribuzione); la possibilità di implementare e visualizzare facilmente grafici che visualizzino l'andamento dei valori descritti dai dispositivi IoT.

### APIs

<lista degli endpoint da esporre>

### Azure Functions vs App Service

Aa

### Database

#### Azure SQL vs Cosmos DB

Dovendo sviluppare un prodotto ospitato mediante i servizi di Micorosft Azure, la prima domanda che sorge spontanea è quella relativa alla scelta del Database. La scelta ci è però semplificata, infatti, è sufficente effettuare una semplice ricerca in Google utilizzando le parole chiave "Azure SQL vs Cosmos DB" per renderci conto della quantità di materiale che molti sviluppatori prima di noi hanno messo a disposizione. In questa sezione vado a riportare quelle che dal punto di vista di questo progetto sono state le motivazioni che ho ritenuto "chiave" per quanto riguarda la scelta del servizio di database da utilizzare, a differenza però della maggior parte degli articoli individuati.

#### Deploy Node.js-based app using Prsima to Azure Functions

Reference: [Deploy to Azure Functions](https://prisma.io/docs/guides/deployment/serverless/deploy-to-azure-functions)

## Architettura Cloud

![Cloud Architecture](assets/Health%20Tracking%20System%20-%20Cloud%20Computing.drawio.png)
