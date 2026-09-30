const grid=document.querySelector('.grid');
const note=document.querySelector('.note');
const query='*[_type == "work" && !(_id in path("drafts.**")) && hidden != true] | order(sortOrder desc, date desc){_id,title,sortOrder,date,kind,videoUrl,instagramUrl,externalUrl,"imageUrl":image.asset->url}';
function rank(work){const value=work.sortOrder;if(value===null||value===undefined||value==='')return -Infinity;const n=Number(value);return Number.isFinite(n)?n:-Infinity;}
function workLink(work){
 if(work.externalUrl){try{const u=new URL(work.externalUrl);if(['https:','http:'].includes(u.protocol)&&!u.username&&!u.password)return {url:u.href,label:'외부 링크'};}catch{}}
 const video=work.kind==='video';const destination=video?work.videoUrl:work.kind==='photo'?work.instagramUrl:null;
 const allowed=video?['youtube.com','www.youtube.com','youtu.be','m.youtube.com']:['instagram.com','www.instagram.com'];
 if(destination){try{const u=new URL(destination);if(u.protocol==='https:'&&allowed.includes(u.hostname))return {url:u.href,label:video?'유튜브':'인스타그램'};}catch{}}
 return null;
}
async function loadWorks(){
 try{
 const res=await fetch('https://laqdtwki.api.sanity.io/v2026-09-30/data/query/production?query='+encodeURIComponent(query),{credentials:'omit',cache:'no-store'});
 if(!res.ok)throw new Error('CMS '+res.status);
 const data=await res.json();if(!Array.isArray(data.result))throw new Error('Invalid response');
 const works=data.result.sort((a,b)=>{const x=rank(a),y=rank(b);if(x!==y)return x>y?-1:1;return String(b.date||'').localeCompare(String(a.date||''))||String(a._id).localeCompare(String(b._id));});
 grid.replaceChildren();
 if(!works.length){note.textContent='작품을 준비하고 있습니다.';return;}
 const style=document.createElement('style');style.textContent='.image.has-photo:before,.image.has-photo:after{display:none}.grid .image{aspect-ratio:1/1}.grid .image.has-photo{background:#fff}.grid .image img{width:100%;height:100%;object-fit:contain;object-position:center;display:block}.grid .card:hover .image img{transform:none}.card .work-link{display:block;border:0;padding:0;letter-spacing:normal}.card .work-link:focus-visible{outline:2px solid #526c49;outline-offset:6px}';document.head.append(style);
 for(const work of works){
 const card=document.createElement('article');card.className='card';card.dataset.sortOrder=work.sortOrder??'';
 const image=document.createElement('div');image.className='image';
 if(work.imageUrl){try{const url=new URL(work.imageUrl);if(url.protocol==='https:'&&url.hostname==='cdn.sanity.io'){image.classList.add('has-photo');const img=document.createElement('img');img.src=url.href+'?w=1000&auto=format&fit=max';img.alt=work.title||'작품';img.loading='lazy';image.append(img);}}catch{}}
 let container=card;const destination=workLink(work);
 if(destination){const a=document.createElement('a');a.className='work-link';a.href=destination.url;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',(work.title||'작품')+' — '+destination.label+'에서 보기 (새 탭)');card.append(a);container=a;}
 container.append(image);const meta=document.createElement('div');meta.className='meta';const title=document.createElement('h2');title.textContent=work.title||'제목 없음';const date=document.createElement('time');if(work.date){date.dateTime=work.date;date.textContent=work.date.slice(0,7).replace('-','.');}meta.append(title,date);container.append(meta);grid.append(card);
 }
 note.textContent='';
 }catch(error){grid.replaceChildren();note.textContent='작품을 불러오지 못했습니다. 잠시 후 새로고침해주세요.';console.error(error);}
}
loadWorks();
