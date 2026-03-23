interface Props {
  text: string;
  onClick: () => void;
  loading?: boolean;
}

function Button({ text, onClick, loading }: Props) {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : text}
    </button>
  );
}

export default Button;
