var path,boy,cash,diamonds,jwellery,sword,gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,gameImge;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
//create gameOver sprite
gameOver = createSprite(200,200,30,30);
gameOver.addImage("gameOver.png",gameOverImg);
gameOver.visible= false;
gameOver.scale=0.5;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();

      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();

      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
    }
  }
   if (gameState === END) {
 
     // changing the velocity of path & boy
     path.velocityX=0;
     boy.velocityX=0;
     
//changing the lifetime of cash,diamond & jewelry group
     cashG.setLifetimeEach(-1);
     diamondsG.setLifetimeEach(-1);
     jwelleryG.setLifetimeEach(-1);
     
//changing the velocity of cash,diamond,sword & jwellery groups
     cashG.velocityX = 0;
     jwelleryG.velocityX = 0;
     diamondsG.velocityX = 0;
     swordGroup.velocityX = 0;
     
//changing the boy animation
     boy.changeAnimation("Runner-2.png");
    
// changing the gameOver visibility & treastureCollection to 0
     gameOver.visible = true;
     treasureCollection = 0;
     
// changing the destroy cash ,diamonds,jewllery & sword group & boy
     cashG.destroyEach();
     diamondsG.destroyEach();
     jwelleryG.destroyEach();
     swordGroup.destroyEach();
     boy.destroy();
   }
    
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,5,30);
    
     
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}