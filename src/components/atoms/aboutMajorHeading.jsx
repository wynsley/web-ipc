import { Children } from 'react'
import './aboutMajorHeading.css'

const AboutMajorHeading = ({level= 1, children}) =>{
    const Tag = `h${level}`
    return <Tag>{children}</Tag>
}

export {AboutMajorHeading}