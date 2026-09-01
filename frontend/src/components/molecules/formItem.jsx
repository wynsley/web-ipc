import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import { Select } from "../atoms/select";
import { Textarea } from "../atoms/tetxtarea";

function FormItem({ 
  formFields,
  inputVariant = 'default',
  inputAlign = 'left',
  inputSize = 'small',
  selectVariant = 'default',
  selectSize = 'small',
  textareaVariant = 'default',  
  textareaSize = 'small',       
  textareaAlign = 'left',      
}) {

  // Helper para renderizar el campo correcto
  const renderField = (field) => {
    if (field.type === 'select') {
      return (
        <Select
          name={field.name}
          value={field.value}
          options={field.options}
          onChange={field.onChange}
          variant={selectVariant}
          size={selectSize}
        />
      );
    }

    if (field.type === 'textarea') {   
      return (
        <Textarea
          name={field.name}
          value={field.value}
          placeholder={field.placeholder}
          onChange={field.onChange}
          rows={field.rows}
          variant={textareaVariant}
          align={textareaAlign}
          size={textareaSize}
        />
      );
    }

    return (
      <Input
        type={field.type}
        name={field.name}
        value={field.value}
        placeholder={field.placeholder}
        onChange={field.onChange}
        variant={inputVariant}
        align={inputAlign}
        size={inputSize}
      />
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {formFields.map((item, i) => {

        if (Array.isArray(item)) {
          return (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
              {item.map((field, j) => (
                <div key={j} className="flex flex-col gap-2 w-full">
                  <Label text={field.text} htmlFor={field.htmlFor} className="text-sm sm:text-base" />
                  {renderField(field)}
                </div>
              ))}
            </div>
          );
        }

        return (
          <div key={i} className="flex flex-col gap-2 w-full">
            <Label text={item.text} htmlFor={item.htmlFor} className="text-sm sm:text-[.9em] text-black poppins" />
            {renderField(item)}
          </div>
        );
      })}
    </div>
  );
}

export { FormItem }