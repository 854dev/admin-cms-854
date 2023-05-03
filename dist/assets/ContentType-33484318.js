import{j as e,u as p,a as o,r as h}from"./index-e03c4bb4.js";import{C as T}from"./ContentTypeSelect-306bef0e.js";const f=()=>e.jsx("footer",{className:"mt-auto",children:e.jsx("div",{className:"footer",children:"854-cms"})}),b=()=>{const{param:{contentTypeId:s,setcontentTypeId:n},contentTypeList:i}=p(),[c,y]=o.usePostContentTypeMutation(),[m,j]=o.useDeleteContentTypeMutation(),[d,a]=h.useState({contentTypeName:""}),x=async()=>{c(d).then(()=>{alert("타입 추가 완료")}).catch(()=>{alert("에러 발생")})},r=async()=>{var l;!s||!confirm(`해당 타입의 콘텐츠 전체가 삭제됩니다. ${(l=i.findContentType(s))==null?void 0:l.contentTypeName} 타입 진짜 삭제?`)||await m(s).then(()=>{alert("타입 삭제 완료"),n(void 0)}).catch(()=>{alert("에러 발생")})};return e.jsxs("main",{children:[e.jsx("section",{className:"breadcrumb",children:e.jsx("h1",{children:"Content Type"})}),e.jsx("div",{children:e.jsxs("div",{className:"grid",children:[e.jsx("fieldset",{children:e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{children:"콘텐츠 타입 선택"}),e.jsx("button",{className:"bg-error text-white",onClick:r,children:"삭제"})]}),e.jsx(T,{contentTypeId:s,setcontentTypeId:n,contentTypeList:i.data?i.data:[]})]})}),e.jsxs("fieldset",{children:[e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsx("span",{children:"콘텐츠 타입 이름"}),e.jsx("button",{onClick:x,children:"콘텐츠 타입 추가"})]}),e.jsx("hr",{}),e.jsx("input",{value:d.contentTypeName,onChange:l=>{a({...d,contentTypeName:l.currentTarget.value})}})]}),e.jsx("hr",{}),i&&s?e.jsx(N,{contentTypeId:s}):null]})}),e.jsx(f,{})]})};function N(s){const{contentTypeId:n}=s,[i,c]=o.useLazyGetContentTypeDetailQuery(),[y,m]=o.useDeleteBodySchemaMutation(),[j,d]=o.usePostBodySchemaMutation(),[a,x]=h.useState({contentTypeId:-1,schemaName:"",schemaType:"text"}),r=async t=>{await i(t).unwrap()},l=async t=>{confirm("해당 필드의 데이터가 전부 삭제됩니다. 진짜 삭제?")&&(await y(t),r(n))},u=async()=>{const t={...a,contentTypeId:Number(n)};await j(t),r(n)};return h.useEffect(()=>{r(n)},[n]),e.jsx("fieldset",{children:e.jsxs("div",{children:[c.isSuccess?e.jsxs("h3",{children:[c.data.contentTypeName," 필드 관리"]}):null,e.jsx("div",{className:"flex flex-row justify-center",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-center",children:"필드 타입"}),e.jsx("th",{className:"text-center",children:"필드 명"}),e.jsx("th",{className:"text-center",children:" "})]})}),e.jsx("tbody",{children:c.isSuccess?e.jsx(e.Fragment,{children:c.data.contentBodySchema.map(t=>e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"text-center",children:t.schemaType})," "]}),e.jsx("td",{children:e.jsx("div",{className:"text-center",children:t.schemaName})}),e.jsx("td",{children:e.jsx("button",{className:"bg-danger text-center",onClick:()=>{l(t.schemaId)},children:"삭제"})})]},t.schemaId))}):null})]})}),e.jsx("hr",{}),c.isSuccess?e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:[c.data.contentTypeName," 타입 필드 추가"]}),e.jsx("div",{className:"flex flex-col",children:e.jsxs("div",{children:[e.jsx("input",{className:"mb-4",value:a.schemaName,onChange:t=>{x({...a,schemaName:t.currentTarget.value})}}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsx("div",{className:"flex flex-row justify-between gap-4",children:["string","text"].map(t=>e.jsx("button",{className:`${a.schemaType===t?"bg-primary":"bg-gray-200"} text-sm`,onClick:()=>{x({...a,schemaType:t})},children:t},t))}),e.jsx("button",{className:"bg-primary",onClick:u,children:"필드 추가"})]})]})})]}):null]})})}export{b as default};
