let vie = 5;
let WIDTH = 600;
let HEIGHT = 400;
let score = 0;

let shoot = [];
let monstre = [];
let shoot_m = [];

let x = 200;
let y = 350;

let c_spawn = 0;
let c_tir = 0;

function tir() {
  shoot.push([x, y]);
}

function spawn_monstre() {
  monstre.push([random(WIDTH), random(200), 0]);
}

function tir_monstre() {
  for (let i = 0; i < monstre.length; i++) {
    monstre[i][2] += 1;
    if (monstre[i][2] > 60) {
      shoot_m.push([monstre[i][0], monstre[i][1]]);
      monstre[i][2] = 0;
    }
  }
}

function mouv_tir() {
  for (let i = 0; i < shoot.length; i++) {
    shoot[i][1] -= 5;
  }
  for (let i = 0; i < shoot_m.length; i++) {
    shoot_m[i][1] += 5;
  }
}

function collision_monstre() {
  for (let i = 0; i < shoot.length; i++) {
    for (let j = 0; j < monstre.length; j++) {
      if (
        monstre[j][0] - 15 < shoot[i][0] &&
        shoot[i][0] < monstre[j][0] + 15 &&
        monstre[j][1] - 15 < shoot[i][1] &&
        shoot[i][1] < monstre[j][1] + 15
      ) {
        score += 1;
        shoot.splice(i, 1);
        monstre.splice(j, 1);
        return;
      }
    }
  }
}

function collision_balle() {
  for (let i = 0; i < shoot_m.length; i++) {
    if (
      x - 10 < shoot_m[i][0] &&
      shoot_m[i][0] < x + 10 &&
      y - 10 < shoot_m[i][1] &&
      shoot_m[i][1] < y + 10
    ) {
      vie -= 1;
      shoot_m.splice(i, 1);
      return;
    }
  }
}

function texture() {
  fill(0);

  ellipse(x, y, 20, 20);

  for (let i = 0; i < monstre.length; i++) {
    ellipse(monstre[i][0], monstre[i][1], 30, 30);
  }

  for (let i = 0; i < shoot.length; i++) {
    ellipse(shoot[i][0], shoot[i][1], 10, 10);
  }

  for (let i = 0; i < shoot_m.length; i++) {
    ellipse(shoot_m[i][0], shoot_m[i][1], 10, 10);
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background(220);

  // Déplacement joueur
  if (keyIsDown(LEFT_ARROW)) x -= 10;
  if (keyIsDown(RIGHT_ARROW)) x += 10;
  if (keyIsDown(UP_ARROW)) y -= 10;
  if (keyIsDown(DOWN_ARROW)) y += 10;

  // Tir clavier
  if (keyIsDown(71)) { // touche 'g'
    if (c_tir > 10) {
      tir();
      c_tir = 0;
    }
  }

  // Tir souris
  if (mouseIsPressed) {
    if (c_tir > 10) {
      tir();
      c_tir = 0;
    }
  }

  // Compteurs
  c_tir++;
  c_spawn++;

  // Spawn monstres
  if (c_spawn > 60) {
    spawn_monstre();
    c_spawn = 0;
  }

  // Logique
  tir_monstre();
  mouv_tir();
  collision_monstre();
  collision_balle();

  // Dessin
  texture();

  // ❤️ Vies
  fill(0);
  textSize(20);
  text("Vies : " + vie, 10, 20);

  // 🎯 Score
  text("Score : " + score, 10, 40);

  // 💀 Game Over
  if (vie <= 0) {
    background(0);
    fill(255, 0, 0);
    textSize(40);
    text("GAME OVER", WIDTH / 2 - 120, HEIGHT / 2);
    noLoop();
  }
}
