import{j as n}from"./index-2cad0a1b.js";const a=({contentTypeId:r,setcontentTypeId:i,contentTypeList:o,disabled:s,onChange:e})=>{const c=t=>{i(t.contentTypeId),e&&e(t)};return n.jsx("div",{children:o.map(t=>n.jsx("button",{disabled:s,className:`
            m-1
            ${t.contentTypeId===r?"bg-primary text-white":""}
            `,onClick:()=>c(t),children:t.contentTypeName},t.contentTypeId))})};export{a as C};
