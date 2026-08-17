// Bandeiras em SVG e nao em emoji: o Windows nao tem glifo para 🇺🇸/🇧🇷
// e renderiza as letras "US"/"BR" no lugar da bandeira.

export const FlagUS = props => (
 <svg viewBox="0 0 21 14" aria-hidden="true" {...props}>
  <rect width="21" height="14" fill="#fff"/>
  {[0,1,2,3,4,5,6].map(i=><rect key={i} y={i*2.154} width="21" height="1.077" fill="#b22234"/>)}
  <rect width="9.1" height="7.54" fill="#3c3b6e"/>
  {[0,1,2,3].map(r=>[0,1,2,3,4].map(c=>
   <circle key={`${r}-${c}`} cx={1+c*1.8+(r%2?0.9:0)} cy={1.1+r*1.8} r=".42" fill="#fff"/>
  ))}
 </svg>
);

export const FlagBR = props => (
 <svg viewBox="0 0 21 14" aria-hidden="true" {...props}>
  <rect width="21" height="14" fill="#009b3a"/>
  <path d="M10.5 1.4 19.6 7l-9.1 5.6L1.4 7Z" fill="#fedf00"/>
  <circle cx="10.5" cy="7" r="3.3" fill="#002776"/>
  <path d="M7.6 5.9a9 9 0 0 1 5.9 1.9 3.3 3.3 0 0 1-.3.9 8 8 0 0 0-5.9-1.9Z" fill="#fff"/>
 </svg>
);
