import { useRef } from "react";

type Props = {
  color: string;
  color1: string;
  max?: number;
  value?: number;
  handleChange?(e: React.ChangeEvent<HTMLInputElement>): void;
};

export function RangeSlider({
  color,
  color1,
  max = 100,
  value = 0,
  handleChange,
}: Props) {
  // Sử dụng useRef để lấy chiều rộng của thanh trượt
  const rangeRef = useRef<HTMLDivElement>(null);

  // Hàm xử lý khi click vào thanh trượt
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rangeRef.current && max !== undefined) {
      const rect = rangeRef.current.getBoundingClientRect();
      const offsetX = e.pageX - rect.left;
      const newValue = (offsetX / rect.width) * max;

      if (handleChange) {
        const inputEvent = {
          target: {
            value: newValue.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>;

        handleChange(inputEvent);
      }
    }
  };

  return (
    <div ref={rangeRef} className="relative flex items-center">
      <input
        min="0"
        max={max}
        value={value}
        className="range-slider rounded-full"
        type="range"
        onChange={handleChange}
      />
      <div
        onClick={handleSliderClick}
        className="absolute h-full rounded-full"
        style={{
          background: `linear-gradient(to right, ${color}, ${color1})`,
          width: (value / max) * 100 + "%",
        }}
      ></div>
    </div>
  );
}
