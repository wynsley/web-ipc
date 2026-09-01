import { useState } from "react"
import { Title } from "../atoms/titles"
import { Button } from "../atoms/button"
import { FormItem } from "../molecules/formItem"
import { UserValidator } from "../../validations/validationCredentials"
import { apiFetch } from "../../helpers/apiFetch"

function Form ({className= ''}) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] =useState ('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [careers, setCareers] = useState('')
  const [shifts, setShifts] = useState('')
  const [message, setMessage] = ('')
  const [error, setError] = useState('')

  const formFields = [
    {
      htmlFor: 'firstName',
      type: 'text',
      name: 'firstName',
      value: firstName,
      placeholder: 'Nombre',
      onChange: (e) => setFirstName(e.target.value)
    },
    {
      htmlFor: 'lastName',
      type: 'text',
      name: 'lastName',
      value: lastName,
      placeholder: 'Apellidos',
      onChange: (e) => setLastName(e.target.value)
    },
      {
      htmlFor: 'email',
      type: 'email',
      name: 'email',
      value: email,
      placeholder: 'tucorreo@gmail.com',
      onChange: (e) => setEmail(e.target.value)
    },
    [
      {
        htmlFor: 'phone',
        type: 'tel',
        name: 'phone',
        value: phone,
        placeholder: 'Teléfono',
        onChange: (e) => setPhone(e.target.value)
      },
      {
        htmlFor: 'address',
        type: 'text',
        name: 'address',
        value: address,
        placeholder: 'Dirección',
        onChange: (e) => setAddress(e.target.value)
      },
    ],
    [
      {
        htmlFor: 'careers',
        type: 'select',
        name: 'careers',
        value: careers,
        onChange: (e) => setCareers(e.target.value),
        options: [
          { text: 'Carrera de interés', value: '0' },
          { text: 'Administración', value: 'administration' },
          { text: 'Contabilidad', value: 'accounting' },
          { text: 'Computación', value: 'computing' },
          { text: 'Traduccion', value: 'translation' },
        ]
      },
      {
        htmlFor: 'shifts',
        type: 'select',   
        name: 'shifts',
        value: shifts,
        onChange: (e) => setShifts(e.target.value),
        options: [
          { text: 'selecciona tu turno', value: '0' },
          { text: 'Mañana', value: 'tomorrow' },
          { text: 'Trade', value: 'late' },
          { text: 'Noche', value: 'evening' },
        ]
      },
    ],
    { type: 'textarea', 
      name: 'notas', 
      text: 'Dejanos tu consulta', 
      placeholder: 'Escribe aquí...', 
      rows: 5, 
      value: message,
      onChange: (e) => setMessage(e.target.value)
    }
  
  ]

  const handleModalClick = (e) => e.stopPropagation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Limpiar errores previos

    try {
      // 1. Validar datos
      await UserValidator.validateAsync({
        firstName,
        lastName,
        phone,
        address,
      })

      // 2. Hacer petición 
      console.log('Enviando petición...')
      const response = await apiFetch('/register', 'POST', {
        firstName,
        lastName,
        phone,
        address,
      })

      // 3. Manejar la respuesta
      if (response) {
        console.log('Respuesta:', response)
        alert(response.message || 'Registro exitoso')

      } else {
        throw new Error('Error al registrar. Intenta de nuevo.')
      }

    } catch (error) {
      console.error('Error completo:', error)
      setError(error.message || 'Ocurrió un error al registrar')
    }
  }

  return (
  
      <form
        className={`top-20 right-6 w-90 md:w-100 flex flex-col mx-auto md:mx-0
        gap-6   py-4 px-5 ${className}`}
        onClick={handleModalClick}
        onSubmit={handleSubmit}
      >
        <Title 
          level="h3" 
          text="Envíanos tus datos" 
          align="center" 
          weight="bold" 
          className="font-poppins text-blue  md:pb-10"
          />

        {error && <span className="text-red-500 text-sm">{error}</span>}

        <FormItem inputVariant="secondary" formFields={formFields} />

        <Button 
          text="Enviar" 
          type="submit" 
          variant="secondary"
          />
      </form>
  )
}

export { Form }