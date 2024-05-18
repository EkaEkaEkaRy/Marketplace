import useMultiSelect from "./multiselect";
import s from './multiselect.module.css';
import Arrow from '../images/down-arrow.png';
    
const MultiSelect = () => {

    const {
        selectedOptions,
        toggleOption,
        isOptionSelected,
        filteredOptions,
        isOpen,
        toggleDropdown,
        handleSearch,
        removeOption,
      } = useMultiSelect(['Роза', 'Ромашка', 'Тюльпан', 'Незабудка', 'Фиалка', 'Подсолнух']);

      return (
        <div className={s.multi_select}>
        <div className={s.selected_options}>
            <div className={s.selected_options_container}>
            {selectedOptions.map((option) => (
                <div key={option} className={s.one_option}>
                {option}
                <span className={s.remove_option} onClick={() => removeOption(option)}>
                    &times;
                </span>
                </div>
            ))}
            </div><div className={s.arrow}><img src={Arrow} alt="Стрелка" onClick={toggleDropdown} className={s.arrow_img}/></div>
        </div>
        {isOpen && (
            <div className={s.list}>
                <input className={s.options_dropdown}
                    type="text"
                    placeholder="Поиск..."
                    onChange={handleSearch}
                />
                <div className={s.options_list}>
                    {filteredOptions.map((option) => (
                    <div key={option}
                        className={`option ${isOptionSelected(option) ? 'selected' : ''}`}
                        onClick={() => toggleOption(option)}>{option}</div>
                    ))}
            </div>
            </div>
        )}
        </div>
    )

}

export default MultiSelect