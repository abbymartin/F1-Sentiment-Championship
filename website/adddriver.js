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
                                <button class="remove-button" onClick="removeDriver(\``+ driver + `\`)">X</button>
                            </div>`
        })

    driverList.innerHTML = htmlToAppend;
}


