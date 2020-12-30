//Create variables here
var dog, happyDog;
var database;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;
var foodStock,foodS;

function preload()
{
  //load images here
  dog = loadImage(images/dogImg.png);
  happyDog = loadImage(images/dogImg1.png);
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,20);
  dog.addImage(dog);

  feedPet = createrButton("Feed the dog.");
  feedPet.position(700, 95);
  feedPet.mousePressed(feedDog);

  addFood = createrButton("Add food.");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  database = firebase.databse();

  foodStock = database.ref('Food');
foodStock.on("value",readStock);
}


function draw() {  

  background(46, 139, 87);

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }*/

  drawSprites();
  //add styles here

  text("Note : Press Up arrow key to feed drago milk!");
  textSize(7);
  fill("white");
  stroke(7);

  fedTime = database.ref('Fed Time');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  readStock();
  writeStock();
}

  function readStock(data){
    foodS = data.val();
  }

  function writeStock(x){

    if(x<=0){
      x = 0;
    }
    else{
      x = x - 1;
    }
    database.ref('/').update({
      Food:x
    })
  }