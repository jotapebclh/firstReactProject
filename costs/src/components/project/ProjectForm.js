import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", { // Faz request
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json()) // Transforma retorno em json
        .then((data) => { // Popula categories
            setCategories(data)
        })
        .catch(err => console.log(err)) // Display erro
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    } 

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input type='text' name='name' text='Nome do projeto' placeholder='Insira o nome do projeto' value={project.name ? project.name : ''} handleOnChange={handleChange} />
            <Input type='number' name='budget' text='Orçamento do projeto' placeholder='Insira o orçamento total' value={project.budget ? project.budget : ''} handleOnChange={handleChange} />
            <Select text='Selecione a categoria' name='category_id' options={categories} value={project.category ? project.category.id : ''} handleOnChange={handleCategory} />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm