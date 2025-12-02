const c=()=>"",s=c(),p=()=>s.length>0,f=t=>({timestamp:new Date().toISOString(),answers:t}),m=t=>!t.name||!t.email?!1:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email),l=async t=>{const o=t["contact-info"];if(!o||!m(o))throw new Error("Please complete the contact information with a valid email address.");if(!p())throw new Error("Form submission service is not configured. Please try again later.");const n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(f(t))});if(!n.ok){let r="Failed to submit form. Please try again later.";try{const i=await n.json();Array.isArray(i==null?void 0:i.errors)&&i.errors.length>0?r=i.errors.map(e=>typeof e=="string"?e:(e==null?void 0:e.message)??"").filter(e=>e.length>0).join(", "):typeof(i==null?void 0:i.error)=="string"&&(r=i.error)}catch{}throw new Error(r||"Failed to submit form. Please try again later.")}},d=t=>{let o=`New Quote Request

`;const n=t["project-type"];if(n&&(o+=`Project Type: ${n.join(", ")}
`),t["web-type"]&&(o+=`Web Type: ${t["web-type"]}
`),t["app-features"]){const e=t["app-features"];o+=`App Features: ${e.join(", ")}
`}if(t["design-type"]){const e=t["design-type"];o+=`Design Type: ${e.join(", ")}
`}o+=`
`;const r={quality:"Quality",speed:"Speed",budget:"Budget"},i=t["project-priorities"];if(i&&i.length>0){const e=i.map(a=>r[a]??a).join(", ");o+=`Project Priorities: ${e}
`}if(o+=`
`,t["additional-info"]&&(o+=`Additional Information:
${t["additional-info"]}

`),t["contact-info"]){const e=t["contact-info"];o+=`Contact Information:
`,o+=`  Name: ${e.name}
`,o+=`  Email: ${e.email}
`,e.phone&&(o+=`  Phone: ${e.phone}
`),e.company&&(o+=`  Company: ${e.company}
`)}return o};export{f as formatFormData,d as generateEmailBody,l as submitQuoteForm,m as validateContactInfo};
