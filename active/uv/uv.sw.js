"use strict";(()=>{var h=self.Ultraviolet,C=["cross-origin-embedder-policy","cross-origin-opener-policy","cross-origin-resource-policy","content-security-policy","content-security-policy-report-only","expect-ct","feature-policy","origin-isolation","strict-transport-security","upgrade-insecure-requests","x-content-type-options","x-download-options","x-frame-options","x-permitted-cross-domain-policies","x-powered-by","x-xss-protection"],E=["GET","HEAD"],g=class extends h.EventEmitter{constructor(e=__uv$config){super(),e.prefix||(e.prefix="/service/"),this.config=e,this.bareClient=new h.BareClient}route({request:e}){return!!e.url.startsWith(location.origin+this.config.prefix)}async fetch({request:e}){let s;try{if(!e.url.startsWith(location.origin+this.config.prefix))return await fetch(e);let t=new h(this.config);typeof this.config.construct=="function"&&this.config.construct(t,"service");let v=await t.cookie.db();t.meta.origin=location.origin,t.meta.base=t.meta.url=new URL(t.sourceUrl(e.url));let o=new w(e,t,E.includes(e.method.toUpperCase())?null:await e.blob());if(t.meta.url.protocol==="blob:"&&(o.blob=!0,o.base=o.url=new URL(o.url.pathname)),e.referrer&&e.referrer.startsWith(location.origin)){let i=new URL(t.sourceUrl(e.referrer));(o.headers.origin||t.meta.url.origin!==i.origin&&e.mode==="cors")&&(o.headers.origin=i.origin),o.headers.referer=i.href}let f=await t.cookie.getCookies(v)||[],x=t.cookie.serialize(f,t.meta,!1);o.headers["user-agent"]=navigator.userAgent,x&&(o.headers.cookie=x);let p=new u(o,null,null);if(this.emit("request",p),p.intercepted)return p.returnValue;s=o.blob?"blob:"+location.origin+o.url.pathname:o.url;let c=await this.bareClient.fetch(s,{headers:o.headers,method:o.method,body:o.body,credentials:o.credentials,mode:o.mode,cache:o.cache,redirect:o.redirect}),r=new y(o,c),l=new u(r,null,null);if(this.emit("beforemod",l),l.intercepted)return l.returnValue;for(let i of C)r.headers[i]&&delete r.headers[i];if(r.headers.location&&(r.headers.location=t.rewriteUrl(r.headers.location)),["document","iframe"].includes(e.destination)){let i=r.getHeader("content-disposition");if(!/\s*?((inline|attachment);\s*?)filename=/i.test(i)){let n=/^\s*?attachment/i.test(i)?"attachment":"inline",[m]=new URL(c.finalURL).pathname.split("/").slice(-1);r.headers["content-disposition"]=`${n}; filename=${JSON.stringify(m)}`}}if(r.headers["set-cookie"]&&(Promise.resolve(t.cookie.setCookies(r.headers["set-cookie"],v,t.meta)).then(()=>{self.clients.matchAll().then(function(i){i.forEach(function(n){n.postMessage({msg:"updateCookies",url:t.meta.url.href})})})}),delete r.headers["set-cookie"]),r.body)switch(e.destination){case"script":r.body=t.js.rewrite(await c.text());break;case"worker":{let i=[t.bundleScript,t.clientScript,t.configScript,t.handlerScript].map(n=>JSON.stringify(n)).join(",");r.body=`(async ()=>{${t.createJsInject(t.cookie.serialize(f,t.meta,!0),e.referrer)} importScripts(${i}); await __uv$promise;
`,r.body+=t.js.rewrite(await c.text()),r.body+=`
})()`}break;case"style":r.body=t.rewriteCSS(await c.text());break;case"iframe":case"document":if(r.getHeader("content-type")&&r.getHeader("content-type").startsWith("text/html")){let i=await c.text();if(Array.isArray(this.config.inject)){let n=i.indexOf("<head>"),m=i.indexOf("<HEAD>"),b=i.indexOf("<body>"),k=i.indexOf("<BODY>"),S=new URL(s),U=this.config.inject;for(let d of U)new RegExp(d.host).test(S.host)&&(d.injectTo==="head"?(n!==-1||m!==-1)&&(i=i.slice(0,n)+`${d.html}`+i.slice(n)):d.injectTo==="body"&&(b!==-1||k!==-1)&&(i=i.slice(0,b)+`${d.html}`+i.slice(b)))}r.body=t.rewriteHtml(i,{document:!0,injectHead:t.createHtmlInject(t.handlerScript,t.bundleScript,t.clientScript,t.configScript,t.cookie.serialize(f,t.meta,!0),e.referrer)})}break;default:break}return o.headers.accept==="text/event-stream"&&(r.headers["content-type"]="text/event-stream"),crossOriginIsolated&&(r.headers["Cross-Origin-Embedder-Policy"]="require-corp"),this.emit("response",l),l.intercepted?l.returnValue:new Response(r.body,{headers:r.headers,status:r.status,statusText:r.statusText})}catch(t){return["document","iframe"].includes(e.destination)?(console.error(t),R(t,s)):new Response(void 0,{status:500})}}static Ultraviolet=h};self.UVServiceWorker=g;var y=class{constructor(e,s){this.request=e,this.raw=s,this.ultraviolet=e.ultraviolet,this.headers={};for(let t in s.rawHeaders)this.headers[t.toLowerCase()]=s.rawHeaders[t];this.status=s.status,this.statusText=s.statusText,this.body=s.body}get url(){return this.request.url}get base(){return this.request.base}set base(e){this.request.base=e}getHeader(e){return Array.isArray(this.headers[e])?this.headers[e][0]:this.headers[e]}},w=class{constructor(e,s,t=null){this.ultraviolet=s,this.request=e,this.headers=Object.fromEntries(e.headers.entries()),this.method=e.method,this.body=t||null,this.cache=e.cache,this.redirect=e.redirect,this.credentials="omit",this.mode=e.mode==="cors"?e.mode:"same-origin",this.blob=!1}get url(){return this.ultraviolet.meta.url}set url(e){this.ultraviolet.meta.url=e}get base(){return this.ultraviolet.meta.base}set base(e){this.ultraviolet.meta.base=e}},u=class{#e;#t;constructor(e={},s=null,t=null){this.#e=!1,this.#t=null,this.data=e,this.target=s,this.that=t}get intercepted(){return this.#e}get returnValue(){return this.#t}respondWith(e){this.#t=e,this.#e=!0}};function O(a,e){let s=`
        errorTrace.value = ${JSON.stringify(a)};
        fetchedURL.textContent = ${JSON.stringify(e)};
        for (const node of document.querySelectorAll("#uvHostname")) node.textContent = ${JSON.stringify(location.hostname)};
        reload.addEventListener("click", () => location.reload());
        uvVersion.textContent = ${JSON.stringify("3.2.7")};
    `;return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Error</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 40px 20px;
      background-color: #000000;
      color: #ffffff;
      font-family: "DM Sans", "Inter", Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    .error-container {
      max-width: 600px;
      width: 100%;
      background-color: #0d0d0d;
      border: 1px solid #1f1f1f;
      border-radius: 12px;
      padding: 30px;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 8px;
      color: #ffffff;
    }

    p {
      color: #8a8a8a;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 8px 0;
    }

    p b, p i {
      color: #ffffff;
    }

    #errorMessage {
      color: #ff4a4a;
      font-weight: 600;
      background-color: rgba(255, 74, 74, 0.1);
      padding: 8px 12px;
      border-radius: 6px;
      display: inline-block;
      margin-top: 4px;
    }

    textarea {
      width: 100%;
      background-color: #111111;
      border: 1px solid #1f1f1f;
      color: #8a8a8a;
      font-family: monospace;
      font-size: 0.85rem;
      padding: 12px;
      border-radius: 8px;
      resize: vertical;
      outline: none;
      margin: 15px 0;
    }

    textarea:focus {
      border-color: #8a8a8a;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-top: 20px;
      margin-bottom: 8px;
      color: #ffffff;
    }

    ul {
      margin: 0 0 20px 0;
      padding-left: 20px;
    }

    li {
      color: #8a8a8a;
      font-size: 0.9rem;
      margin-bottom: 6px;
    }

    a {
      color: #ffffff;
      text-decoration: underline;
    }

    a:hover {
      color: #8a8a8a;
    }

    button {
      background-color: #1c1c1c;
      border: 1px solid #1f1f1f;
      color: #ffffff;
      font-family: inherit;
      font-weight: 500;
      font-size: 0.9rem;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.15s ease-in-out;
      width: 100%;
      text-align: center;
    }

    button:hover {
      background-color: #1b1b1b;
      border-color: #8a8a8a;
    }

    .footer {
      margin-top: 25px;
      padding-top: 15px;
      border-top: 1px solid #1f1f1f;
      text-align: center;
      font-size: 0.8rem;
    }
  </style>
</head>
<body>

  <div class="error-container">
    <h1 id="errorTitle">Error processing your request</h1>
    <p>Failed to load <b id="fetchedURL"></b></p>
    <p id="errorMessage">Internal Server Error</p>
    
    <textarea id="errorTrace" cols="40" rows="6" readonly></textarea>
    
    <h3>Try:</h3>
    <ul>
      <li>Checking your internet connection</li>
      <li>Verifying you entered the correct address</li>
      <li>Clearing the site data</li>
      <li>Contacting <b id="uvHostname"></b>'s administrator</li>
      <li>Verifying the server isn't censored</li>
    </ul>
    
    <h3>If you're the administrator of <b id="uvHostname"></b>, try:</h3>
    <ul>
      <li>Restarting your server</li>
      <li>Updating Ultraviolet</li>
      <li>Troubleshooting the error on the <a href="https://github.com/titaniumnetwork-dev/Ultraviolet" target="_blank">GitHub repository</a></li>
    </ul>
    
    <button id="reload" onclick="window.location.reload()">Reload Page</button>
    
    <div class="footer">
      <p><i>Ultraviolet v<span id="uvVersion"></span></i></p>
    </div>
  </div>

  <script src="${"data:application/javascript,"+encodeURIComponent(s)}"></script>
</body>
</html>
        `}function R(a,e){let s={"content-type":"text/html"};return crossOriginIsolated&&(s["Cross-Origin-Embedder-Policy"]="require-corp"),new Response(O(String(a),e),{status:500,headers:s})}})();
//# sourceMappingURL=uv.sw.js.map
