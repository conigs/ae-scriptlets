/************************************************

save.jsx 1.0
Paul Conigliaro http://conigs.com
Oct 2017 1.0

Finally save your After Effects project
in a simple, intuitive way!

************************************************/


(function (thisObject) {

    var strings = {
        scriptName: "Save",
        buttons: {
            save: "Save"
        },
        helpTips: {
            save: "Save"
        },
        instructions: {
            save: "Click to save!"
        },
        errors: {
            cantSave: "Can't Save!"
        }
    }

    buildPanel(thisObject);

    function buildPanel(thisObject) {
        
        function buildUI(thisObject) {
            var win = (thisObject instanceof Panel) ? thisObject : new Window("palette", strings.scriptName, undefined, {resizeable: true});

            win.grp                                 = win.add("group", undefined);
            win.grp.orientation                     = "column";
            win.grp.preferredSize                   = [200,70];
            win.grp.alignment                       = ['left', 'top'];
            win.grp.alignChildren                   = ['left','top'];

            win.grp.saveInstructions                = win.grp.add("statictext", undefined, strings.instructions.save);
            win.grp.saveInstructions.preferredSize  = [190,20];
            win.grp.saveInstructions.justify        = 'center';

            win.grp.saveBtn                         = win.grp.add("button", undefined, strings.buttons.save);
            win.grp.saveBtn.preferredSize           = [190,30];
            win.grp.saveBtn.helpTip                 = strings.helpTips.save;

            win.layout.layout(true);
            win.grp.minimumSize = win.grp.size;
            win.layout.resize();
            win.onResizing = win.onResize = function(){this.layout.resize()};

            win.grp.saveBtn.onClick = saveFunction;

            return win;
        }

        var scriptPalette = buildUI(thisObject);

        if(scriptPalette != null && scriptPalette instanceof Window) {
            scriptPalette.center();
            scriptPalette.show();
        }
    }

    function saveFunction(paletteObj) {
        var saveCommand = app.findMenuCommandId("Save");
        var saveAsCommand = app.findMenuCommandId("Save As...");
        try {
            if(app.project.file === null) {
                app.executeCommand(saveAsCommand);
            } else {
                app.executeCommand(saveCommand);
            }
        } catch(e) { alert(strings.errors.cantSave);}
    }

})(this);