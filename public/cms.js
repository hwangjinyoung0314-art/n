const grid=document.querySelector('.grid');
const note=document.querySelector('.note');
const query='*[_type == "work" && !(_id in path("drafts.**")) && hidden != true] | order(sortOrder asc, date desc){title,date,kind,videoUrl,"imageUrl":image.asset->url}';
async function loadWorks(){
 try{
 const res=await fetch('https://laqdtwki.api.sanity.io/v2026-09-30/data/query/production?query='+encodeURIComponent(query),{credentials:'omit'});
 if(!res.ok)throw new Error('CMS '+res.status);
 const data=await res.json();if(!Array.isArray(data.result))throw new Error('Invalid response');
 grid.replaceChildren();
 if(!data.result.length){note.textContent='작품을 준비하고 있습니다.';return;}
 const style=document.createElement('style');style.textContent='.image.has-photo:before,.image.has-photo:after{display:none}.image img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s}.card:hover .image img{transform:scale(1.06)}.card .work-link{display:block;border:0;padding:0;letter-spacing:normal}.card .work-link:focus-visible{outline:2px solid #526c49;outline-offset:6px}';document.head.append(style);
 for(const work of data.result){
 const card=document.createElement('article');card.className='card';
 const image=document.createElement('div');image.className='image';
 if(work.imageUrl){const url=new URL(work.imageUrl);if(url.protocol==='https:'&&url.hostname==='cdn.sanity.io'){image.classList.add('has-photo');const img=document.createElement('img');img.src=url.href+'?w=1000&auto=format&fit=max';img.alt=work.title||'작품';img.loading='lazy';image.append(img);}}
 let container=card;
 if(work.kind==='video'&&work.videoUrl){try{const u=new URL(work.videoUrl);if(u.protocol==='https:'&&['youtube.com','www.youtube.com','youtu.be','m.youtube.com'].includes(u.hostname)){const a=document.createElement('a');a.className='work-link';a.href=u.href;a.target='_blank';a.rel='noopener noreferrer';card.append(a);container=a;}}catch{}}
 container.append(image);const meta=document.createElement('div');meta.className='meta';const title=document.createElement('h2');title.textContent=work.title||'제목 없음';const date=document.createElement('time');if(work.date){date.dateTime=work.date;date.textContent=work.date.slice(0,7).replace('-','.');}meta.append(title,date);container.append(meta);grid.append(card);
 }
 note.textContent='';
 }catch(error){grid.replaceChildren();note.textContent='작품을 불러오지 못했습니다. 잠시 후 새로고침해주세요.';console.error(error);}
}
loadWorks();
