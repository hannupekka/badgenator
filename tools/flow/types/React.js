declare type ElementEventTemplate<E> = {
  target: E
} & Event;

declare type InputEvent = ElementEventTemplate<HTMLInputElement>;
declare type ElementType = React$Element<any>
