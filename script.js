const signs = [
  {name:'Aries',dates:'Mar 21 – Apr 19',symbol:'♈',element:'Fire',traits:['Bold','Energetic','Direct'],description:'Aries is traditionally associated with initiative and a love of new challenges. Often described as enthusiastic and courageous, this sign can also be impatient when things move slowly.'},
  {name:'Taurus',dates:'Apr 20 – May 20',symbol:'♉',element:'Earth',traits:['Steady','Loyal','Patient'],description:'Taurus is traditionally associated with dependability and an appreciation for comfort. Often described as patient and grounded, this sign can also be reluctant to change a familiar routine.'},
  {name:'Gemini',dates:'May 21 – Jun 20',symbol:'♊',element:'Air',traits:['Curious','Expressive','Adaptable'],description:'Gemini is traditionally associated with curiosity and lively conversation. Often described as quick-thinking and adaptable, this sign can also find it difficult to settle on one interest.'},
  {name:'Cancer',dates:'Jun 21 – Jul 22',symbol:'♋',element:'Water',traits:['Caring','Sensitive','Protective'],description:'Cancer is traditionally associated with emotional sensitivity and close personal bonds. Often described as nurturing and protective, this sign may also take criticism to heart.'},
  {name:'Leo',dates:'Jul 23 – Aug 22',symbol:'♌',element:'Fire',traits:['Confident','Generous','Creative'],description:'Leo is traditionally associated with warmth, creativity, and self-expression. Often described as generous and confident, this sign can also have a strong desire for recognition.'},
  {name:'Virgo',dates:'Aug 23 – Sep 22',symbol:'♍',element:'Earth',traits:['Observant','Practical','Thoughtful'],description:'Virgo is traditionally associated with attention to detail and a desire to be helpful. Often described as practical and organized, this sign can also set demanding standards for itself.'},
  {name:'Libra',dates:'Sep 23 – Oct 22',symbol:'♎',element:'Air',traits:['Diplomatic','Sociable','Fair-minded'],description:'Libra is traditionally associated with harmony and a sense of fairness. Often described as sociable and diplomatic, this sign can also struggle with decisions when weighing every side.'},
  {name:'Scorpio',dates:'Oct 23 – Nov 21',symbol:'♏',element:'Water',traits:['Passionate','Determined','Private'],description:'Scorpio is traditionally associated with intensity and emotional depth. Often described as determined and loyal, this sign can also be guarded about its feelings.'},
  {name:'Sagittarius',dates:'Nov 22 – Dec 21',symbol:'♐',element:'Fire',traits:['Adventurous','Optimistic','Candid'],description:'Sagittarius is traditionally associated with exploration and a love of freedom. Often described as optimistic and open-minded, this sign can also be blunt or impatient with restrictions.'},
  {name:'Capricorn',dates:'Dec 22 – Jan 19',symbol:'♑',element:'Earth',traits:['Disciplined','Ambitious','Responsible'],description:'Capricorn is traditionally associated with persistence and long-term goals. Often described as responsible and disciplined, this sign can also find it difficult to put work aside and relax.'},
  {name:'Aquarius',dates:'Jan 20 – Feb 18',symbol:'♒',element:'Air',traits:['Independent','Inventive','Idealistic'],description:'Aquarius is traditionally associated with original ideas and concern for the wider community. Often described as independent and inventive, this sign can also seem emotionally reserved.'},
  {name:'Pisces',dates:'Feb 19 – Mar 20',symbol:'♓',element:'Water',traits:['Empathetic','Imaginative','Gentle'],description:'Pisces is traditionally associated with imagination and compassion. Often described as intuitive and sensitive, this sign can also find it difficult to maintain personal boundaries.'}
];

