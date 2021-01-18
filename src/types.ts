export interface Settings {
  min: number;
  max: number;
  value: number;
  onChange?: (value: number) => void;
  onFinish?: (value: number) => void;
}
