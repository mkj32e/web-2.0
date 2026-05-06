alert("coucou");
new p5(function(p) {
  const W = 600, H = 400;
  let menuB = true;
  let joueurX, joueurY, fin, tirCooldown, dernierTir, tirsMax, killCompteur, ennemiesVitesse, pvBoss;
  let tirs = [], ennemies = [];
  let keys = {};

  function resetGame() {
    joueurX = 300; joueurY = 350;
    fin = false;
    tirCooldown = 300;
    dernierTir = p.millis();
    tirsMax = 10;
    killCompteur = 0;
    ennemiesVitesse = 3;
    pvBoss = 3;
    tirs = []; ennemies = [];
    menuB = true;
  }

  p.setup = function() {
    let canvas = p.createCanvas(W, H);
    canvas.parent('game-container');
    p.textFont('monospace');
    resetGame();
  };

  p.draw = function() {
    p.background(220);
    if (menuB) drawMenu();
    else drawGame();
  };

  function drawMenu() {
    p.fill(30);
    p.textSize(28);
    p.textAlign(p.CENTER);
    p.text('SPACE SHOOTER', W/2, 100);
    p.textSize(14);
    p.fill(80);
    p.text('Fleches pour bouger | Clic pour tirer', W/2, 135);

    let bx = 220, by = 160, bw = 160, bh = 50;
    let hover = p.mouseX > bx && p.mouseX < bx+bw && p.mouseY > by && p.mouseY < by+bh;
    p.fill(hover ? p.color(60,160,255) : p.color(100, 200, 255));
    p.noStroke();
    p.rect(bx, by, bw, bh, 8);
    p.fill(255);
    p.textSize(18);
    p.text('JOUER', W/2, by+32);
    p.textAlign(p.LEFT);
  }

  p.mousePressed = function() {
    if (menuB) {
      let bx = 220, by = 160, bw = 160, bh = 50;
      if (p.mouseX > bx && p.mouseX < bx+bw && p.mouseY > by && p.mouseY < by+bh) {
        menuB = false;
        fin = false;
        killCompteur = 0;
        ennemiesVitesse = 3;
        pvBoss = 3;
        tirs = []; ennemies = [];
      }
    }
  };

  function drawGame() {
    if (fin) {
      p.fill(30);
      p.textSize(32);
      p.textAlign(p.CENTER);
      p.text('GAME OVER', W/2, H/2 - 20);
      p.textSize(16);
      p.text('Kills : ' + killCompteur, W/2, H/2 + 20);
      p.fill(100, 200, 255);
      p.noStroke();
      p.rect(W/2 - 70, H/2 + 50, 140, 40, 8);
      p.fill(255);
      p.textSize(16);
      p.text('Rejouer', W/2, H/2 + 76);
      p.textAlign(p.LEFT);
      return;
    }

    // mouvement joueur
    if (keys['ArrowLeft']) joueurX -= 7;
    if (keys['ArrowRight']) joueurX += 7;
    joueurX = p.constrain(joueurX, 10, W-10);

    // tir
    if (p.mouseIsPressed && tirs.length < tirsMax && p.millis() - dernierTir > tirCooldown) {
      dernierTir = p.millis();
      tirs.push([joueurX, joueurY]);
    }

    spawnEnnemi();

    // joueur
    p.fill(50, 120, 255);
    p.noStroke();
    p.ellipse(joueurX, joueurY, 20, 20);

    // ennemis
    for (let i = ennemies.length - 1; i >= 0; i--) {
      let e = ennemies[i];
      e[1] += ennemiesVitesse * 0.3;
      if (e[1] >= H) { fin = true; break; }
      let isBoss = killCompteur % 10 === 0 && killCompteur !== 0;
      p.fill(isBoss ? p.color(200, 30, 30) : p.color(200, 40, 0));
      p.ellipse(e[0], e[1], e[2], e[2]);
    }

    // tirs
    for (let i = tirs.length - 1; i >= 0; i--) {
      tirs[i][1] -= 5;
      p.fill(255, 230, 0);
      p.ellipse(tirs[i][0], tirs[i][1], 8, 8);
      if (tirs[i][1] < 0) tirs.splice(i, 1);
    }

    collisions();

    // HUD
    p.fill(30);
    p.textSize(16);
    p.textAlign(p.LEFT);
    p.text('Kills : ' + killCompteur, 10, 30);
    if (killCompteur % 10 === 0 && killCompteur !== 0) {
      p.fill(200, 30, 30);
      p.text('BOSS PV : ' + pvBoss, W - 120, 30);
    }
  }

  p.mouseClicked = function() {
    if (fin) {
      let bx = W/2 - 70, by = H/2 + 50, bw = 140, bh = 40;
      if (p.mouseX > bx && p.mouseX < bx+bw && p.mouseY > by && p.mouseY < by+bh) {
        resetGame();
        menuB = false;
      }
    }
  };

  function spawnEnnemi() {
    if (ennemies.length === 0) {
      if (killCompteur % 10 === 0 && killCompteur !== 0) {
        pvBoss = 3;
        ennemies.push([p.random(20, W-20), ennemiesVitesse * 0.7, p.random(50, 80)]);
      } else {
        ennemies.push([p.random(20, W-20), ennemiesVitesse, p.random(30, 50)]);
      }
    }
  }

  function collisions() {
    for (let i = tirs.length - 1; i >= 0; i--) {
      for (let j = ennemies.length - 1; j >= 0; j--) {
        let d = p.dist(tirs[i][0], tirs[i][1], ennemies[j][0], ennemies[j][1]);
        if (d < ennemies[j][2] * 0.8) {
          tirs.splice(i, 1);
          if (killCompteur % 10 === 0 && killCompteur !== 0) {
            pvBoss--;
            if (pvBoss <= 0) {
              ennemies.splice(j, 1);
              killCompteur++;
              ennemiesVitesse += 0.5;
            }
          } else {
            ennemies.splice(j, 1);
            killCompteur++;
            ennemiesVitesse += 0.5;
          }
          break;
        }
      }
    }
  }

  p.keyPressed = function() { keys[p.key] = true; };
  p.keyReleased = function() { keys[p.key] = false; };
});