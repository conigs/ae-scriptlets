// You know how AE can center the anchor point in a newly created shape?
// You know how the anchor points and position *aren't* 0?
// This makes that not happen.
// Run after making a shape with "Center Anchor Point in New Shape Layers" enabled.

(function(){

    var strings = {
        scriptName: "Zero New Shape",
        author: "Paul Conigliaro",
        undoName: "Zero New Shape",
        errors: {
            noComp: ["No active comp.","Pleases make sure a comp is active with a newly created shape layer selected."].join("\n"),
            noLayer: ["No layer selected.","Pleases make sure a comp is active with a newly created shape layer selected."].join("\n")
        }
    }

    var comp = app.project.activeItem;

    if (!comp || !(comp instanceof CompItem)) {alert(strings.errors.noComp);  return false; }

    var selectedLayers = comp.selectedLayers;
    
    if(selectedLayers.length < 1) {alert(strings.errors.noLayer); return false;}

    app.beginUndoGroup(strings.undoName);
    {
        selectedLayers[0].Contents(1).transform.position.setValue([0,0]);
        selectedLayers[0].transform.anchorPoint.setValue([0,0]);
    }
    app.endUndoGroup();
    
        
})();

