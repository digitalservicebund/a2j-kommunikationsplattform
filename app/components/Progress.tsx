type ProgressProps = {
  id: string;
  label: string;
  value: number;
  max: number;
};

export default function Progress({
  id,
  label,
  value,
  max,
}: Readonly<ProgressProps>) {
  return (
    <div className="kern-progress">
      <label className="kern-label" htmlFor={id}>
        {label}
      </label>
      <progress id={id} value={value} max={max}></progress>
    </div>
  );
}
