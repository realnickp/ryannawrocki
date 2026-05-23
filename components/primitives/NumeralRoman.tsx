type Props = { value: "I" | "II" | "III" | "IV" | "V" | "VI" | "VII" };

export function NumeralRoman({ value }: Props) {
  return (
    <span aria-hidden className="numeral-roman">
      {value}
    </span>
  );
}
