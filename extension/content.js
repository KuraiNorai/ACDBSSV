/*
JavaScript for the Alchemist Code Quest page to load status effects
KuraiNorai#8889  2018/05/12

Extension available at https://github.com/KuraiNorai/ACDBSSV

Note: Most of the status used here initially is the header label of the resistance of the status from the quest units.
At the end, the " Res" part of the names are dropped off.
*/

// The statuses you want to appear. Note that these are named after the resistances on the enemy profile!
var origStatuses = ["Berserk Res", "Bind Res", "Blind Res", "Charm Res", "Daze Res", "Death Sentence Res", "Delay Res", "Paralyze Res", "Petrify Res", "Poison Res", "Rage Res", "Silence Res", "Sleep Res", "Slow Res", "Stop Res", "Stun Res"]
	               // Removed variables (from old ACDB entries): "Infect Res", "Knockback Res", "Debuff Res", 
var importantStatuses = ["Stop Res", "Petrify Res", "Daze Res"];  // Bolds/underline these in the same tone as allColor
var showResistant = 1;  // -2 = Only show important status (not resisted) & guaranteed status afflication
                         // -1 = Only show important status (even if resisted) & guaranteed status afflication
                        //   0 = Do not show any resisted statuses
						//   1 = Lists the resistant status effects of the entries listed in the importantStatuses
						//   2 = show all resisted statuses
var Separator = " | "; // Default was <br/>
var successRate=100;   // Assume that the success rate of the statuses is 100 by default and subtract the enemy's resistance from this value.
var groupImpStat=1;   // If set to 1, the important statuses will be grouped together in the appropriate listing section (e.g. if partially resisted, it will be the first item listed after the susceptible statuses)
                      // If set to zero, it will be ordered by susceptibility and then alphabetically

// Setting up the colours & cutoff for the partial resistances. Going for <=Cutoff = colour
var noColor='gray';       //  If the important status is fully resisted
var verylowCutoff=19; var verylowColor='red';
var lowCutoff=49; var lowColor='orange';
var midCutoff=69; var midColor='#CCCC00'; // dark yellow - brown
var highCutoff=79; var highColor='#66CC00'; // a dark shade of green that is still brighter than just green
var veryhighCutoff=89; var veryhighColor='chartreuse';
var highestColor='palegreen';
var perfectColor='white';   // For 100%
var allColor='magenta';   // For all statuses susceptible and susceptible important statuses


function remove(array, element) {
	return array.filter(e => e !== element);
}

