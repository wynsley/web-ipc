import { Input } from "../../atoms/input";
import { Label } from "../../atoms/label";
import { Select } from "../../atoms/select";
import { Textarea } from "../../atoms/textarea";

function FormField({ field, value, onChange, error }) {
  const { name, label, type, options, placeholder, required = true } = field;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} text={label} />

      {type === "select" && (
        <Select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          options={options}
          error={error}
        />
      )}

      {type === "textarea" && (
        <Textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          error={error}
        />
      )}

      {type !== "select" && type !== "textarea" && (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          error={error}
        />
      )}
    </div>
  );
}

export { FormField };