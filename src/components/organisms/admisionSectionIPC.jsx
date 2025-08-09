import './admisionSectionIPC.css'
import Img from "../../assets/img/InfraestructuraIPC.jpg"   

function InfraestructuraIPC () {
    const Titleipc= 'NUESTRO INSTITUTO'
    let Activity = '18 años'
    const Description ='Educación de calidad al servicio del país'
    return(

        <section className='admisionSection'>
            <div className='containerIPC'>
                <h2 className='titleAdmision'>
                    {Titleipc}
                </h2>
                <img className='container_img' src={Img} alt="Intraestructura IPC" />
            </div>
            <div className='containerDes'>
                <p className='activity'>
                    {Activity}
                </p>
                <p className='activity2'>
                    {Description}
                </p>
                <button className='button buttonSAdmision'>Ver más</button>
            </div>
        </section>
    )
}

export {InfraestructuraIPC}