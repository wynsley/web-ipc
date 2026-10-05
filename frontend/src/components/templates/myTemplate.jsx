function MyTemplate ({children, classmame = ''}) {
    return(
        <div className={`${classmame} overflow-x-clip  pt-[3em] md:pt-[6em]  `}>
            {children}
        </div>
    )
}

export {MyTemplate}