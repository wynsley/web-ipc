function MyTemplate ({children, classmame = ''}) {
    return(
        <div className={classmame}>
            {children}
        </div>
    )
}

export {MyTemplate}