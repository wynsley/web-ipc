import './admissionAdvertisingTitle.css'

const AdvertisingTitle = ({level = 2, children, className =''}) =>{

    const TagA = `h${level}`;
    return (
        <TagA className={`title ${className}`}>{children}</TagA>
    )
}

export{AdvertisingTitle}