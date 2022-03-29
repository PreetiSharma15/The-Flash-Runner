var bg_img;

var bombimg, jumpimg, runimg, ninjaimg, energyimg, boomimg, obs1, obs2, obs;
var bg, hero, bomb, star, energy, r, energyimg2, ground, rewardgrp, obstaclegrp;

var gameState = "PLAY"

var a = 0;
var b;

var energy_left = 200
var scrollSpeed = 3;
var score = 0

// LOAD ASSETS
function preload() {
  bg_img = loadImage("city.jpg")
  bombimg = loadImage("boomb.gif")
  boomimg = loadAnimation("boom.png")
  ninjaimg = loadImage("star.png")
  energyimg = loadImage("power.png")
  runimg = loadAnimation("214463_after.gif")
  jumpimg = loadAnimation("jump.png")
  energyimg2 = loadAnimation("energy2.gif")
  obs1 = loadAnimation("obstacle1.gif")
  obs2 = loadAnimation("snow golem.gif")
}

function setup() {
  createCanvas(1100, 600)
  b = width;

  hero = createSprite(100, 450, 10, 10)
  hero.addAnimation("run", runimg)
  hero.addAnimation("jump", jumpimg)
  hero.addAnimation("end", boomimg)
  hero.setCollider("circle", 0, 0, 150)

  hero.scale = 0.6

  obstaclegrp = new Group()
  rewardgrp = new Group()

  ground = createSprite(0, 580, 1100 * 2, 20)
  ground.visible = false;

}

function draw() {
  background(0)

  hero.velocityY = hero.velocityY + 0.8
  spawnRewards()
  spawnObstacles()

  if (obstaclegrp.isTouching(hero)) {
    gameState = "END"
  }

  else if (gameState === "END") {
    scrollSpeed = 0
    obstaclegrp.setVelocityXEach(0)
    rewardgrp.setVelocityXEach(0)
    obstaclegrp.setLifetimeEach(-1)
    rewardgrp.setLifetimeEach(-1)
    hero.velocityY = 0
    hero.changeAnimation("end")

  }
  
  image(bg_img, a, 0, width, height);
  image(bg_img, b, 0, width, height);

  a -= scrollSpeed;
  b -= scrollSpeed;

  if (a < -width) {
    a = width;
  }
  if (b < -width) {
    b = width;
  }

  if (hero.collide(ground)) {
    hero.changeAnimation("run")
  }
  showEnergyBar()
  drawSprites()
}

//Update Velocity to Jump
function Jump() {
  hero.velocityY = -10
  hero.changeAnimation("jump")

}

//Spawn Reward every 250 frames
function spawnRewards() {
  if (frameCount % 250 === 0) {
    energy = createSprite(1090, random(130, 310))
    energy.velocityX = -4

    r = Math.round(random(1, 2))
    
    //POWER Reward
    if (r === 1) {
      energy.addImage(energyimg)
      energy.scale = 0.2
    }
    //Coins
    else if (r === 2) {
      energy.addAnimation("moving", energyimg2)
      energy.scale = 0.2
    }
    energy.lifetime = 500
    rewardgrp.add(energy)
  }
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    obs = createSprite(1090, 300)
    obs.y = Math.round(random(350, 527))
    obs.velocityX = -4
    r = Math.round(random(1, 3))
    if (r === 1) {
      obs.addAnimation("blast", bombimg)
      obs.scale = 0.5
    }
    else if (r === 2) {
      obs.addAnimation("snow", obs2)
      obs.scale = 0.5
    }
    else {
      obs.addAnimation("rain", obs1)
      obs.scale = 0.4
    }
    obs.lifetime = 500
    obstaclegrp.add(obs)
  }
}

function showEnergyBar() {
  push();
  image(energyimg, 40, 45, 40, 40);
  fill("white");
  rect(87, 55, 200, 20);
  fill("red");
  rect(87, 55, energy_left, 20);
  noStroke();
  pop();
}
function keyPressed()
{
  if(keyCode === 32 && gameState==="PLAY"){
    if(energy_left>0 ){
    Jump()
    energy_left=energy_left-2
    }
   }  
}