const grid = document.getElementById('signs');
const content = document.getElementById('reading-content');
const selectionScreen = document.getElementById('selection-screen');
const detailScreen = document.getElementById('detail-screen');
const coverScreen = document.getElementById('cover-screen');
const space = document.getElementById('zodiac-space');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const floatingSpheres = [];
// Random positions and gradually changing velocities replace the fixed grid and loops.
signs.forEach((sign, index) => {
  const orb = document.createElement('div');
  orb.className = 'zodiac-orbit';
  orb.dataset.sign = sign.name;
  const ball = document.createElement('div');
  ball.className = 'zodiac-ball';
  ball.style.backgroundPosition = `${(index % 4) * 100 / 3}% ${Math.floor(index / 4) * 50}%`;
  orb.appendChild(ball);
  space.appendChild(orb);
  // Pick a scattered starting location without stacking the artwork.
  let point;
  let bestDistance = -1;
  for (let attempt = 0; attempt < 60; attempt++) {
    const candidate = {x: Math.random(), y: Math.random()};
    const distance = Math.min(...floatingSpheres.map(other => Math.hypot(candidate.x-other.x,candidate.y-other.y)));
    if (distance > bestDistance) { point = candidate; bestDistance = distance; }
    if (distance > 0.25) break;
  }
  const heading = Math.random() * Math.PI * 2;
  floatingSpheres.push({orb,ball,...point,heading,target:heading,speed:0.012+Math.random()*0.012,turnIn:2+Math.random()*7,angle:Math.random()*50-25,spin:(Math.random()-.5)*5});
});
let previousFrame;
function resolveSphereCollisions(spheres, width, height, diameter) {
  const rangeX = Math.max(1, width-diameter);
  const rangeY = Math.max(1, height-diameter);
  // Resolve in screen pixels so circles collide correctly on narrow screens too.
  for (let pass = 0; pass < 6; pass++) {
    for (let i=0; i<spheres.length; i++) {
      for (let j=i+1; j<spheres.length; j++) {
        const a=spheres[i], b=spheres[j];
        const dx=(b.x-a.x)*rangeX, dy=(b.y-a.y)*rangeY;
        const distance=Math.hypot(dx,dy);
        const contact=diameter+2;
        if (distance >= contact) continue;
        const nx=distance > 0.001 ? dx/distance : 1;
        const ny=distance > 0.001 ? dy/distance : 0;
        const correction=(contact-distance)/2;
        a.x-=nx*correction/rangeX; a.y-=ny*correction/rangeY;
        b.x+=nx*correction/rangeX; b.y+=ny*correction/rangeY;
        const avx=Math.cos(a.heading)*a.speed*rangeX, avy=Math.sin(a.heading)*a.speed*rangeY;
        const bvx=Math.cos(b.heading)*b.speed*rangeX, bvy=Math.sin(b.heading)*b.speed*rangeY;
        const approaching=(avx-bvx)*nx+(avy-bvy)*ny;
        if (approaching > 0) {
          // Equal-mass elastic bounce: exchange only velocity along the contact normal.
          const setVelocity=(sphere,vx,vy) => {
            sphere.heading=Math.atan2(vy/rangeY,vx/rangeX);
            sphere.target=sphere.heading;
            sphere.speed=Math.hypot(vx/rangeX,vy/rangeY);
            sphere.turnIn=3+Math.random()*4;
            sphere.spin=-sphere.spin;
          };
          setVelocity(a,avx-approaching*nx,avy-approaching*ny);
          setVelocity(b,bvx+approaching*nx,bvy+approaching*ny);
        }
      }
    }
    for (const sphere of spheres) {
      sphere.x=Math.max(0,Math.min(1,sphere.x));
      sphere.y=Math.max(0,Math.min(1,sphere.y));
    }
  }
}
function animateSpheres(time) {
  const dt = Math.min((time-(previousFrame ?? time))/1000,0.05);
  previousFrame = time;
  if (!coverScreen.hidden) {
    const width = space.clientWidth;
    const height = space.clientHeight;
    for (const sphere of floatingSpheres) {
      if (!reducedMotion.matches && !document.hidden) {
        sphere.turnIn -= dt;
        if (sphere.turnIn <= 0) {
          sphere.target = sphere.heading + (Math.random()-.5)*2;
          sphere.turnIn = 3+Math.random()*8;
        }
        sphere.heading += Math.atan2(Math.sin(sphere.target-sphere.heading),Math.cos(sphere.target-sphere.heading))*dt*0.3;
        sphere.x += Math.cos(sphere.heading)*sphere.speed*dt;
        sphere.y += Math.sin(sphere.heading)*sphere.speed*dt;
        if (sphere.x < 0 || sphere.x > 1) {sphere.heading=Math.PI-sphere.heading;sphere.target=sphere.heading;}
        if (sphere.y < 0 || sphere.y > 1) {sphere.heading=-sphere.heading;sphere.target=sphere.heading;}
        sphere.x=Math.max(0,Math.min(1,sphere.x));
        sphere.y=Math.max(0,Math.min(1,sphere.y));
        sphere.angle += sphere.spin*dt;
      }
    }
    resolveSphereCollisions(floatingSpheres,width,height,floatingSpheres[0].orb.offsetWidth);
    for (const sphere of floatingSpheres) {
      sphere.orb.style.transform=`translate(${sphere.x*Math.max(0,width-sphere.orb.offsetWidth)}px,${sphere.y*Math.max(0,height-sphere.orb.offsetHeight)}px)`;
      sphere.ball.style.transform=`rotate(${sphere.angle}deg)`;
    }
  }
  requestAnimationFrame(animateSpheres);
}
requestAnimationFrame(animateSpheres);
for (let index = 0; index < 150; index++) {
  const star = document.createElement('i');
  star.style.cssText = `left:${(index * 61.803) % 100}%;top:${(index * 37.137) % 100}%;--size:${index % 7 === 0 ? 3 : 1.5}px;opacity:${0.25 + (index % 6) * 0.12}`;
  document.getElementById('starfield').appendChild(star);
}
// Keep the sky stationary while the foreground softly dissolves between screens.
document.body.prepend(document.getElementById('starfield'));
const transitionStars = document.createElement('div');
transitionStars.className = 'transition-stars';
transitionStars.setAttribute('aria-hidden','true');
document.body.appendChild(transitionStars);
let transitioning = false;
async function changeScreen(from, to, focusTarget, scrollY = 0) {
  if (transitioning) return;
  transitioning = true;
  from.inert = true;
  to.inert = true;
  const moving = !reducedMotion.matches;
  const duration = moving ? 260 : 80;
  try {
    if (moving) {
      for (let i=0;i<22;i++) {
        const star=document.createElement('i');
        star.style.left=`${Math.random()*100}%`;
        star.style.top=`${Math.random()*100}%`;
        transitionStars.appendChild(star);
        star.animate([
          {opacity:0,transform:'translate(0,0) scale(.6)'},
          {opacity:.45,offset:.4},
          {opacity:0,transform:`translate(${(Math.random()-.5)*45}px,${-15-Math.random()*30}px) scale(1.1)`}
        ],{duration:1050,easing:'ease-in-out'}).finished.finally(()=>star.remove());
      }
    }
    await from.animate([
      {opacity:1,transform:'scale(1)',filter:'blur(0px)'},
      {opacity:0,transform:moving?'scale(.975)':'scale(1)',filter:moving?'blur(5px)':'blur(0px)'}
    ],{duration,easing:'ease-in',fill:'forwards'}).finished;
    from.hidden = true;
    to.hidden = false;
    window.scrollTo({top:scrollY,behavior:'instant'});
    await to.animate([
      {opacity:0,transform:moving?'scale(1.025)':'scale(1)',filter:moving?'blur(6px)':'blur(0px)'},
      {opacity:1,transform:'scale(1)',filter:'blur(0px)'}
    ],{duration:moving?520:100,easing:'cubic-bezier(.2,.65,.3,1)',fill:'forwards'}).finished;
  } finally {
    from.getAnimations().forEach(animation=>animation.cancel());
    to.getAnimations().forEach(animation=>animation.cancel());
    from.inert = false;
    to.inert = false;
    transitioning = false;
    focusTarget?.focus({preventScroll:true});
  }
}
document.getElementById('start-button').addEventListener('click', () => {
  changeScreen(coverScreen,selectionScreen,document.getElementById('selection-title'));
});
document.getElementById('cover-back-button').addEventListener('click', () => {
  changeScreen(selectionScreen,coverScreen,document.getElementById('start-button'));
});
let lastSelectedButton = null;
let selectionScroll = 0;

