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

const grip = new Vec2();
const banHammer = new Effect(90, 100, e => {
  var handle = Color.tan;
  var head = Color.darkGray;
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
  
  grip.trns(angle - 90, 0, handleLength * grow);
  
  Lines.stroke(4 * size * grow, handle);
  Draw.alpha(fade);
  Lines.lineAngle(x, y, angle, handleLength * grow);
  Lines.stroke(12 * size * grow, head);
  Draw.alpha(fade);
  Lines.lineAngleCenter(grip.x + x, grip.y + y, angle + 90, headLength * grow);
  
  //no idea why Mathf.within wasn't working for me.
  //if(Mathf.within(e.time, seed, 1)){
  if(seed - e.time < 1 && seed - e.time > 0){
    Effect.shake(40 * size, 100 * size, grip.x + x, e.y);
  }
});

UnitTypes.corvus.weapons.get(0).bullet.colors = [Color.valueOf("ff000066"), Color.red, Color.white];
UnitTypes.corvus.weapons.get(0).bullet.shootEffect = anukeLaserCharge;
UnitTypes.corvus.weapons.get(0).bullet.lightColor = Color.red;
UnitTypes.corvus.weapons.get(0).bullet.lightningColor = Color.red;
UnitTypes.corvus.weapons.get(0).bullet.hitEffect = banHammer;

if(!Vars.headless){
  const meta = Vars.mods.locateMod("do-not-the-cat").meta;
  meta.displayName = "[red]Do not the Anuke"
  meta.author = "[#FCC21B]MEEP of Faith";
  meta.description = "[red]Do not the Anuke"
}