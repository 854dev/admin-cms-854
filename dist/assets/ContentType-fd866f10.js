import{j as e,r as x,a as i}from"./index-4cc60571.js";const f=()=>e.jsx("footer",{className:"mt-auto",children:e.jsx("div",{className:"footer",children:"854-cms"})}),b=()=>{const[c,n]=x.useState(),{data:l,error:a,isFetching:u,isSuccess:j,refetch:p}=i.useGetContentTypeListQuery({page:1,limit:50},{skip:!1,refetchOnMountOrArgChange:!0}),[m,r]=i.usePostContentTypeMutation(),[d,h]=i.useDeleteContentTypeMutation(),[o,y]=x.useState({contentTypeName:""}),t=async s=>{n(Number(s.currentTarget.value))},T=async()=>{m(o).then(()=>{alert("타입 추가 완료")}).catch(()=>{alert("에러 발생")})},g=async()=>{!c||!confirm("해당 타입의 콘텐츠 전체가 삭제됩니다. 진짜 삭제?")||await d(c).then(()=>{alert("타입 삭제 완료"),n(void 0)}).catch(()=>{alert("에러 발생")})};return e.jsxs("main",{children:[e.jsx("section",{className:"breadcrumb",children:e.jsx("h1",{children:"Content Type"})}),e.jsx("div",{children:e.jsxs("div",{className:"grid",children:[e.jsx("fieldset",{children:e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{children:"콘텐츠 타입 선택"}),e.jsx("button",{className:"bg-error text-white",onClick:g,children:"삭제"})]}),e.jsx("div",{children:l?e.jsx(e.Fragment,{children:l.data.map(s=>e.jsx("button",{className:c===s.contentTypeId?"bg-primary text-white":"",value:s.contentTypeId,onClick:t,children:s.contentTypeName},s.contentTypeId))}):null})]})}),e.jsxs("fieldset",{children:[e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsx("span",{children:"콘텐츠 타입 이름"}),e.jsx("button",{onClick:T,children:"콘텐츠 타입 추가"})]}),e.jsx("hr",{}),e.jsx("input",{value:o.contentTypeName,onChange:s=>{y({...o,contentTypeName:s.currentTarget.value})}})]}),e.jsx("hr",{}),l&&c?e.jsx(N,{contentTypeId:c}):null]})}),e.jsx(f,{})]})};function N(c){const{contentTypeId:n}=c,[l,a]=i.useLazyGetContentTypeDetailQuery(),[u,j]=i.useDeleteBodySchemaMutation(),[p,m]=i.usePostBodySchemaMutation(),[r,d]=x.useState({contentTypeId:-1,schemaName:"",schemaType:"text"}),h=async t=>{await l(t).unwrap()},o=async t=>{confirm("해당 필드의 데이터가 전부 삭제됩니다. 진짜 삭제?")&&(await u(t),h(n))},y=async()=>{const t={...r,contentTypeId:Number(n)};await p(t),h(n)};return x.useEffect(()=>{h(n)},[n]),e.jsx("fieldset",{children:e.jsxs("div",{children:[a.isSuccess?e.jsxs("h3",{children:[a.data.contentTypeName," 필드 관리"]}):null,e.jsx("div",{className:"flex flex-row justify-center",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-center",children:"필드 타입"}),e.jsx("th",{className:"text-center",children:"필드 명"}),e.jsx("th",{className:"text-center",children:" "})]})}),e.jsx("tbody",{children:a.isSuccess?e.jsx(e.Fragment,{children:a.data.contentBodySchema.map(t=>e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("div",{className:"text-center",children:t.schemaType})," "]}),e.jsx("td",{children:e.jsx("div",{className:"text-center",children:t.schemaName})}),e.jsx("td",{children:e.jsx("button",{className:"bg-danger text-center",onClick:()=>{o(t.schemaId)},children:"삭제"})})]},t.schemaId))}):null})]})}),e.jsx("hr",{}),a.isSuccess?e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:[a.data.contentTypeName," 타입 필드 추가"]}),e.jsx("div",{className:"flex flex-col",children:e.jsxs("div",{children:[e.jsx("input",{className:"mb-4",value:r.schemaName,onChange:t=>{d({...r,schemaName:t.currentTarget.value})}}),e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsx("div",{className:"flex flex-row justify-between gap-4",children:["string","text"].map(t=>e.jsx("button",{className:`${r.schemaType===t?"bg-primary":"bg-gray-200"} text-sm`,onClick:()=>{d({...r,schemaType:t})},children:t},t))}),e.jsx("button",{className:"bg-primary",onClick:y,children:"필드 추가"})]})]})})]}):null]})})}export{b as default};
//# sourceMappingURL=ContentType-fd866f10.js.map