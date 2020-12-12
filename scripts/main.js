const anukeLaserCharge = new Effect(80, 100, e => {
  Draw.color(Color.red);
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, 4 + e.fout() * 100);

  Fill.circle(e.x, e.y, e.fin() * 20);

  Angles.randLenVectors(e.id, 20, 40 * e.fout(), (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fin() * 5);
  });

  Draw.color();

  Fill.circle(e.x, e.y, e.fin() * 10);
});

const banHammer = new Effect(90, 100, e => {
  var side = Mathf.signs[Mathf.round(Mathf.randomSeed(e.id, 1))];
  var size = 1.5;
  
  var handleLength = 35 * size;
  var headLength = 20 * size;
  var seed = Mathf.randomSeed(e.id, 25, e.lifetime - 10);
  var fin = Mathf.curve(e.time, 10, seed);
  var fade = 1 - Mathf.curve(e.time, seed, seed + 10);
  var grow = Mathf.curve(e.time, 0, 10);
  var angle = 90 + (90 * Interp.pow5In.apply(fin) * side);
  var x = e.x + handleLength * side;
  var y = e.y + headLength;
  
  Tmp.v1.trns(angle - 90, 0, handleLength * grow);
  
  Lines.stroke(4 * size * grow, Color.tan);
  Draw.alpha(fade);
  Lines.lineAngle(x, y, angle, handleLength * grow);
  Lines.stroke(12 * size * grow, Color.darkGray);
  Draw.alpha(fade);
  Lines.lineAngleCenter(Tmp.v1.x + x, Tmp.v1.y + y, angle + 90, headLength * grow);
  
  if(Mathf.within(e.time, 0, seed, 0, 0.1 * Time.delta)){
    Effect.shake(60 * size, 150 * size, Tmp.v1.x + x, e.y);
  }
});
banHammer.layer = Layer.max;

UnitTypes.corvus.weapons.get(0).bullet.colors = [Color.valueOf("ff000066"), Color.red, Color.white];
UnitTypes.corvus.weapons.get(0).bullet.shootEffect = anukeLaserCharge;
UnitTypes.corvus.weapons.get(0).bullet.lightColor = Color.red;
UnitTypes.corvus.weapons.get(0).bullet.lightningColor = Color.red;
UnitTypes.corvus.weapons.get(0).bullet.hitEffect = banHammer;

if(!Vars.headless){
  Core.app.post(() => {
    const meta = Vars.mods.locateMod("do-not-the-cat").meta;
    meta.displayName = "[red]Do not the Anuke";
    meta.author = "[#FCC21B]MEEP of Faith";
    meta.description = "[red]Do not the Anuke";
  });
}