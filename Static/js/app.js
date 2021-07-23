// d3.json("http://127.0.0.1:5000/songs").then((importedData)=>{
//     var songs = importedData;
//     console.log(songs);
// });

console.log("Its working")

// Function to Filter a JSON to n elements of it
function first(x,data) {
    data = data.slice(0, x)
    return data
};

// Function to Format Dates
function FormatDate(date){
    var FormatedDates = []
    date.forEach(d=>{
    d = moment(d, "YYYY-MM-DD").format("MMM YYYY");
    FormatedDates.push(d)
  }) 
  return FormatedDates;
}

var country=""
var artist=""
var track =""
var datefrom = ""
var dateto = ""

var group_by="Artist"


d3.json('http://127.0.0.1:5000/songs?Group_by='+ group_by + '&Country=' + country + '&Artist=' + artist + '&Track_Name=' + track + '&datefrom='+ datefrom + '&dateto=' + dateto).then(importedData=>{
    var data = importedData;
    // console.log(data)

    var artist = data.map(sample=>sample.Artist);
    var streams = data.map(sample=>sample.Streams);

    // ---------------------------------------------------------
    // Chart.js
    const ctx = document.getElementById('StreamsByArtistPlot2').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: first(20,artist),
        datasets: [{
            label: '# of Streams',
            data: streams,
            backgroundColor: ['rgba(30, 215, 96, 1)'],
            borderColor: ['rgba(30, 215, 96, 1)'],
            // borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
            }
        }
    }
  });

//   streams_ByTrack=groupby(data,'Track_Name','Streams')
//   console.log
//   var tracks = streams_ByTrack.map(sample=>sample.Track_Name);
//   var streams = streams_ByTrack.map(sample=>sample.Streams);

//     // ---------------------------------------------------------
//     // Chart.js
//     const ctx2 = document.getElementById('StreamsByTrackPlot2').getContext('2d');
//     const myChart2 = new Chart(ctx2, {
//     type: 'bar',
//     data: {
//         labels: first(10,tracks),
//         datasets: [{
//             label: '# of Streams',
//             data: streams,
//             backgroundColor: ['rgba(30, 215, 96, 1)'],
//             borderColor: ['rgba(30, 215, 96, 1)'],
//             // borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//             x: {
//               // autoSkip = false
//             }
//         }
//     }
// });

});


d3.json("http://127.0.0.1:5000/streamsByDate").then(importedData=>{
    var streamsByDate = importedData;
    // .toString();
    var date = streamsByDate.map(sample=>sample.MonthYear)
    var streams = streamsByDate.map(sample=>parseInt(sample.Streams))

    // ----------------------------------------------------------
    // Chart with Plotly
    var trace1 = {
        x:date,
        y:streams,
        type: 'scatter'
    }
    
    var data = [trace1]

    Plotly.newPlot('StreamsByDatePlot',data)

    // ---------------------------------------------------------
    // Chart.js
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: first(20,FormatDate(date)),
        datasets: [{
            label: '# of Streams',
            data: streams,
            backgroundColor: ['rgba(30, 215, 96, 0.2)'],
            borderColor: ['rgba(30, 215, 96, 1)'],
            // borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                // suggestedMin: 4000,
                // min: 4000
                
                // max: Math.max(streams),
                // min: Math.min(streams),
                // ticks: {
                //     stepSize: .2
                // }
            },
            x: {
              // autoSkip = false
            }
        }
    }
});
});


