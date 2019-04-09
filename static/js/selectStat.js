

function selectStat(stats) {
    /* selectStat takes a list of percentages and 
    will return a random number between 0 and the 
    length of the list. */

    statList = [];
    selector = 0;
    // console.log(stats)

if (!stats) {
    stats = [1];
}

    stats.forEach( percent => {
        percentage = Math.floor(100 * percent);
        for (i = 0; i < percentage; i++) {
            statList.push(selector);
        }
        selector++;
    });
        // console.log(statList);
        x = Math.floor(Math.random() * 100);
        console.log(`x = ${x}`);
        return statList[x];
    
}

percents = [.1, .2, .3, .4];
// console.log(`returns: ${selectStat(percents)}`);