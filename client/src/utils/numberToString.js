export default function numberToString(number) {
  switch(number) {
    case 1:
      return 'one';
    case 2:
      return 'two';
    case 3:
      return 'three';
    default:
      return number;
  }
}