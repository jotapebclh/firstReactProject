import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({ btnText }) {
    const [categories, setCategories] = useState([])

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

    return(
        <form className={styles.form}>
            <Input type='text' name='name' text='Nome do projeto' placeholder='Insira o nome do projeto' />

            <Input type='number' name='budget' text='Orçamento do projeto' placeholder='Insira o orçamento total' />
            
            <Select text='Selecione a categoria' name='category_id' options={categories} />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm