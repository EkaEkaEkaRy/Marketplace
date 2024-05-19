import s from './edit_profile.module.css'
import Person from './components/profile'
import Edit_form from './components/edit'

const Edit_profile = () => {
    return(
        <div className={s.app_wrapper}>
        <main className={s.main}>
            <div className={s.item}>
            <div className={s.wrapper}>
                <Person />
                <Edit_form />
            </div>
            </div>
        </main>
        </div>
    )
}

export default Edit_profile