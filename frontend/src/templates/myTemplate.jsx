function MyTemplate ({children, classmame = ''}) {
    return(
        <div className={`${classmame} overflow-x-hidden`}>
            {children}
        </div>
    )
}

export {MyTemplate}