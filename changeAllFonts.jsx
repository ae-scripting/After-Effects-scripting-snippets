var changeAllFontsScript={
	fontName:"ArialMT"
};
changeAllFontsScript.go = function(){

FolderItem.prototype.getSelected = function(allItems)//all Items is a boolean. if true, will take all contained folders and items. else take only selected items
{
	var arr=[];
	if (this.selected)//if folder is selected, we will take all contained items
		allItems=true;
	for (var i=1;i<=this.numItems;i++)
		{
			var curItem=this.item(i);
			if (curItem instanceof FolderItem)
				{
					var inner=curItem.getSelected(allItems);
					arr=arr.concat(inner);
				}
			if ((allItems === true || curItem.selected) && curItem instanceof CompItem)
	            {
					arr.push(curItem);
				}
		}
	return arr;
}

Project.prototype.getSelectedItems = function()
{
	//there is no method to take all selected items in project window. i wrote my own
	return this.rootFolder.getSelected(false);//get all selected items in project
}

TextLayer.prototype.changeFont=function(fontName)
{
	var locked = this.locked;
	this.locked = false;
	var prop=this.property("Source Text");
	if (prop.numKeys>0)//if textLayer has animation
		for (var i=1;i<=prop.numKeys;i++)
		{
			var curTime=prop.keyTime(i);//get time if key i
			var textDocument=prop.valueAtTime(curTime,false);//get value in key i
			textDocument.font=fontName;//change font
			prop.setValueAtTime(curTime,textDocument)//set value with new font to key i
		}
	else//if no animation or expression only
	{
		var textDocument=prop.value;//get value
		textDocument.font=fontName;//change font
		prop.setValue(textDocument);//set new font
	}
	this.locked = locked;
}

CompItem.prototype.changeFonts=function()
{
	for (var i=1;i<=this.numLayers;i++)	
		{
			var curLayer=this.layer(i);
			if (curLayer instanceof TextLayer)
				try
					{
						curLayer.changeFont(changeAllFontsScript.fontName);
					}
					catch(e)
					{
						return null;
					}
		}
	return 0;
}

	app.beginUndoGroup("Change All Fonts");

	var selItems=app.project.getSelectedItems();
	//alert("number of selected comps:"+selItems.length);

	for (var i=0;i<selItems.length;i++)
		{
			var func=selItems[i].changeFonts();//function returns null if caugth exeption
			if (func === null)
				{
					alert("Unknown font name");
					return 0;//end script
				}
		}
	
	alert("Done!");
	app.endUndoGroup();

}

changeAllFontsScript.go();