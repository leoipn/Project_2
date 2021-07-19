// d3.json("http://127.0.0.1:5000/songs").then((importedData)=>{
//     var songs = importedData;
//     console.log(songs);
// });

console.log("Its working")

// Group By JS Function
var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};

function filter_first(x,data) {
    data = data.slice(0, x)
    return data
};


d3.json("http://127.0.0.1:5000/songs").then(importedData=>{

    var songs = importedData;
    console.log(filter_first(1000,songs));

    // console.log(groupBy(songs,"Artist"))
});


d3.json("http://127.0.0.1:5000/streamsByDate").then(importedData=>{
    var streamsByDate = importedData;
    // .toString();
    var date = (streamsByDate.map(sample=>sample.MonthYear))
    var streams = streamsByDate.map(sample=>sample.Streams)

    var trace1 = {
        x:date,
        y:streams,
        type: 'scatter'
    }
    
    var data = [trace1]

    Plotly.newPlot('StreamsByDatePlot',data)
});

d3.json("http://127.0.0.1:5000/streamsByArtist").then(importedData=>{
    var streamsByArtist = filter_first(20,importedData);
    // console.log(streamsByArtist);

    // .toString();
    var artist = (streamsByArtist.map(sample=>sample.Artist));
    var streams = streamsByArtist.map(sample=>sample.Streams);

    var data = [
        {
          x: artist,
          y: streams,
          type: 'bar'
        }
      ];
      
      Plotly.newPlot('StreamsByArtistPlot', data);
});

d3.json("http://127.0.0.1:5000/streamsByTrack").then(importedData=>{
    var streamsByTrack = filter_first(10,importedData);
    // console.log(streamsByTrack);
    // .toString();
    var track = (streamsByTrack.map(sample=>sample.Track))
    var streams = streamsByTrack.map(sample=>sample.Streams)

    var data = [
        {
          x: track,
          y: streams,
          type: 'bar'
        }
      ];
      
      Plotly.newPlot('StreamsByTrackPlot', data);
});