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

UnitTypes.corvus.weapons.get(0).bullet.colors = [Color.valueOf("ff000066"), Color.red, Color.white];
UnitTypes.corvus.weapons.get(0).bullet.shootEffect = anukeLaserCharge;
UnitTypes.corvus.weapons.get(0).bullet.lightColor = Color.red;
UnitTypes.corvus.weapons.get(0).bullet.lightningColor = Color.red;

if(!Vars.headless){
  const meta = Vars.mods.locateMod("do-not-the-cat").meta;
  meta.displayName = "[red]Do not the Anuke"
  meta.author = "[#FCC21B]MEEP of Faith";
  meta.description = "[red]Do not the Anuke"
}