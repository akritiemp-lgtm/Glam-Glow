const $=(s)=>document.querySelector(s);const $$=(s)=>document.querySelectorAll(s);
const menuToggle=$('#menuToggle'),navLinks=$('#navLinks');
menuToggle.addEventListener('click',()=>navLinks.classList.toggle('active'));
$$('#navLinks a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('active')));
const toast=$('#toast'),toastText=$('#toastText');let toastTimer;
function showToast(service){toastText.textContent=`Your request for ${service} has been noted. We’ll contact you soon.`;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),5000)}
$('#toastClose').addEventListener('click',()=>toast.classList.remove('show'));
$$('.service-book,.package-book,.reel-book').forEach(btn=>btn.addEventListener('click',()=>{const service=btn.dataset.service;$('#service').value=service;showToast(service);location.hash='contact'}));
const form=$('#contactForm');form.addEventListener('submit',e=>{e.preventDefault();const name=$('#name').value.trim();const service=$('#service').value||'your selected service';showToast(service);form.reset();setTimeout(()=>{toastText.textContent=`Thank you, ${name}. We’ll contact you soon to confirm your appointment.`},50)});
const feed=$('#reelsFeed'),progress=$('#reelProgress'),videos=$$('.reel-video');
if(feed){feed.addEventListener('scroll',()=>{const max=feed.scrollHeight-feed.clientHeight;progress.style.height=max?`${Math.max(10,Math.min(100,(feed.scrollTop/max)*100))}%`:'10%'});}
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const v=entry.target;if(entry.isIntersecting&&entry.intersectionRatio>.72){videos.forEach(x=>{if(x!==v)x.pause()});v.muted=true;v.play().catch(()=>{})}else v.pause()}),{threshold:[.72]});videos.forEach(v=>observer.observe(v))}
window.addEventListener('scroll',()=>document.body.classList.toggle('scrolled',window.scrollY>20));
