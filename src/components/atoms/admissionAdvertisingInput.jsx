import './admissionAdvertisingInput.css'

const Advertisinginput = ({label, options}) =>{
    return(
         <div className='Advertising-wrapper'>
            <label>{label}</label>
            <select className='advertising__select'>
                {
                    options.map((w, j) =>{
                        return (
                            <option key={j} value={w}>{w}</option>
                        )
                    })
                }
            </select>
         </div>
    )
       
    
}

export {Advertisinginput}