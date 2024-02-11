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
    "verstappen": "#193044",
    "perez": "#586977",
    "leclerc": "#ff2800",
    "sainz": "#cc2000",
    "hamilton": "#a776bd",
    "russell": "#00f5d0",
    "stroll": "#00352f",
    "alonso": "#325d58",
    "ocon": "#e672bc",
    "gasly": "#cf66a9",
    "zhou": "#07b03f",
    "bottas": "#058931",
    "albon": "#4267f8",
    "sargeant": "#3452c6",
    "norris": "#ff8308",
    "piastri": "#ff9b39",
    "hulkenberg": "#000000",
    "magnussen": "#323232",
    "tsunoda": "#4c35e1",
    "ricciardo": "#35259d"
}

let coords = {
    "hamilton" : {
        "x": [],
        "y": []
    },
    "verstappen" : {
        "x": [],
        "y": []
    },
    "perez" : {
        "x": [],
        "y": []
    },
    "leclerc" : {
        "x": [],
        "y": []
    },
    "sainz" : {
        "x": [],
        "y": []
    },
    "russell" : {
        "x": [],
        "y": []
    },
    "stroll" : {
        "x": [],
        "y": []
    },
    "alonso" : {
        "x": [],
        "y": []
    },
    "ocon" : {
        "x": [],
        "y": []
    },
    "gasly" : {
        "x": [],
        "y": []
    },
    "zhou" : {
        "x": [],
        "y": []
    },
    "bottas" : {
        "x": [],
        "y": []
    },
    "albon" : {
        "x": [],
        "y": []
    },
    "sargeant" : {
        "x": [],
        "y": []
    },
    "norris" : {
        "x": [],
        "y": []
    },
    "piastri" : {
        "x": [],
        "y": []
    },

    "magnussen" : {
        "x": [],
        "y": []
    },
    "ricciardo" : {
        "x": [],
        "y": []
    },
    "hulkenberg" : {
        "x": [],
        "y": []
    },
    "tsunoda" : {
        "x": [],
        "y": []
    }
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

    let driverTraces = [];
for(let i=0; i<chosenDrivers.length; i++){
    var driverTrace = {
        x: coords[chosenDrivers[i]]['x'],
	    y: coords[chosenDrivers[i]]['y'],
        mode: 'markers',
        type: 'scatter',
        name: chosenDrivers[i],
        marker: { size: 8,
              color: colors[chosenDrivers[i]] + "80" }
    }
    driverTraces.push(driverTrace);
    //console.log(driverTraces);
}
Plotly.newPlot('graph', driverTraces);
}

function getScores() {
    let sortX = [];
    for (const [key, value] of Object.entries(scores)) {
        for(let i = 0; i < value.length; i++) {
            if(coords[key] !== null) {
                coords[key]["x"].push(new Date(value[i][0] * 1000));
                coords[key]["y"].push((value[i][1]*10) * value[i][3]);
            }
            if((value[i][1]*10) * value[i][3] > 10000){
                fetch('https://api.reddit.com/api/info/?id='+value[i][2])
                    .then(response => response.json())
                    .then(data => {
                        var news = document.createElement("a");
                        news.setAttribute("class", "newsItem");
                        news.innerHTML = data["data"]["children"][0]["data"]["title"];
                        console.log(data["data"]["children"][0]["data"]["title"]);
                        news.href = "https://reddit.com/" + value[i][2].substring(3);
                        document.getElementById("news").appendChild(news);
                    })
                    .catch(error => console.error('Error:', error));
                
            }
        }
        //console.log(value);
    }

    // TESTER = document.getElementById('graph');

	// Plotly.newPlot( TESTER, [{

	// x: [1, 2, 3, 4, 5, 6],

	// y: [1, 2, 4, 8, 16, 32] }], {

	// margin: { t: 0 } } );

    //console.log(coords);
}

