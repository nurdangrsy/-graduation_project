import React from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import './Questions.css'

// Accordion bileşeni, bir soru başlığı ve açıklama içerir
const Accordion=({title, desc, active, setActive})=>
 {
   return (
   <div className='accordionContainer'> 
       <span
        className={(active ===title ? 'activeTitle'
       : "")+ " title flex"}
       >
        {title}
         {/* Başlığı tıklandığında aktif durumu güncelle */}
       <span onClick={() => setActive(active === title ? null : title)}>
       {active === title ? (
        <ArrowCircleUpIcon className='icon'/>
       ) : (
       < ArrowCircleDownIcon className='icon'/>
       )}
        </span>
       </span>

       {/*soru başlığı aktifse göster */}
       <p className={(active === title ? "show" : "") + 
       " description"}>{desc}</p>
   </div>
   );
};

export default Accordion;
