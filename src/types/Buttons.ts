export default interface Button {
  id: string;
  class?: string;
  text: string;
  subText?: string;
  tooltip?: string;
  active: boolean;
  onClick: () => void;
}
