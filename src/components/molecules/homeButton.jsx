import './homeButton.css'

function HomeButton() {
  const title = 'Instituto Privado Celendín'

  return (
    <a href='/'>
        <img src="qwe" alt="logo ipc" />
        <h1>{title}</h1>
    </a>
  )
}

export { HomeButton }
