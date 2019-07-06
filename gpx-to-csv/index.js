const {aggressive, conservative} = require('./files3');
const fs = require('fs');

function writeCsvFromGpx(gpxFile, fileName) {
    let lines = ['id,lat,lon,speed,currentDistance,timeElapsed'];
    let arr = gpxFile.gpx.trk.trkseg.trkpt;
    for (let i = 0; i < arr.length; i++) {
        let point = arr[i];
        lines.push([i, point['-lat'], point['-lon'], point.speed, point.currentdistance, point.timeelapsed].join(','));
    }
    fs.writeFile(`${fileName}.csv`, lines.join('\n'), (err) => {
        if (err) throw err;
        console.log('Done!')
    });
}

writeCsvFromGpx(aggressive, 'aggressive');
writeCsvFromGpx(conservative, 'conservative');



