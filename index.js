import{S as w,a as q,i as c}from"./assets/vendor-DTWVMNYS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const m=document.querySelector(".gallery"),p=document.querySelector(".loader"),h=document.querySelector(".button-load-more"),S=new w(".gallery a",{captionsData:"alt",captionDelay:250});function y(s){const t=s.map(({webformatURL:r,largeImageURL:i,tags:e,likes:o,views:n,comments:b,downloads:L})=>`<li class="gallery-item">
	<a class="gallery-link" href="${i}">
		<img
		  class="gallery-image"
		  src="${r}"
		  alt="${e}"
		/>
	</a>
   <div class="image-info">
        <div class="info-item">
            <p class="info-label">Likes</p>
            <p class="info-value">${o}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Views</p>
            <p class="info-value">${n}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Comments</p>
            <p class="info-value">${b}</p>
        </div>
        <div class="info-item">
            <p class="info-label">Downloads</p>
            <p class="info-value">${L}</p>
        </div>
    </div>
</li>`).join("");m.insertAdjacentHTML("beforeend",t),S.refresh()}function M(){m.innerHTML=""}function P(){p.classList.remove("hidden")}function $(){p.classList.add("hidden")}function g(){h.classList.remove("hidden")}function d(){h.classList.add("hidden")}const B="51602245-fcbe599c3dab331c74561bb82",f=15;async function v(s,t=1){return(await q("https://pixabay.com/api/",{params:{key:B,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:f}})).data}let a=1;const u=document.querySelector(".form");u.addEventListener("submit",async s=>{s.preventDefault();const t=s.target.elements["search-text"].value.trim();if(t===""){c.warning({icon:"ico-error",message:"Поле пошуку не може бути порожнім.",position:"topRight"});return}a=1,M(),d(),P();try{const r=await v(t,a),i=r.hits;i.length===0?c.info({icon:"ico-error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(y(i),a<Math.ceil(r.totalHits/f)?g():(c.info({icon:"Info",message:"We are sorry, but you have reached the end of search results.",position:"topRight"}),d()),u.reset())}catch(r){console.error(r)}finally{$()}});const l=document.querySelector(".button-load-more");l.addEventListener("click",async()=>{a++,l.disabled=!0;const s=u.elements["search-text"].value.trim();try{const t=await v(s,a),r=t.hits;y(r);const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:e*2,behavior:"smooth"}),a<Math.ceil(t.totalHits/f)?g():(c.info({icon:"info",message:"We are sorry, but you have reached the end of search results.",position:"topRight"}),d())}catch(t){console.error(t)}finally{l.disabled=!1}});
//# sourceMappingURL=index.js.map
