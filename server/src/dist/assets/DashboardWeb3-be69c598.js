import{l as a,k as A,B as p,T as i,G as g,m as o,Q as d}from"./index-a67a649a.js";import{P as m}from"./ProgressHeader-9b86b562.js";import{A as l}from"./Animation-2c7a53ca.js";import"./Tickicon-08708329.js";const e="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOYSURBVHgBvZh/SFNRFMe/7yUECaX4AxOjWRFlkPqHgVQ6wyQyZBpmEKRBSBGaEST+47b+DsqSisCyLNJMWRARRG1KZfRPAzVSAp9ZYWY5oySLfJ3bc822e9/ecu4Ddz7POe/uu3PvPe/eJ0EPi2qGjHK6MmO+qFAgwY0ZNMAhKbwQCXwRFhJxmq5MWBiaSZTdX1SgmBKViajBwqOQoGIS5AZXTOSEePGQoDyvIJ8Yi1pBQ3MFkYdlKJMEeaL+mmRYjd69Kom0bwI2rwPSVwKLZM0+8gkYeAc87AUcz4HvPwx1Z6LvZqNh0zJjMCurScSpck1IMN6MA/Y24PIjGIENV6omplh10oCZ9aKPF1Hne4HoxQgJZQzIs2p/daG5oyVYQoZeHBPBMhKqEIYpEXCeBDaaggTKyJgdbcSIYqx7gPpSzAtTAnCnFlgRrxuWLtN8MQk7oV9lK0NYYH1dq9aPkfWcV6vEPs8UCaUJuvwgjfJureXW0z1O8T3mDVoLWcyW9UBOGt/XN0Ir6zDNpVvA6ITP3t0PVDQC+8+yRxEfvUwLxZRm8+3KRyDfBnz+CiEtXcChi3xfLmUmORahiclaw7ez2vHBg6BcegD0DPB9BYK1GwUBvKXIUn/zMQzT9pTmFCcL8UthXExSDL+mDFPhmv4JwzTc1ZpRuGJUhIeYaK354/mmNUNi2JwY+wIk+qWT1QrWOa8jHnZaOdWFgXZbK/naA+3CCfxyhG8/uguGkOipV5TF971Q+HahmK4+vr2mUMtQMNgjRBT3bBChiWl9wrezYXLaxV/EMmItExe32z00BSb5PuHSfkWbpBvdwL6cQB8TMnSBdtUuoIOW7xCtMpl+1g6qHxXbgLQUCKm7LvZJfx6UMoZ4zpQ4oPcMZWMJwkLjPaCqSehulkVnGMZb2kZWnkdYeD0K1OpkherJpHfOCAt8O41xdRPmBRvyfBswNa0TJEHx7vRcOmE4R+nNOqE9JEOlxQVk11H1DnbvDNzeDTk7xjqDhCOWVlLlduDITtq1xenHuvq0LYarH0ZQ0Cml+s5NJSqbxCYYpCAd2Ep7nrXJQMIyYIK2FONUtfupWN6nI9nge4TCARLTPPcQZyg7YYe9DOiQMtmlr+g5JBd92hFZFPyi8/Ys/1bgTslGn8cQCbTXI3lzS4volYiJPDZq5Qg/rIw0zP5wP316aNXZQle5VJRi8L9IJEDFMDUH/edmh3xe2G/E8Pz/8cqYygAAAABJRU5ErkJggg==",R="data:image/png;base64,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",h=[{img:e,title:"Coinbase NFT",description:"Collect",rating:"4.6"},{img:R,title:"Lens Protocol",description:"Social",rating:"3.4"},{img:e,title:"Dedo",description:"Swap",rating:"3.4"},{img:e,title:"Dedo",description:"Swap",rating:"3.4"},{img:e,title:"Dedo",description:"Swap",rating:"3.4"}],s=({img:t,title:n,description:r,rating:c})=>a(o,{sx:{background:`url(${d})`,backgroundSize:"100% 100%",py:"15px",px:"30px",height:"100%"},children:[A("img",{src:t,style:{marginTop:"20px"},alt:"coin"}),A(i,{fontWeight:600,my:"10px",children:n}),A(i,{component:"span",fontSize:"14px",mt:"10px",children:r}),A(i,{component:"span",ml:2,children:c})]}),E=()=>a(l,{children:[A(m,{}),a(p,{p:3.5,mt:3.7,children:[A(i,{variant:"h4",children:"New and Trending"}),A(g,{container:!0,spacing:2,mt:3,children:h.map((t,n)=>A(g,{item:!0,xs:12,sm:6,md:4,lg:2.4,children:A(o,{width:"100%",height:"100%",children:A(s,{...t})})},n))})]})]});export{E as default};