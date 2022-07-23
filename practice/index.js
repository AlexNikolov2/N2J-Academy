function crypto(array){
    //array destructuring so u can get the variables
    let [videoCard, transitioner, tokPerCardPerDay, moneyPerCardPerDay] = array;

    //changed the last letter in the variables
    let videoCarD = videoCard;
    let transitioneR = Number(transitioner);
    let tokPerCardPerDaY = Number(tokPerCardPerDay); 
    let moneyPerCardPerDaY = Number(moneyPerCardPerDay);

    //finding price for the machine
    let videoCardPrice = videoCarD * 13;
    let transitionerPrice = transitioneR * 13;
    let price = videoCardPrice + transitionerPrice + 1000;
    console.log(price);

    //срок за възвръщаемост
    let winPerCardPerDay = moneyPerCardPerDaY - tokPerCardPerDaY;
    let winPerDay = 13 * winPerCardPerDay;
    let pechalbaTime = price / winPerDay;
    console.log(Math.ceil(pechalbaTime));

}
crypto(["700",
"15",
"0.20",
"2"])