// Hide all instances of the class SuscStatus which were created
//	document.getElementsByClassName('SuscStatus').style.display="none";
var npcName = document.getElementsByClassName('npc-icons'); // Get the number of NPCs
var l = npcName.length + 1;
for (var i = 1 ; i < l; i++) {
	var Statuses = origStatuses;
	var countStatuses = Statuses.length;
	
	var Partial = []; // For partial statuses
	var Resistant = []; // For the listed statuses of interest if resistant

	var newCell = npcName[i - 1].parentNode.insertCell(-1);
	newCell.setAttribute("class", "SuscStatus");
	if (i == 1) {
	  var tableHeader = newCell.parentNode.parentNode.parentNode.tHead.children[0].insertCell(-1);
	  //tableHeader.outerHTML = "<td class='SuscStatus'>Susceptible status</td>";
	  statusName="Susceptible status"
	  tableHeader.outerHTML = "<td><a id='SuscStatus-on' href='#' title='Hide status listing' >"+statusName+"</td>";
	  document.getElementById("SuscStatus-on").addEventListener("click", function(){
		allStatus=document.getElementsByClassName('SuscStatus')
		if(allStatus[0].style.display=='none'){
			turnMode=''
			document.getElementById('SuscStatus-on').innerHTML=statusName
		}else{
			turnMode='none'
			document.getElementById('SuscStatus-on').innerHTML='Show susc.';
		}
		for(var a=0; a < allStatus.length; a++){allStatus[a].style.display=turnMode}
	  });
	}

	// Looping from the 2nd tr and onwards
	var statTable = document.getElementById("npc-" + i).getElementsByTagName("table")[1].getElementsByTagName("tr");
	if(!statTable){continue} // Likely does not have any statuses
	if(statTable.length>2){  //  If there are less than 4 elements present, it would often indicate that the resistance portion is missing.. Could be verified by doing something like statTable[2].parentNode.parentNode.getElementsByTagName("caption")[0].innerHTML == "Status Res"
		for (var j = 0; j < statTable.length-1; j += 1) {
			if(statTable[j].parentNode.parentNode.getElementsByTagName("caption")[0].innerHTML != "Status Res"){continue; alert("WARNING (disabled) | Caption is: " + statTable[j].parentNode.parentNode.getElementsByTagName("caption")[0].innerHTML)}
			var statName = statTable[j].getElementsByTagName("th")
			var statVal = statTable[j+1].getElementsByTagName("td")

			for (var k = 0; k < statName.length; k++) {
				var Val = Number(statVal[k].innerHTML)  //  The enemy resistance value
				var Var = statName[k].getElementsByTagName("span")[0].getAttribute("data-title")         //  The name of the resistance stat (e.g. Delay Res). Previously, ACDB had this listed as innerHTML

				if (!Var || origStatuses.indexOf(Var)<0) { //  If the variable is not defined in var Statuses, ignore it
				  continue
				}
				if(isNaN(Val)){Val=0} // Set non-numeric values (likely a dash) to 0
				Statuses = remove(Statuses, Var)  //  Remove it from our initial status list (this is used to see if all statuses is resistant, after the for loop.
				Sus=(successRate - Val)  //  The assumed success rate subtracted by the enemy resis 
				
				binomialColor=1   //  Set to 1 if you want to see either a green or red shade. Leaving it as 0 reflects the colour as defined at the top.
				if(Val >= successRate){
					// Resistant status - If the enemy resistance is at least the same value as the success rate
					if(binomialColor==1){colBG="darkred"}else{colBG=noColor}
					statName[k].style.backgroundColor = colBG;
					if(showResistant == 2 || (showResistant>-2 && (importantStatuses.indexOf(Var)>=0))){Resistant.push('<font class="' + Var + '" color="' + noColor + '" style="font-weight: bold; text-decoration: underline;" >' + Var + ' ('+ Sus + ')</font>')}
				} else { //if (Sus >= 50) {  // If this else-if is enabled, susceptible value >= 50 will be included and those < 50 will be ignored
				  // Partial status
					// Do not show non-important statuses if showResistant is set to -1
				    if(showResistant > -1 || importantStatuses.indexOf(Var)>=0|| Sus>=successRate){Partial.push('<font class="' + ((groupImpStat && importantStatuses.indexOf(Var)>=0)?"-1":"") + Val.toString() + Var + '" color="' + (Sus<=verylowCutoff ? verylowColor : Sus<=lowCutoff ? lowColor  : Sus<=midCutoff ? midColor : Sus<=highCutoff ? highColor : Sus<=veryhighCutoff ? veryhighColor : highestColor) + '"  style="font-weight: ' + ((importantStatuses.indexOf(Var)>=0)?"bold":"normal") + '; text-decoration: ' + ((importantStatuses.indexOf(Var)>=0)?"underline":"initial") + ';" >' + Var + " (" + Sus + ")</font>")}
					if(binomialColor==1){colBG="forestgreen"}else{if(Sus==successRate){colBG=perfectColor}else if(Sus>veryhighCutoff){colBG=highestColor}else if(Sus>highCutoff){colBG=veryhighColor}else if(Sus>midCutoff){colBG=highColor}else if(Sus>lowCutoff){colBG=midColor}else if(Sus>verylowCutoff){colBG=lowColor}else{colBG=lowColor}}

				  statName[k].style.backgroundColor = colBG;
				}
			}
		}
	}

	// Output the resulting sensitive set -  String version: 
	if(Statuses.length == countStatuses){
		newCell.innerHTML = '<font class="' + Var + '" color="' + allColor + '">All</font>'
	} else {
		// Sort the statuses
		Statuses.sort()
		Partial.sort()
		Resistant.sort()

		if(showResistant && importantStatuses.length>0){
			for(succTerm in Statuses){
				if(importantStatuses.indexOf(Statuses[succTerm])>=0){Statuses[succTerm] = '<font class="' + (groupImpStat?"0":"") + Var + '" style="font-weight: bold; text-decoration: underline;" color="' + allColor + '">' + Statuses[succTerm] + '</font>'}
				else {Statuses[succTerm] = '<font class="' + Var + '" color="' + perfectColor + '">' + Statuses[succTerm] + '</font>'}
			}

			newCell.innerHTML = Statuses.toString().replace(/\sRes/g, "").replace(/,/g, Separator);

		} else {
			newCell.innerHTML = '<font class="' + "0" + Var + '" color="' + perfectColor + '">' + Statuses.toString().replace(/\sRes/g, "").replace(/,/g, Separator) + '</font>';
		}
		
		if(Partial.length > 0){ newCell.innerHTML = newCell.innerHTML + Separator + Partial.toString().replace(/\sRes/g, "").replace(/,/g, Separator)};
		if(Resistant.length > 0){ newCell.innerHTML = newCell.innerHTML + Separator + Resistant.toString().replace(/\sRes/g, "").replace(/,/g, Separator) };
	}
}
