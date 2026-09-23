function MyTemplate ({children, classmame = ''}) {
    return(
        <div className={`${classmame} not-last:overflow-x-hidden pt-[3em] md:pt-[6em]`}>
            {children}
        </div>
    )
}

export {MyTemplate}