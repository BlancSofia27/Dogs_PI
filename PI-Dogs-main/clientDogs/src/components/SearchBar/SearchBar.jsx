import { useDispatch } from "react-redux"
import { useState } from "react"
import { getAllDogs, getQueryDog } from "../../redux/actions";
import styles from './SearchBar.module.css';

export default function SearchBar(props) {
    const [input, setInput] = useState('');//el estado input se inicializa con una cadena vacia
    const dispatch = useDispatch()
    const searchHandler = (event) => {
        const { value } = event.target
        if (value) {
            dispatch(getQueryDog(value))
            props.setPage(1)
        } else {
            dispatch(getAllDogs())

        }
    }
    const handlerInput = (event) => {
        if (!event.target.value) {
            dispatch(getAllDogs());
            setInput('')
        } else {
            setInput(event.target.value)
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchHandler(event)
        }
    }
    return (
        <div className={styles.searchbar}>
            <div className={styles.todo}>
                <input type="text" name='search' placeholder="Dog" value={input} onChange={handlerInput} onKeyDown={handleKeyPress} autoComplete="off" />
                <button onClick={searchHandler} value={input}>Search</button>
            </div>
        </div>
    )
}