function selectSign(sign, selectedButton) {
  if (transitioning) return;
  lastSelectedButton = selectedButton;
  selectionScroll = window.scrollY;
  for (const button of grid.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button === selectedButton));
  }
  // All content comes from the fixed descriptions above, never from user input.
  content.innerHTML = `<div class="big-symbol" aria-hidden="true">${sign.symbol}</div>
    <p class="element">${sign.element} sign</p>
    <h1 id="reading-title" tabindex="-1">${sign.name}</h1>
    <p class="reading-dates">${sign.dates}</p>
    <p class="description">${sign.description}</p>
    <ul class="traits" aria-label="Personality traits">${sign.traits.map(trait => `<li>${trait}</li>`).join('')}</ul>`;
  document.title = `${sign.name} | Zodiac Explorer`;
  changeScreen(selectionScreen,detailScreen,document.getElementById('reading-title'));
}

document.getElementById('back-button').addEventListener('click', () => {
  if (transitioning) return;
  document.title = 'Zodiac Explorer';
  changeScreen(detailScreen,selectionScreen,lastSelectedButton,selectionScroll);
});

for (const sign of signs) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sign-button';
  button.setAttribute('aria-pressed', 'false');
  button.innerHTML = `<span class="symbol" aria-hidden="true">${sign.symbol}</span><span>${sign.name}</span><span class="sign-dates">${sign.dates}</span>`;
  button.addEventListener('click', () => selectSign(sign, button));
  grid.appendChild(button);
}

