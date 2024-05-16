

const Create_bunch = () => {
    return(
        <div>
            <div>
                Добавить букет
            </div>
            <form>
                <div><input name="name" type="text" placeholder='Название букета' required /></div>
                <div><input name="image" type="image" placeholder='Добавить фото' required /></div>
            </form>
        </div>
    )
}

export default Create_bunch