import './homeButton.css'

function HomeButton() {
  const title = 'Instituto Privado Celendín'

  return (
    <a className='homebutton' href='/'>
        <img src="qwe" alt="logo ipc" />
        <h1 className='title'>{title}</h1>
    </a>
  )
}

export { HomeButton }
