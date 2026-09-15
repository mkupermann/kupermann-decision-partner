/* Rebuild: npm install --no-save sharp && node generate-figures.cjs
 * SVG text remains editable. PNGs are rendered at twice the SVG dimensions.
 * Optionally set SHARP_MODULE to an installed Sharp module and pass a QA directory.
 */
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const out = __dirname;
const qa = process.argv[2];
const C = {cream:'#faf8f2',paper:'#f5f2e8',ink:'#141413',secondary:'#6b6862',rust:'#b8532e',rule:'#d8d1c4'};
const xml = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const text = (x,y,s,size=30,color=C.ink,weight=400,extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" ${extra}>${xml(s)}</text>`;
const lines = (x,y,items,size=30,color=C.secondary,leading=41,weight=400) => items.map((s,i)=>text(x,y+i*leading,s,size,color,weight)).join('');
const line = (x1,y1,x2,y2,color=C.rule,width=2,extra='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${extra}/>`;
const rect = (x,y,w,h,fill=C.paper) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
const heading = (x,y,s,size=60) => text(x,y,s,size,C.ink,400,'font-family="Georgia, Cambria, serif"');
function svg(w,h,title,desc,body,lang='en') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xml:lang="${lang}" role="img" aria-labelledby="title description">
<title id="title">${xml(title)}</title><desc id="description">${xml(desc)}</desc>
<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 1 1 L 8 5 L 1 9" fill="none" stroke="${C.rust}" stroke-width="1.5"/></marker></defs>
<rect width="${w}" height="${h}" fill="${C.cream}"/>
<g font-family="Segoe UI, Arial, sans-serif">${body}</g></svg>`;
}
const brand = y => text(72,y,'Kupermann Decision Partner',28,C.secondary);
const footer = (y,label) => line(72,y-34,1208,y-34)+text(72,y,label,26,C.secondary);

function cycle(lang) {
  const de = lang==='de';
  const title = de?'Von der Frage zur Entscheidung':'From question to decision';
  const steps = de ? [
    ['Problem klären',['Welche Entscheidung steht an?','Wer ist betroffen, was ist veränderbar?']],
    ['Kriterien festlegen',['Was zählt? Welche Zielkonflikte und Risiken','akzeptiert der Mensch?']],
    ['Optionen entwickeln',['Tragfähige Alternativen vergleichen,','einschließlich Status quo und einfachster Lösung.']],
    ['Gezielt untersuchen',['Welche offene Annahme könnte die Entscheidung ändern?','Dafür passende Quellen, Berechnungen oder Tests wählen.']],
    ['Empfehlung hinterfragen',['Gegenbelege, Nachteile und Sensitivität prüfen.','Bleibt die Empfehlung bei anderen Annahmen tragfähig?']],
    ['Empfehlen und überprüfen',['Der Mensch entscheidet. Nächsten Schritt und','einen konkreten Anlass zur Neubewertung festhalten.']]
  ] : [
    ['Frame the decision',['What needs deciding?','Who is affected, and what can change?']],
    ['Set the criteria',['What matters? Which trade-offs and risks','does the human accept?']],
    ['Develop options',['Compare credible alternatives,','including the status quo and the simplest solution.']],
    ['Investigate selectively',['Which unknown could change the decision?','Choose the evidence, calculation or test that resolves it.']],
    ['Challenge the recommendation',['Check counterevidence, downsides and sensitivity.','Does the recommendation survive different assumptions?']],
    ['Recommend and revisit',['The human decides. Record the next step','and a concrete trigger for reconsideration.']]
  ];
  let b=brand(58)+heading(72,146,title,de?57:64)+text(72,202,de?'Tiefe nach Bedarf. Zusätzliche Arbeit muss die Entscheidung verbessern.':'Go deeper when it can improve the decision.',30,C.secondary);
  const ys=[300,449,598,747,896,1045];
  b+=line(112,323,112,1020,C.rule,3);
  b+=`<path d="M 86 896 C 34 896 34 872 34 838 L 34 343 C 34 307 39 300 78 300" fill="none" stroke="${C.rust}" stroke-width="3" marker-end="url(#arrow)"/>`;
  steps.forEach((s,i)=> {
    b+=`<circle cx="112" cy="${ys[i]}" r="28" fill="${C.cream}" stroke="${i===5?C.rust:C.rule}" stroke-width="2"/>`;
    b+=text(112,ys[i]+10,String(i+1),28,C.rust,600,'text-anchor="middle"');
    b+=text(174,ys[i]+10,s[0],41,C.ink,600)+lines(174,ys[i]+57,s[1],29,C.secondary,39);
  });
  b+=rect(72,1173,1136,102)+text(96,1216,de?'Wenn eine Annahme nicht hält:':'If an assumption fails:',30,C.rust,600)+text(96,1256,de?'Problem, Kriterien oder Untersuchung gezielt wieder aufnehmen.':'Return to the relevant frame, criteria or investigation.',29,C.ink);
  return svg(1280,1320,title,de?'Sechs Schritte mit Rücksprung bei widerlegten Annahmen. Der Mensch behält die Entscheidung.':'Six steps, with a return loop when assumptions fail. The human retains the decision.',b,lang);
}

function responsibilities(lang) {
  const de=lang==='de';
  const title=de?'Verantwortung bleibt beim Menschen':'Human judgment stays in charge';
  let b=brand(58)+heading(72,146,title,de?55:60)+text(72,202,de?'Die KI erweitert die Prüfung. Sie übernimmt keine Werturteile.':'AI expands the analysis. It does not own the value judgments.',30,C.secondary);
  b+=line(72,258,1208,258,C.ink,2);
  b+=text(72,327,de?'Der Mensch verantwortet':'The human owns',36,C.rust,600)+text(688,327,de?'Die KI unterstützt':'AI supports',36,C.ink,600);
  const human=de?['Ziele und Problemrahmen','Werte und Prioritäten','Abwägungen und Zielkonflikte','Akzeptanz von Risiken','Die Entscheidung']:['Goals and framing','Values and priorities','Trade-offs','Risk acceptance','The decision'];
  const ai=de?['Optionen entwickeln','Quellen recherchieren','Berechnungen prüfen','Annahmen hinterfragen','Entscheidungsvorlage erstellen']:['Developing options','Researching sources','Checking calculations','Challenging assumptions','Preparing the decision brief'];
  b+=line(634,294,634,774,C.rule,2);
  human.forEach((s,i)=>b+=text(72,406+i*79,s,de?31:35,C.ink,i===4?600:400));
  ai.forEach((s,i)=>b+=text(688,406+i*79,s,de?30:34,C.ink));
  b+=rect(72,812,1136,217);
  b+=text(98,865,de?'Gemeinsam prüfen':'Checked together',33,C.rust,600);
  b+=lines(98,917,de?['Quellen, Annahmen und Grenzen sichtbar machen.','Prüfen, ob die Evidenz für diese Entscheidung ausreicht.']:['Make sources, assumptions and limitations visible.','Check whether the evidence is enough for this decision.'],31,C.ink,45);
  b+=text(72,1095,de?'Vorgeschlagene Präferenzen sind noch keine bestätigten Präferenzen.':'A proposed preference is not an agreed preference.',29,C.secondary);
  return svg(1280,1160,title,de?'Mensch: Ziele, Werte, Abwägungen, Risiken und Entscheidung. KI: Optionen, Recherche, Berechnungen, Gegenprüfung und Vorlage. Evidenzprüfung gemeinsam.':'Human: goals, values, trade-offs, risks and decision. AI: options, research, calculations, challenge and brief. Evidence checks are shared.',b,lang);
}

function pilot(lang) {
  const de=lang==='de';
  const title=de?'Was bleibt von sechs Minuten?':'What remains of six minutes?';
  let b=brand(58)+heading(72,146,title,62)+text(72,202,de?'Illustratives Rechenbeispiel. Fiktive Daten, kein Wirksamkeitsnachweis.':'Illustrative example. Fictional figures, not evidence of effectiveness.',29,C.secondary);
  b+=line(72,254,1208,254,C.ink,2);
  const cols=[72,448,886];
  b+=text(cols[0],316,de?'Gemeldete Zeitersparnis':'Reported time saving',29,C.secondary)+text(cols[1],316,de?'Nicht erfasste Nachprüfung':'Omitted review time',29,C.secondary)+text(cols[2],316,de?'Nettoersparnis':'Net saving',29,C.secondary);
  b+=text(cols[0],410,'6 min',78,C.ink,600)+text(cols[1],410,'4 min',78,C.ink,600)+text(cols[2],410,'2 min',78,C.rust,600);
  b+=text(367,402,'−',58,C.secondary)+text(800,402,'=',58,C.secondary);
  b+=line(72,460,1208,460,C.rule,2);
  b+=text(72,526,de?'Jährliches Volumen im Beispiel':'Annual volume in this example',31,C.ink,600);
  b+=text(72,582,de?'24.000 Tickets × 60 % Routineanteil = 14.400 Routinefälle':'24,000 tickets × 60% routine share = 14,400 routine cases',32,C.ink);
  b+=text(72,635,de?'14.400 × 2 Minuten ÷ 60 = 480 Stunden Kapazität':'14,400 × 2 minutes ÷ 60 = 480 hours of capacity',32,C.ink);
  b+=text(72,718,de?'Wert und Kosten pro Jahr':'Annual value and costs',31,C.ink,600);
  const rows=de?[
    ['480 Stunden × 50 EUR pro Stunde','24.000 EUR',C.ink],
    ['Abzüglich jährlicher Lizenz','− 18.000 EUR',C.ink],
    ['Saldo vor einmaligen Kosten','6.000 EUR',C.ink],
    ['Abzüglich einmaliger Integration','− 12.000 EUR',C.ink],
    ['Saldo im ersten Jahr','− 6.000 EUR',C.rust]
  ]:[
    ['480 hours × EUR 50 per hour','EUR 24,000',C.ink],
    ['Less annual licence','− EUR 18,000',C.ink],
    ['Balance before one-off costs','EUR 6,000',C.ink],
    ['Less one-off integration','− EUR 12,000',C.ink],
    ['First-year balance','− EUR 6,000',C.rust]
  ];
  rows.forEach((r,i)=> {
    const y=780+i*76;
    if(i===2||i===4)b+=line(72,y-49,1208,y-49,C.rule,2);
    b+=text(72,y,r[0],31,r[2],i===4?600:400)+text(1208,y,r[1],35,r[2],i===4?600:400,'text-anchor="end"');
  });
  b+=rect(72,1144,1136,248);
  b+=text(98,1194,de?'Kapazitätswert ist keine zahlungswirksame Einsparung.':'Capacity value is not cash savings.',32,C.rust,600);
  b+=lines(98,1245,de?['Einfache Fälle und freiwillig Teilnehmende begrenzen die Aussage.','Vor einem vollständigen Rollout gezielt prüfen:','repräsentative Fälle, gesamte Nacharbeit und tatsächliche Nutzung.']:['Selected simple tickets and volunteers limit the inference.','Validate before a full rollout: representative cases,','all review work and whether the released capacity is used.'],29,C.ink,41);
  return svg(1280,1440,title,de?'Fiktives Beispiel: sechs Minuten gemeldete Ersparnis minus vier Minuten Nachprüfung ergeben zwei Minuten netto. Daraus folgen 480 Stunden und 24.000 Euro Kapazitätswert. Nach Lizenz bleiben 6.000 Euro pro Jahr, nach einmaliger Integration minus 6.000 Euro im ersten Jahr.':'Fictional example: six reported minutes less four review minutes yields two net minutes, 480 hours and EUR 24,000 capacity value. After licence EUR 6,000 per year remains; after one-off integration, minus EUR 6,000 in year one.',b,lang);
}

function hero() {
  let b=rect(1080,0,520,840,C.paper);
  b+=text(82,105,'Kupermann',37,C.ink,600);
  b+=heading(78,301,'Decision',132)+heading(78,446,'Partner',132);
  b+=text(86,570,'Established methods.',46,C.ink)+text(86,633,'Accountable decisions.',46,C.ink);
  b+=text(86,746,'An agent skill for advisers and decision-makers',31,C.secondary);
  // A decision path: alternative evidence enters, a deliberate choice exits.
  b+=`<path d="M 1160 233 L 1332 405 L 1482 255 M 1187 582 L 1332 437 L 1482 587" fill="none" stroke="${C.rule}" stroke-width="3"/>`;
  b+=`<path d="M 1154 433 L 1322 433 L 1482 433" fill="none" stroke="${C.rust}" stroke-width="4" marker-end="url(#arrow)"/>`;
  b+=`<circle cx="1332" cy="433" r="57" fill="${C.cream}" stroke="${C.ink}" stroke-width="3"/>`;
  b+=`<circle cx="1332" cy="433" r="8" fill="${C.rust}"/>`;
  b+=text(1149,683,'Evidence informs.',31,C.secondary)+text(1149,727,'People decide.',31,C.ink,600);
  return svg(1600,840,'Kupermann Decision Partner','Established methods. Accountable decisions. An agent skill for advisers and decision-makers. Evidence informs. People decide.',b);
}

(async()=>{
  if(qa)fs.mkdirSync(qa,{recursive:true});
  const assets=[];
  for(const lang of ['en','de']) assets.push([`decision-cycle.${lang}`,cycle(lang)],[`responsibilities.${lang}`,responsibilities(lang)],[`pilot-case.${lang}`,pilot(lang)]);
  assets.push(['hero.en',hero()]);
  for(const [name,source] of assets) {
    fs.writeFileSync(path.join(out,name+'.svg'),source+'\n');
    await sharp(Buffer.from(source),{density:144}).png().toFile(path.join(out,name+'@2x.png'));
    if(qa)await sharp(Buffer.from(source),{density:144}).resize({width:640}).png().toFile(path.join(qa,name+'.640.png'));
    const meta=await sharp(path.join(out,name+'@2x.png')).metadata();
    console.log(`${name}: SVG + ${meta.width}×${meta.height} PNG`);
  }
})().catch(e=>{console.error(e);process.exit(1)});
