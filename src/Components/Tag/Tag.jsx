import { useForm, Controller } from "react-hook-form";

import FormInput from "../FormInput/FormInput";
import React from "react";

const Tag = ({id, onDelete, onAdd}) => {
  const {control, watch, formState: {errors}} = useForm();


  return (
    <div className="tags__input">
      <Controller
        name={id}
        control={control}
        rules={{required: true}}
        render={({field}) =>
          <FormInput {...field}
                     value={watch(id)}
                     placeholder="Tag"
                     error={errors[id]}
          />
        }
      />
      <button className="tags__delete" type="button" onClick={() => onDelete(id)}>Delete</button>
      <button className="tags__add" onClick={onAdd} type="button">Add tag</button>
    </div>
  )
}

export default Tag;