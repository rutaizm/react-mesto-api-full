import React from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, renderLoading}) {

    const srcAvatar = React.useRef();
    const {inputValue, error, formIsValid, setInputValue, setError, setFormIsValid, handleInputsChanges} = useValidation({});

    function handleSubmit(e) {
        e.preventDefault();      
        onUpdateAvatar(srcAvatar.current.value);
      } 

    React.useEffect(() => {
       if (isOpen) {
           srcAvatar.current.value = '';
           setInputValue('');
           setError('');
           setFormIsValid('');
        }
    }, [isOpen, setInputValue, setError, setFormIsValid]); 

    return (
        <PopupWithForm  
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}
            onUpdateAvatar={onUpdateAvatar}
            renderLoading={renderLoading}
            disabled={!formIsValid}
            name="addAvatarForm" 
            title="Обновить аватар"
            buttonTitle="Сохранить"
            buttonLoadText='Сохранение...' >
                    <input 
                        type="url" 
                        id="avatar-input" 
                        onChange={handleInputsChanges} 
                        ref={srcAvatar} 
                        value={inputValue.avatar || ''} 
                        name="avatar" 
                        placeholder="Ссылка на картинку" 
                        className={error.avatar ? 
                            "edit-form__field edit-form__field_type_error" : "edit-form__field"} 
                        required />
                    <span 
                        className={error.avatar ? 
                            "edit-form__input-error edit-form__input-error_active" : "edit-form__input-error"}>
                        {error.avatar}
                    </span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup