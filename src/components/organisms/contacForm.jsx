import React, { useState } from 'react'
import { Input } from '../atoms/inputForm'
import { TextArea } from '../atoms/textAreaForm'
import { SelectCareer } from '../molecules/selectCareerForm'
import './contacForm.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    celular: '',
    correo: '',
    carrera: '',
    consulta: '',
  });

  const [errores, setErrores] = useState({});

  const carrerasDisponibles = [
    'Administración de Empresas',
    'Contabilidad',
    'Computación e Informática',
    'Traducción de Idiomas'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restringimos según el campo
    if (name === "nombre" || name === "apellidos") {
      // Solo letras, espacios y tildes
      const soloLetras = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
      setFormData(prev => ({ ...prev, [name]: soloLetras }));
    } else if (name === "celular") {
      // Solo números
      const soloNumeros = value.replace(/\D/g, "");
      setFormData(prev => ({ ...prev, celular: soloNumeros }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validar = () => {
    const err = {};
    const soloLetras = /^[a-zA-ZÀ-ÿ\s]+$/;

    if (!formData.nombre.trim()) {
      err.nombre = 'Nombre requerido';
    } else if (!soloLetras.test(formData.nombre)) {
      err.nombre = 'El nombre solo debe contener letras';
    }

    if (!formData.apellidos.trim()) {
      err.apellidos = 'Apellidos requeridos';
    } else if (!soloLetras.test(formData.apellidos)) {
      err.apellidos = 'Los apellidos solo deben contener letras';
    }

    if (!/^[0-9]{9}$/.test(formData.celular)) {
      err.celular = 'Celular inválido (solo 9 dígitos numéricos)';
    }

    if (!/^\S+@(gmail\.com|outlook\.com|hotmail\.com)$/.test(formData.correo)) {
    err.correo = 'Correo debe ser gmail.com, outlook.com o hotmail.com';
  }


    if (!formData.carrera) {
      err.carrera = 'Debe seleccionar una carrera';
    }

    if (!formData.consulta.trim()) {
      err.consulta = 'Consulta requerida';
    }

    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      alert('Formulario enviado con éxito');
      console.log(formData);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3 className="form__title">
        <span className="orange">Estudia con nosotros y</span>{" "}
        <span className="blue"> contáctanos</span>
      </h3>

      <Input
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        type="text"
      />
      {errores.nombre && <span className="error">{errores.nombre}</span>}

      <Input
        label="Apellidos"
        name="apellidos"
        value={formData.apellidos}
        onChange={handleChange}
        type="text"
      />
      {errores.apellidos && <span className="error">{errores.apellidos}</span>}

      <Input
        label="Celular"
        name="celular"
        value={formData.celular}
        onChange={handleChange}
        type="tel"
      />
      {errores.celular && <span className="error">{errores.celular}</span>}

      <Input
        label="Correo Electrónico"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        type="email"
      />
      {errores.correo && <span className="error">{errores.correo}</span>}

      <SelectCareer
        label="Carrera de Interés"
        name="carrera"
        value={formData.carrera}
        onChange={handleChange}
        options={carrerasDisponibles}
      />
      {errores.carrera && <span className="error">{errores.carrera}</span>}

      <TextArea
        label="Déjanos tu consulta"
        name="consulta"
        value={formData.consulta}
        onChange={handleChange}
      />
      {errores.consulta && <span className="error">{errores.consulta}</span>}

      <button type="submit">Enviar</button>
    </form>
  );
};

export { ContactForm };
