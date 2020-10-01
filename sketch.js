//Create variables here
var dog,happydog,foodS,foodStock;
var database;
var dogg,happydogg;
function preload()
{
  //load images here
  dogg=loadImage("dogImg.png")
  happydogg=loadImage("dogImg1.png")

}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,20,20);
  dog.scale = 0.2;
  dog.addImage(dogg);
  foodStock=database.ref("food")
  foodStock.on("value",readStock)
}


function draw() {  
background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogg);
  }
  else{
    dog.addImage(dogg);
  }
  drawSprites();
  //add styles here
  fill(255,255,254); 
  stroke("black"); 
  text("Food remaining : "+foodS,170,100); 
  textSize(13); 
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update(
    {
    food:x
  }
  )
}



