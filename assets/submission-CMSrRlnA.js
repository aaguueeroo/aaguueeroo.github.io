const c=()=>{const e="xqawkwgk".trim();return e.length>0?`https://formspree.io/f/${e}`:""},s=c(),p=()=>s.length>0,f=t=>({timestamp:new Date().toISOString(),answers:t}),m=t=>!t.name||!t.email?!1:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email),l=async t=>{const e=t["contact-info"];if(!e||!m(e))throw new Error("Please complete the contact information with a valid email address.");if(!p())throw new Error("Form submission service is not configured. Please try again later.");const n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(f(t))});if(!n.ok){let r="Failed to submit form. Please try again later.";try{const i=await n.json();Array.isArray(i==null?void 0:i.errors)&&i.errors.length>0?r=i.errors.map(o=>typeof o=="string"?o:(o==null?void 0:o.message)??"").filter(o=>o.length>0).join(", "):typeof(i==null?void 0:i.error)=="string"&&(r=i.error)}catch{}throw new Error(r||"Failed to submit form. Please try again later.")}},d=t=>{let e=`New Quote Request

`;const n=t["project-type"];if(n&&(e+=`Project Type: ${n.join(", ")}
`),t["web-type"]&&(e+=`Web Type: ${t["web-type"]}
`),t["app-features"]){const o=t["app-features"];e+=`App Features: ${o.join(", ")}
`}if(t["design-type"]){const o=t["design-type"];e+=`Design Type: ${o.join(", ")}
`}e+=`
`;const r={quality:"Quality",speed:"Speed",budget:"Budget"},i=t["project-priorities"];if(i&&i.length>0){const o=i.map(a=>r[a]??a).join(", ");e+=`Project Priorities: ${o}
`}if(e+=`
`,t["additional-info"]&&(e+=`Additional Information:
${t["additional-info"]}

`),t["contact-info"]){const o=t["contact-info"];e+=`Contact Information:
`,e+=`  Name: ${o.name}
`,e+=`  Email: ${o.email}
`,o.phone&&(e+=`  Phone: ${o.phone}
`),o.company&&(e+=`  Company: ${o.company}
`)}return e};export{f as formatFormData,d as generateEmailBody,l as submitQuoteForm,m as validateContactInfo};
