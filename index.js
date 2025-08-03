import{S as P,a as M,i as a}from"./assets/vendor-DTWVMNYS.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const m=document.querySelector(".gallery"),g=document.querySelector(".loader"),h=document.querySelector(".button-load-more"),R=new P(".gallery a",{captionsData:"alt",captionDelay:250});function y(o){const r=o.map(({webformatURL:i,largeImageURL:s,tags:e,likes:t,views:c,comments:S,downloads:q})=>`<li class="gallery-item">
	<a class="gallery-link" href="${s}">
		<img
		  class="gallery-image"
		  src="${i}"
		  alt="${e}"
		/>
	</a>
   <div class="image-info">
        <div class="info-item">
            <p class="info-label">Likes</p>
            <p class="info-value">${t}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Views</p>
            <p class="info-value">${c}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Comments</p>
            <p class="info-value">${S}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Downloads</p>
            <p class="info-value">${q}</p>
        </div>
    </div>
</li>`).join("");m.insertAdjacentHTML("beforeend",r),R.refresh()}function $(){m.innerHTML=""}function v(){g.classList.remove("hidden")}function b(){g.classList.add("hidden")}function L(){h.classList.remove("hidden")}function u(){h.classList.add("hidden")}const B="51602245-fcbe599c3dab331c74561bb82",f=15;async function w(o,r=1){return(await M("https://pixabay.com/api/",{params:{key:B,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:f}})).data}let n=1,d="";const p=document.querySelector(".form"),l=document.querySelector(".button-load-more");u();p.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(r===""){a.warning({icon:"ico-error",message:"Поле пошуку не може бути порожнім.",position:"topRight"});return}d=r,n=1,$(),u(),v();try{const i=await w(d,n),s=i.hits;s.length===0?a.info({icon:"ico-error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(y(s),n<Math.ceil(i.totalHits/f)?L():a.info({icon:"Info",message:"We are sorry, but you have reached the end of search results.",position:"topRight"})),p.reset()}catch(i){console.error(i),a.error({icon:"ico-error",message:"Something went wrong. Please try again!",position:"topRight"})}finally{b()}});l.addEventListener("click",async()=>{n++,l.disabled=!0,v();try{const o=await w(d,n),r=o.hits;y(r);const i=document.querySelector(".gallery-item");if(i){const s=i.getBoundingClientRect().height;window.scrollBy({left:0,top:s*2,behavior:"smooth"})}n<Math.ceil(o.totalHits/f)?L():(a.info({icon:"info",message:"We are sorry, but you have reached the end of search results.",position:"topRight"}),u())}catch(o){console.error(o),a.error({icon:"ico-error",message:"Something went wrong. Please try again!",position:"topRight"})}finally{b(),l.disabled=!1}});
//# sourceMappingURL=index.js.map
