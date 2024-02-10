let chosenDrivers = [];

const names = {
    verstappen: "M. Verstappen",
    perez: "S. Pérez",
    hamilton: "L. Hamilton",
    alonso: "F. Alonso",
    leclerc: "C. Leclerc",
    norris: "L. Norris",
    sainz: "C. Sainz",
    russell: "G. Russell",
    piastri: "O. Piastri",
    stroll: "L. Stroll",
    gasly: "P. Gasly", 
    ocon: "E. Ocon",
    albon: "A. Albon",
    tsunoda: "Y. Tsunoda",
    bottas: "V. Bottas",
    hulkenberg: "N Hülkenberg",
    ricciardo: "D. Ricciardo",
    zhou: "G. Zhou",
    magnussen: "K. Magnussen",
    sargeant: "L. Sargeant"
}

const colors = {
    verstappen: "#193044",
    perez: "#586977",
    leclerc: "#ff2800",
    sainz: "#cc2000",
    hamilton: "#a776bd",
    russell: "#00f5d0",
    stroll: "#00352f",
    alonso: "#325d58",
    ocon: "#e672bc",
    gasly: "#cf66a9",
    zhou: "#07b03f",
    bottas: "#058931",
    albon: "#4267f8",
    sargeant: "#3452c6",
    norris: "#ff8308",
    piastri: "#ff9b39",
    hulkenberg: "#000000",
    magnussen: "#323232",
    tsunoda: "#4c35e1",
    ricciardo: "#35259d",
    alphatauri: "#273f53",
    alfaromeo: "#820000",
    stake: "#08c447"
}

function addDriver() {
    let driver = document.querySelector("#drivers")
    var value = driver.value;
    if(!chosenDrivers.includes(value)) {
        chosenDrivers.push(value);
    }

    updatePage();
  }

function removeDriver(driver) {
    chosenDrivers = chosenDrivers.filter(function (word) {
        return word !== driver;
    });
    
    updatePage();
}

function updatePage() {
    console.log(chosenDrivers);

    const driverList = document.querySelector('#selected-drivers');
    let htmlToAppend = "";

    chosenDrivers.forEach(driver => {
        htmlToAppend += `<div class="selected-item">
                                <p>${names[driver]}</p>
                                <span class="dot" style="background-color: ${colors[driver]};"></span>
                                <button class="remove-button" onClick="removeDriver(\``+ driver + `\`)">x</button>
                            </div>`
        })

    driverList.innerHTML = htmlToAppend;
}


