import kaboom from "kaboom"

// initialize context
kaboom({
  font: "sink",
  background: [ 210, 210, 155],
  //backgroundImage:url("https://wallpaperaccess.com/full/1124099.jpg")-does not works
})

// lets load the sprites
loadSprite("bug", "sprites/bug.png");
loadSprite("coder", "sprites/coder.png");
loadSprite("tea", "sprites/tea.png");

// lets load the music
loadSound("game_over", "sounds/game_over.wav");
loadSound("game music", "sounds/game music.mp3");
loadSound("sip", "sounds/sip.wav");


//lets define some game variables
let SPEED = 620;
let BSPEED = 2;
let SCORE = 0;
let scoreText;
let bg = false;
let gameMusic;
//lets define a function to display score
const displayScore =()=>{
  destroy(scoreText)
  // a simple score counter
  scoreText = add([
      text("Score: " + SCORE),
      scale(3),
      pos(width()-181, 21),
      color(10, 10, 255)
  ])
}

//lets define a funcction to play gackgroundd game music
const playBg=()=>{
  if(!bg)
  {
    gameMusic=play("game music",{
      volume:0.7
    })
    bg=true;
  }
}
//lets add the player
const player = add([
    sprite("coder"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    scale(0.20),
])

//player motion using the arrow keys
onKeyDown("left", () => {
  playBg()
  player.move(-SPEED, 0)
})
onKeyDown("right", () => {
  playBg()
  player.move(SPEED, 0)
})
onKeyDown("up", () => {
  playBg()
  player.move(0, -SPEED)
})
onKeyDown("down", () => {
  playBg()
  player.move(0, SPEED)
})

//lets add the 4 bugs and 1 tea on loop
setInterval(()=>{
  for(let i=0;i<4;i++)
  {
    let x = rand(0,width())
    let y = height()

    let c=add([
      sprite("bug"),
      pos(x, y),
      area(),
      scale(0.04),
      "bug"
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x,c.pos.y-BSPEED)
    })
    if(BSPEED<10){
      BSPEED += 1
    }
  }

  let x = rand(0,width())
  let y = height()+1
  //lets introduce a tea for coder becoz he needs it
  let c=add([
    sprite("tea"),
    pos(x, y),
    area(),
    scale(0.15),
    "tea"
  ])
  c.onUpdate(()=>{
    c.moveTo(c.pos.x,c.pos.y-BSPEED)
  })
},4000)

player.onCollide("bug", () => {
  gameMusic.volume(0.1);
  play("game_over")
  destroy(player)
  addKaboom(player.pos)
  scoreText = add([
      text("Game Over"),
      scale(3),
      pos(10, 21),
      color(10, 10, 255)
  ])
  replayText = add([
      text("**Press Space Bar to replay**"),
      scale(4),
      pos(300, 300),
      color(10, 10, 255)
  ])
  onKeyPress("space", () => {
      window.location.reload();
  })
})

player.onCollide("tea", (tea) => {
  gameMusic.volume(0.3);
  play("sip",{
    volume:2
  })
  destroy(tea)
  SCORE += 1
  displayScore()
  
  //2 second wait volume is back
  wait(2, () => {
      gameMusic.volume(0.8);
  })
})

//Display the score
displayScore()
