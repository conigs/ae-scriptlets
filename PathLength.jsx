/********************************

Path Length

Writes the length of the first selected path to the Info panel
and copies result to clipboard

Paul Conigliaro
http://conigs.com

********************************/
(function(){
    var thisComp = app.project.activeItem;
    var thisShape = thisComp.selectedProperties[0];

    try{
        var pathLength = Math.round(getPathLength(thisShape.property("Path").value)*100)/100;
        if($.os.indexOf("Macintosh") === -1) { var cmdString = 'cmd.exe /c cmd.exe /c "echo ' + pathLength + ' | clip"'; }
        else { var cmdString = 'echo "' + pathLength + '" | pbcopy'; }
        system.callSystem(cmdString);
        clearOutput();
        writeLn("Path Length: " + pathLength + " pixels.");
        //Uncomment this line to display alert instead.
        //alert("Path Length: " + pathLength + " pixels.");
    } catch(e){
        alert("ERROR: Did you select only paths?");
    }


    function getPathLength(shapePath) {
        var len = 0;
        var verts = shapePath.vertices;
        var numVerts = verts.length;
        var ins = shapePath.inTangents;
        var outs = shapePath.outTangents;

        for (var i = 0; i < numVerts-1; i++) { len += getCurveLength(verts[i],verts[i+1],outs[i],ins[i+1]); }
        if(shapePath.closed == true) { len += getCurveLength(verts[numVerts-1],verts[0],outs[numVerts-1],ins[0]);}
        return len;

        //Curve Segement Length function from Hernan Torrisi
        function getCurveLength(initPos, endPos, outBezier, inBezier) {
            var k, curveSegments = 100, point, lastPoint = null, ptDistance, absToCoord, absTiCoord, triCoord1, triCoord2, triCoord3, liCoord1, liCoord2, ptCoord, perc, addedLength = 0, i, len;
            for (k = 0; k < curveSegments; k += 1) {
                point = [];
                perc = k / (curveSegments - 1);
                ptDistance = 0;
                absToCoord = [];
                absTiCoord = [];
                len = outBezier.length;
                for (i = 0; i < len; i += 1) {
                    if (absToCoord[i] === null || absToCoord[i] === undefined) {
                        absToCoord[i] = initPos[i] + outBezier[i];
                        absTiCoord[i] = endPos[i] + inBezier[i];
                    }
                    triCoord1 = initPos[i] + (absToCoord[i] - initPos[i]) * perc;
                    triCoord2 = absToCoord[i] + (absTiCoord[i] - absToCoord[i]) * perc;
                    triCoord3 = absTiCoord[i] + (endPos[i] - absTiCoord[i]) * perc;
                    liCoord1 = triCoord1 + (triCoord2 - triCoord1) * perc;
                    liCoord2 = triCoord2 + (triCoord3 - triCoord2) * perc;
                    ptCoord = liCoord1 + (liCoord2 - liCoord1) * perc;
                    point.push(ptCoord);
                    if (lastPoint !== null) {
                        ptDistance += Math.pow(point[i] - lastPoint[i], 2);
                    }
                }
                ptDistance = Math.sqrt(ptDistance);
                addedLength += ptDistance;
                lastPoint = point;
            }
            return addedLength;
        }
        
    }

})();