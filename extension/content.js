/*
JavaScript for the Alchemist Code Quest page to load status effects
KuraiNorai#8889  2018/05/12

Note: Most of the status used here initially is the header label of the resistance of the status from the quest units.
At the end, the " Res" part of the names are dropped off.
*/

var importantStatuses = ["Stop Res", "Petrify Res", "Daze Res"];  // Bolds/underline these in the same tone as allColor
var showResistant = 1;  // Lists the resistant status effects of the specified element (or = 2 for all)
var Separator = " | "; // Default was <br/>

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

var npcName = document.getElementsByClassName('npc-name');
for (var i = 1, l = npcName.length + 1; i < l; i++) {
	var Statuses = ["Berserk Res", "Bind Res", "Blind Res", "Charm Res", "Daze Res", "Death Sentence Res", "Debuff Res", "Delay Res", "Paralyze Res", "Petrify Res", "Poison Res", "Rage Res", "Silence Res", "Sleep Res", "Slow Res", "Stop Res", "Stun Res"]
		// Removed variables: "Infect Res", "Knockback Res", 
	var countStatuses = Statuses.length
	var Partial = []; // For partial statuses
	var Resistant = []; // For the listed statuses of interest if resistant

	var newCell = npcName[i - 1].parentNode.insertCell(-1);
	newCell.setAttribute("class", "SuscStatus")
	if (i == 1) {
	  var tableHeader = newCell.parentNode.parentNode.parentNode.tHead.children[0].insertCell(-1);
	  tableHeader.outerHTML = "<th class='SuscStatus'>Susceptible status</th>";
	}

	// Looping from the 2nd tr and onwards
	var statTable = document.getElementById("npc-" + i).getElementsByTagName("table")[1].getElementsByTagName("tr")
	if(!statTable){continue} // Likely does not have any statuses
	for (var j = 0; j < statTable.length-1; j += 2) {
		var statName = statTable[j].getElementsByTagName("th")
		var statVal = statTable[j+1].getElementsByTagName("td")

		for (var k = 0; k < statName.length; k++) {
			var Val = Number(statVal[k].innerHTML)
			var Var = statName[k].innerHTML
			if (!Var) {
			  continue
			}
			Statuses = remove(Statuses, Var)
			if(Val >= 100){
				statName[k].style.backgroundColor = "darkred";
				if(showResistant == 2 || (showResistant && (importantStatuses.indexOf(Var)>=0))){Resistant.push('<font color="' + noColor + '" style="font-weight: bold; text-decoration: underline;" >' + Var + ' (0)</font>')}
			} else { //if (Val < 100) {
			  Sus=(100 - Val)
			  Partial.push('<font color="' + (Sus<=verylowCutoff ? verylowColor : Sus<=lowCutoff ? lowColor  : Sus<=midCutoff ? midColor : Sus<=highCutoff ? highColor : Sus<=veryhighCutoff ? veryhighColor : highestColor) + '"  style="font-weight: ' + ((importantStatuses.indexOf(Var)>=0)?"bold":"normal") + '; text-decoration: ' + ((importantStatuses.indexOf(Var)>=0)?"underline":"initial") + ';" >' + Var + " (" + Sus + ")</font>")
			  statName[k].style.backgroundColor = "forestgreen";
			}
		}
	}

	// Output the resulting sensitive set -  String version: 
	if(Statuses.length == countStatuses){
		newCell.innerHTML = '<font color="' + allColor + '">All</font>'
	} else {
		// Sort the statuses
		Statuses.sort()
		Partial.sort()
		Resistant.sort()

		if(showResistant && importantStatuses.length>0){
			for(succTerm in Statuses){
			
				if(importantStatuses.indexOf(Statuses[succTerm])>=0){Statuses[succTerm] = '<font style="font-weight: bold; text-decoration: underline;" color="' + allColor + '">' + Statuses[succTerm] + '</font>'}
				else {Statuses[succTerm] = '<font color="' + perfectColor + '">' + Statuses[succTerm] + '</font>'}
			}

			newCell.innerHTML = Statuses.toString().replace(/\sRes/g, "").replace(/,/g, Separator);

		} else {
			newCell.innerHTML = '<font color="' + perfectColor + '">' + Statuses.toString().replace(/\sRes/g, "").replace(/,/g, Separator) + '</font>';
		}
		
		if(Partial.length > 0){ newCell.innerHTML = newCell.innerHTML + Separator + Partial.toString().replace(/\sRes/g, "").replace(/,/g, Separator)};
		if(Resistant.length > 0){ newCell.innerHTML = newCell.innerHTML + Separator + Resistant.toString().replace(/\sRes/g, "").replace(/,/g, Separator) };
	}
}