function ifElse(array){
    const [name, money, beerCount, chipsCount] = array;
    const moneY = Number(money);
    const beerCounT = Number(beerCount);
    const chipsCounT = Number(chipsCount);

    let beerPrice = beerCounT * 1.20;
    let oneChips = beerPrice * 0.45;
    let chipsPrice = Math.ceil(chipsCounT * oneChips);
    let totalPrice = beerPrice + chipsPrice;

    if(moneY > totalPrice){
        console.log(`${name} bought a snack and has ${(moneY - totalPrice).toFixed(2)} leva left.`);
    }
    else{
        console.log(`${name} needs ${(totalPrice - moneY).toFixed(2)} more leva!`);
    }
}
ifElse([
"George",
"10",
"2",
"3"
])
