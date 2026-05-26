import{a as f,S as p,i as n}from"./assets/vendor-DcHCnVjq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const h="55943093-04169c999cae84f64fe89e1ec",g="https://pixabay.com/api/";function y(s){const t=new URLSearchParams({key:h,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});return f.get(`${g}?${t}`).then(o=>o.data)}const l=document.querySelector(".gallery"),u=document.querySelector(".loader");let b=new p(".gallery a",{captionsData:"alt",captionDelay:250});function L(s){const t=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:r,views:i,comments:m,downloads:d})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${o}" alt="${e}" />
        <div class="info">
          <p><b>Likes:</b> ${r}</p>
          <p><b>Views:</b> ${i}</p>
          <p><b>Comments:</b> ${m}</p>
          <p><b>Downloads:</b> ${d}</p>
        </div>
      </a>
    </li>`).join("");l.insertAdjacentHTML("beforeend",t),b.refresh()}function P(){l.innerHTML=""}function S(){u.classList.remove("is-hidden")}function w(){u.classList.add("is-hidden")}const c=document.querySelector("#search-form");c.addEventListener("submit",s=>{s.preventDefault();const t=s.currentTarget.elements["search-text"].value.trim();if(t===""){n.warning({message:"Please enter a search query",position:"topRight"});return}P(),S(),y(t).then(o=>{if(o.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(o.hits)}).catch(o=>{console.error(o),n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{w(),c.reset()})});
//# sourceMappingURL=index.js.map
