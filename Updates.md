# Updates
## Version 0.1.4 (2018/07/15 at 06:07 UTC)
Updates:
- Now works with the latest changes in ACDB
  -- Notably the parser looks for the the text label in the attributes rather than the innerHTML (which was changed to the icon-label)
  -- Removed the 'Debuff Res' choice 
- Made a toggle for the susceptibility list (click the "Susceptibility status" link to toggle their appearance)
- Added more options to showResistant (see the // comments in the script for more details)
- Added an option to reflect the icon's background table colour to the gradient style defined rather than the default green/red option (if you want to, personally I think that the green/red looks good. To change the olour, modify binomialColor in the midst of the code) 

## Version 0.1.3 (2018/05/15 at 19:43 UTC)
Minor updates:
- Showed the susceptible value for resisted important statuses (instead of just saying (0)).
- Easier to adjust the assumed success rate (default: 100)
- Sorting the skills by susceptibility bin (high to low) and then alphabetically
- Added an option "groupImpStat" which, if set to 1, the important statuses will be grouped together in the appropriate listing section
  (e.g. if partially resisted, it will be the first item listed after the susceptible statuses).
- Changed the var 'Statuses' to 'origStatuses' and moved it to the top for easier editing.

## Version 0.1.2 (2018/05/13 at 04:00 UTC)
 Noticed an issue where it included statuses not in the defined var Statuses[].
 This has now been addressed. Please update if your manifest shows version 0.1 rather than 0.1.2
 (but the important item is to update the content.js).
 
## Version 0.1[.0](2018/05/13 at 03:20 UTC)
The extension became live.
