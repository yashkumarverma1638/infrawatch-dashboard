interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ label, value, onChange }: Props) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input value={value} onChange={onChange} />
    </div>
  );
}

export default InputField;
