var myComp=app.project.activeItem;
if (myComp && myComp instanceof CompItem)
{
	var selLayers=myComp.selectedLayers;
	for (var i=0;i<selLayers.length;i++)
	{
		var curLayer=selLayers[i];
		if (curLayer instanceof TextLayer)
			alert("\""+curLayer.name+"\" font: "+curLayer.property("Source Text").value.font);
	}
}