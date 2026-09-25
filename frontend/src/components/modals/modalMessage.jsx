import { Title } from "../atoms/titles";
import { useClickOutside } from "../../hooks/modal/usClickOutside";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { Button } from "../atoms/button";
import { FormItem } from "../molecules/shared/formItem";
import { apiFetch } from "../../helpers/apiFetch";
import { UserValidator } from "../../validations/validationCredentials";

function ModalMessage({ toggleModal }) {
  const [loading, setLoagind] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [careers, setCareers] = useState('')
  const [shifts, setShifts] = useState('')
  const [message, setMessage] = useState('')

  const modalRef = useClickOutside(toggleModal)

    const formFields = [
    {
      htmlFor: 'firstName',
      type: 'text',
      name: 'firstName',
      value: fullname,
      placeholder: 'Nombre completo',
      onChange: (e) => setFullName(e.target.value)
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
    {
      type: 'textarea',
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
    setError('')
    setSuccess('')

    try {
      setLoagind(true)

      await UserValidator.validateAsync({
        fullname,
        phone,
        address,
      })

      const response = await apiFetch('/register', 'POST', {
        fullname,
        phone,
        address,
      })

      if (response) {
        setSuccess('¡Gracias! En breve nos pondremos en contacto contigo.')

        // Cierra el modal solo, después de mostrar el mensaje un momento
        setTimeout(() => {
          toggleModal()
        }, 2500)

      } else {
        throw new Error('Error al registrar. Intenta de nuevo.')
      }

    } catch (error) {
      console.error('Error completo:', error)
      setError(error.message || 'Ocurrió un error al registrar')
    } finally {
      setLoagind(false)
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-1000 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white w-[25em] md:w-[40em] max-w-lg rounded-md shadow-xl border border-orange"
      >
        <div className="relative flex items-center justify-between px-4 pt-5">
          <Title
            level="h3"
            className="font-hani"
            weight="bold"
            text="Comunicate con nosotros"
          />

          <IoCloseOutline
            onClick={toggleModal}
            className="size-7 absolute right-2 top-2 text-gray-400 transition-all duration-300 hover:text-blue"
          />
        </div>
        <hr className="text-orange mt-4" />

        {/* ── Mensaje de éxito: reemplaza el formulario cuando se envía bien ── */}
        {success ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <div className="flex items-center justify-center size-14 rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg font-semibold font-hani text-neutral-black">
              ¡Mensaje enviado!
            </p>
            <p className="text-sm text-neutral-dark/60">
              {success}
            </p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-5 p-6"
            onClick={handleModalClick}
            onSubmit={handleSubmit}
          >
            {/* ── Mensaje de error ── */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}
            <FormItem
              formFields={formFields}
              selectVariant="primary"
            />


            <div className="flex items-center justify-end gap-10">
              <Button
                onClick={toggleModal}
                text="Cancelar"
                variant="secondary"
              />
              <Button
                type='submit'
                text={loading ? 'Enviando...' : 'Enviar'}
                variant="danger"
                disabled={loading}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export { ModalMessage }