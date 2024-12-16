(function(){"use strict";const o={".":"。",",":"，","(":"（",")":"）",":":"：",";":"；","?":"？","!":"！",'"':"“","”":"”","'":"‘","’":"’"};class h{static isChinese(e){return/[\u4e00-\u9fa5]/.test(e)}static isEnglish(e){return/[a-zA-Z]/.test(e)}static isPunctuation(e){return Object.keys(o).includes(e)}static findCodeBlocks(e){const t=[],n=/```[\s\S]*?```|`[^`]*`/g;let s;for(;(s=n.exec(e))!==null;)t.push({start:s.index,end:s.index+s[0].length,content:s[0]});return t}static isInCodeBlock(e,t){return t.some(n=>e>=n.start&&e<n.end)}static convertPunctuation(e,t="auto"){var l;const n=this.findCodeBlocks(e);let s="",c=!1;for(let a=0;a<e.length;a++){const i=e[a];if(this.isInCodeBlock(a,n)||t==="toEn")if(Object.values(o).includes(i)){const r=(l=Object.entries(o).find(([g,f])=>f===i))==null?void 0:l[0];s+=r||i}else s+=i;else t==="toZh"?Object.keys(o).includes(i)?s+=o[i]:s+=i:(this.isChinese(i)?c=!0:this.isEnglish(i)&&(c=!1),this.isPunctuation(i)&&c?s+=o[i]||i:s+=i)}return s}static getTextStats(e){const t={total:e.length,chinese:0,english:0,punctuation:0};for(const n of e)this.isChinese(n)?t.chinese++:this.isEnglish(n)?t.english++:this.isPunctuation(n)&&t.punctuation++;return t}static needSpace(e,t){const n=this.isChinese(e),s=this.isEnglish(e),c=this.isChinese(t),l=this.isEnglish(t);return n&&l||s&&c}static addSpaceBetweenLanguages(e){let t="";for(let n=0;n<e.length;n++){const s=e[n],c=e[n+1]||"";t+=s,this.needSpace(s,c)&&(t+=" ")}return t}static convertText(e,t="auto"){return this.convertPunctuation(e,t)}}self.onmessage=u=>{const{text:e,type:t,mode:n}=u.data;let s;switch(t){case"convert":s=h.convertText(e,n);break;case"stats":s=h.getTextStats(e);break;default:s=e}self.postMessage({type:t,result:s})}})();
