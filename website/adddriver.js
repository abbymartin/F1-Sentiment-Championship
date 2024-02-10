let chosenDrivers = [];

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
                                <p>${driver}</p>
                                <button class="remove-button" onClick="removeDriver(\``+ driver + `\`)">X</button>
                            </div>`
        })

    driverList.innerHTML = htmlToAppend;
}


