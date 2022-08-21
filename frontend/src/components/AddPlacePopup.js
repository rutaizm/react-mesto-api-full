import React from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation';

function AddPlacePopup ({isOpen, onClose, onAddPlace, renderLoading}) {
    
    const {inputValue, error, formIsValid, setInputValue, setError, setFormIsValid, handleInputsChanges} = useValidation({});

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(inputValue);
    }

    React.useEffect(() => {
        if (isOpen) {
            setInputValue({});
            setError({});
            setFormIsValid(false);
            console.log(inputValue.name);
            console.log(inputValue.link);
        }
     }, [isOpen]); 
     
    return (
        <PopupWithForm 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit}
            onAddPlace={onAddPlace}
            renderLoading={renderLoading}
            disabled={!formIsValid}
            name="addPhotoForm" 
            title="Новое место"
            buttonTitle="Создать"
            buttonLoadText='Сохранение...'>            
                    <input 
                        type="text" 
                        value={inputValue.name || ''} 
                        onChange={handleInputsChanges} 
                        id="place-input" 
                        name="name" 
                        placeholder="Название" 
                        className={error.name ? 
                            "edit-form__field edit-form__field_type_error" : "edit-form__field "} 
                        required 
                        minLength="2" 
                        maxLength="30" />
                    <span 
                        className={error.name ? 
                        "edit-form__input-error edit-form__input-error_active" : "edit-form__input-error"}>
                        {error.name}
                    </span>
                    <input 
                        type="url" 
                        value={inputValue.link || ''} 
                        onChange={handleInputsChanges} 
                        id="link-input" 
                        name="link" 
                        placeholder="Ссылка на картинку" 
                        className={error.link ? 
                            "edit-form__field edit-form__field_type_error " : "edit-form__field"} 
                        required />
                    <span 
                        className={error.link ? 
                        "edit-form__input-error edit-form__input-error_active" : "edit-form__input-error"}>
                        {error.link}
                    </span>            
    </PopupWithForm> 
    )
}

export default AddPlacePopup;