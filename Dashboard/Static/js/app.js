// d3.json("http://127.0.0.1:5000/songs").then((importedData)=>{
//     var songs = importedData;
//     console.log(songs);
// });

// Function to create a bar Chart
function barChart(group_by,country,artist,track,datefrom,dateto,xAxisTitle,id,canvas,bar_color){
    d3.json('http://127.0.0.1:5000/songs?Group_by='+ group_by + '&Country=' + country + '&Artist=' + artist + '&Track_Name=' + track + '&datefrom='+ datefrom + '&dateto=' + dateto).then(importedData=>{
    var data = importedData;
    var category = data.map(sample=>sample[group_by]);
    var streams = data.map(sample=>sample.Streams);
    // Chart.js ---------------------------------------------------------
    var ctx = document.getElementById(id).getContext('2d');
    try{if (canvas) canvas.destroy();}catch(error){
            canvas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: first(10,category),
                datasets: [{data: streams, label: '# of Streams', backgroundColor: [bar_color], borderWidth: 2}]
            },
            options: {
                scales: {
                    y: {
                        display: true,
                        title: {text:"Streams", display:true, color:'white', font: {size: 16, family:"Poppins",weight:"bold"}},
                        ticks: {color : 'white', font: {family:"Poppins"}},
                    },
                    x: {
                        display: true,
                        title: {text: xAxisTitle, display:true, color:'white', font: {size: 16, family:"Poppins",weight:"bold"}},
                        ticks: {color : 'white', font: {family:"Poppins"}},
                    },
                },
                plugins: {legend: {display:true, labels:{color:'white',font: {family:"Poppins"}}}}
            }
        });
    }
});
}

// Function to create a line Chart
function lineChart(group_by,country,artist,track,datefrom,dateto,xAxisTitle,id,canvas) {
    d3.json('http://127.0.0.1:5000/streamsbydate?Group_by='+ group_by + '&Country=' + country + '&Artist=' + artist + '&Track_Name=' + track + '&datefrom='+ datefrom + '&dateto=' + dateto).then(importedData=>{
    var data = importedData;

    var category = data.map(sample=>sample[group_by]);
    var streams = data.map(sample=>sample.Streams);

    // Chart.js ---------------------------------------------------------
    var ctx = document.getElementById(id).getContext('2d');
        // ctx.height = 5000;
    // console.log(canvas)
    try{if (canvas) {
        console.log(canvas + "Canvas is destroyed")
        canvas.destroy();
        }
        else {
        console.log(canvas + "Canvas is not destroyed")
        }
    }catch(error){
        canvas = new Chart(ctx, {
        type: 'line',
        data: {
            labels: first(30,category),
            datasets: [{data: streams, label: '# of Streams', backgroundColor: ['rgba(30, 215, 96, 1)'], borderColor: ['rgba(30, 215, 96, 1)'], borderWidth: 2}]
        },
        options: {
            scales: {
                y: {
                    display: true,
                    title: {text:"Streams", display:true, color:'white', font: {size: 16, family:"Poppins",weight:"bold"}},
                    ticks: {color : 'white', font: {family:"Poppins"}},
                },
                x: {
                    display: true,
                    title: {text: xAxisTitle, display:true, color:'white', font: {size: 16, family:"Poppins",weight:"bold"}},
                    ticks: {color : 'white', font: {family:"Poppins"}},
                },
            },
            plugins: {legend: {display:true, labels:{color:'white',font: {family:"Poppins"}}}},
            maintainAspectRatio: false,
        }
    });
    }
});
}

// Function to create a donut Chart
function donutChart(group_by,country,artist,track,datefrom,dateto,id,canvas){
    d3.json('http://127.0.0.1:5000/songs?Group_by='+ group_by + '&Country=' + country + '&Artist=' + artist + '&Track_Name=' + track + '&datefrom='+ datefrom + '&dateto=' + dateto).then(importedData=>{
        var data = importedData;
        var category = data.map(sample=>sample[group_by]);
        var streams = data.map(sample=>sample.Streams);
        // Chart.js ---------------------------------------------------------
        var ctx = document.getElementById(id).getContext('2d');
        try{if (canvas) canvas.destroy();}catch(error){
            canvas = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: first(3,category),
                    datasets: [{
                        label: '# of Streams',
                        data: first(3,streams),
                        backgroundColor: ['rgba(30, 215, 96, 1)','rgba(66, 133, 244,1)','rgba(219, 68, 55,1)'],
                        borderColor: ['rgba(25, 28, 36, 1)'],
                        borderWidth: 10
                    }],
                    hoverOffset: 4
                },
                options:{
                    plugins: {legend: {display:true, labels:{color:'white',font: {family:"Poppins", size:16}}}}
                }
            
            });
        }
    });
}

// Function to Filter a JSON to n elements of it
function first(x,data) {
    data = data.slice(0, x)
    return data
};

//Welcome to the Spotify Dash 
console.log("Its working :D")

var countries = ["","Mexico", "United States", "Canada", "France", "Germany"]; 
var artists = ["","Maluma", "Bad Bunny", "Justin Bieber"]; 
var tracks = ["","track 1", "track 2", "track 3", "track 4", "track 5"]; 

countries.forEach(country=>{d3.select("#country_selector").append("option").classed("dropdown-item",true).style("value",country).text(country)})
artists.forEach(artist=>{d3.select("#artist_selector").append("option").classed("dropdown-item",true).style("value",artist).text(artist)})
tracks.forEach(track=>{d3.select("#song_selector").append("option").classed("dropdown-item",true).style("value",track).text(track)})

// Initial Setup without Filters
var country = ""
var artist= ""
var track = ""
var datefrom = ""
var dateto = ""

// Chart Function Parameters:
// 1.group_by,
// 2.[Filters]
// 3.X Axis Title
// 4.HTML id for select 
// 5.Name of Canvas that occupies the chart
// 6.Color of Bars)

// LineChart
lineChart("MonthYear",country,artist,track,datefrom,dateto,"Month of the Year","StreamsByDateChart",'LineChart')
// ChartByGenre
donutChart("Genre",country,artist,track,datefrom,dateto,"StreamsByGenre",'ChartByGenre')
// BarCharts
barChart("Artist",country,artist,track,datefrom,dateto,"Top Artist","StreamsByArtistPlot",'ChartByArtist','rgba(30, 215, 96, 1)')
barChart("Track_Name",country,artist,track,datefrom,dateto,"Top Songs","StreamsByTrackPlot",'ChartBySong','rgb(29, 117, 222, 1)')
barChart("Country",country,artist,track,datefrom,dateto,"Top Countries","StreamsByCountryPlot",'ChartByCountry','rgb(29, 117, 222, 1)')

d3.selectAll(".form-control").on("change", updateDashboard);





// ----------------------------------------------------------------------------------------------------------------------------------------

function updateDashboard() {    
    // Retrieve Selectors
    var country = d3.select("#country_selector").property("value")
    var artist= d3.select("#artist_selector").property("value")
    var track = d3.select("#song_selector").property("value")
    try {var datefrom = d3.select("#begin_selector").property("value")} catch(error){var datefrom = ""}
    try {var dateto = d3.select("#end_selector").property("value")} catch(error){var dateto = ""}

    d3.select("#country_selected").text(country)

    // Function that updates line chart 
    lineChart("MonthYear",country,artist,track,datefrom,dateto,"Month of the Year","StreamsByDateChart",'LineChart')

    // Function that update bar chart
    // barChart("Artist",country,artist,track,datefrom,dateto,"Top Artist","StreamsByArtistPlot")




} // The function that updates the Dashboard ends

// });












