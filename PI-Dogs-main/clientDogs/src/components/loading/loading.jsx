import style from './loading.module.css'

export default function LoadingPage(){
    return(
        <div className={style.layout}>
            <div className={style.loader}/>
            <h1>{'{ LOADING }'}</h1>
        </div>
    )
}