![Health Tracking](assets/Health%20Tracking%20-%20Cloud%20Computing%20Course%20Project%20Banner.png)

<h1 style="background-image: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045);-webkit-background-clip: text;-webkit-text-fill-color: transparent">Health Tracking System</h1>

health-tracking-system è un sistema Cloud-based ideato per il tracciamento di dati sanitari da dispositivi IoT, realizzato come progetto Universitario per il corso di *Cloud Computing* del dipartimento di informatica presso l'Università degli Studi di Salerno.

Una caratteristica fondamentale, quando si lavora con dati sanitari, è la governance correlata alle informazioni che vengono raccolte.

## Come installare il progetto

1. Eseguire il login ad un Account Azure mediante la CLI;

1. Modificare [environment.sh](https://github.com/daqh/health-tracking-system/blob/main/environment.sh) definendo le impostazioni del tuo progetto;

1. Eseguire il file `./install.sh`.

## Missione

<descrizione del progetto>

I concetti sulla base dei quali, sono state motivate le scelte relative ai servizi e alle tecnologie impiegate per la realizzazione di questo servizio sono due: la **semplicità di migrazione**, intesa come la capacità di poter cambiare in maniera economica e veloce il *Cloud Provider* di riferimento, in questo caso rappresentato da *Microsoft Azure*; il desiderio di scrivere **meno codice**, prediligendo soluzioni *ready-to-use* tipiche del *Cloud Computing*.

## Architettura

Di seguito è riportata l'architettura generale del sistema, progettato indipendentemente dal fatto che saranno successivamente integrati servizi forniti dal Cloud Provider Azure.

![General Architecture](assets/Health%20Tracking%20System%20-%20General%20Architecture.drawio.png)

## Architettura Cloud

![Cloud Architecture](assets/Health%20Tracking%20System%20-%20Cloud%20Computing.drawio.png)

### Frontend

#### App Service vs Static Web App

Nonostante il titolo della sezione, tra le diverse componenti che strutturano questa architettura, il frontend sicuramente si distingue per l'assenza di *Trade Off* nella scelta del servizio, infatti, nonostante la nostra applicazione non abbia la necessità di gestire un frontend molto complesso, l'utilizzo di un framework è desiderabile al fine di scrivere interfacce complesse evitando la ridondanza del codice. In generale, per la maggior parte delle applicazioni, questo può essere guidato principalmente da motivazioni estetiche, sulla base di varie ed eventuali componenti più o meno accattivanti che sono integrate in maniera predefinita nei framework frontend o sviluppati da autori di terze parti.

Nel caso specifico di questo progetto, le caratteristiche che hanno guidato la scelta di questo framework sono: essere *lightweight* ed esente da elementi che potrebbero appesantire il caricamento delle interfacce; integrabile facilmente con la libreria Bootstrap nella versione 5.3 (che al momento della scrittura risulta essere l'ultima versione); la possibilità di implementare e visualizzare facilmente grafici che rappresentano l'andamento dei valori descritti dai dispositivi IoT.

Lo strumento individuato per lo sviluppo dell'applicazione utente è **[Angular 16](https://en.wikipedia.org/wiki/Single-page_application#:~:text=A%20single%2Dpage%20application%20\(SPA,browser%20loading%20entire%20new%20pages.)**, un framework per lo sviluppo frontend che permette di costruire facilmente *Single Page Application*

### APIs

La scelta per la realizzazione delle API per interagire con i dati è direttamente ricaduta sulle *Azure Function App*.

L'intero progetto si fonda a partire da due diverse *Azure Function App*, le quali sono state separate poiché indipendenti. Per tutti i dati non è stata prevista l'opzione di modifica, in quanto non necessaria dal punto di vista funzionale.

#### Device Function App

- Crea Dispositivo `POST /device`
- Elimina Dispositivo `DELETE /device/{deviceId}`
- Lista di Dispositivi `GET /device`
- Lettura di un singolo dispositivo `GET /device/{deviceId}`

#### Meal Function App

- Crea Pasto `POST /meal`
- Elimina Pasto `DELETE /meal/{mealId}`
- Lista di Pasto `GET /meal`
- Lettura di un singolo Pasto `GET /meal/{mealId}`

### Database

#### Azure SQL vs Cosmos DB

Dovendo sviluppare un prodotto ospitato mediante i servizi di Micorosft Azure, la prima domanda che sorge spontanea è quella relativa alla scelta del Database. La scelta ci è però semplificata, infatti, è sufficente effettuare una semplice ricerca in Google utilizzando le parole chiave "Azure SQL vs Cosmos DB" per renderci conto della quantità di materiale che molti sviluppatori prima di noi hanno messo a disposizione. In questa sezione vado a riportare quelle che dal punto di vista di questo progetto sono state le motivazioni che ho ritenuto "chiave" per quanto riguarda la scelta del servizio di database da utilizzare, a differenza però della maggior parte degli articoli individuati.

#### Deploy Node.js-based app using Prsima to Azure Functions

Reference: [Deploy to Azure Functions](https://prisma.io/docs/guides/deployment/serverless/deploy-to-azure-functions)

## Implementazioni future

- Implementare una gestione dei ruoli basata su Azure RBAC. Tali ruoli saranno i seguenti:
    - *Sottoscritore* - Può solo leggere le misurazioni raccolte dai dispositivi.
    - *Collaboratore* - Può leggere le misurazioni raccolte dai dispositivi e inserire nuovi dispositivi.
    - *Amministratore* - Ha accesso completo a tutte le funzionalità del sistema

# Come disinstallare il progetto

Per cancellare tutte le risorse del progetto, è sufficiente eliminare il gruppo di risorse correlato. Per facilitare tale operazione, è stato predisposto il file `./uninstall.sh`, il quale rappresenta una scorciatoria a tale processo.
