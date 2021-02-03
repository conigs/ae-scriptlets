/**
 * Swap Layer Time
 * Inverts layer start times by order of selection.
 * Use: 
 * 1. Select 2 or more layers. 
 * 2. Run Script. ?
 * 3. ??? 
 * 4. Profit.
 * 
 * @author Paul Conigliaro
 */
(function(){
    // Strings to keep things tidy
    var strings = {
        scriptName: "Swap Layer Time",
        scriptAuthor: "Paul Conigliaro",
        scriptVersion: "0.1",
        undo: "Swap Layer Time",
        errors: {
            noComp: ["No active comp.","Please make sure a comp is open and focussed."].join("\n"),
            fewLayers: ["Not enough layers selected.","Please select at least 2 layers."].join("\n")
        }
    }

    clearOutput();
    
    // Get active comp
    var comp = app.project.activeItem;
    if(!comp || !(comp instanceof CompItem)) { alert(strings.errors.noComp); return null;}
    
    // Get selected layers
    var selectedLayers = comp.selectedLayers;
    if(!selectedLayers || selectedLayers.length < 2) { alert(strings.errors.fewLayers); return null; }
    
    app.beginUndoGroup(strings.undo);
    
        // Variable initialization
        var i,il;
        var layerStartTimes = [];
        
        // Loop through selected layers to store start times
        for(i=0, il=selectedLayers.length; i<il;i++) {
            layerStartTimes.push(selectedLayers[i].startTime);
        }
        
        // Reverse back through layers and set start times
        while(i--) {
            selectedLayers[il-i-1].startTime = layerStartTimes[i];
        }
        
        // Write number of affected layers to the info window
        writeLn("Swapped " + il + " layers.");
        
    app.endUndoGroup();
    
})();