import type { CardElement, CardProps } from '../../types/Cards';
import { memo, forwardRef, type ElementType, type JSX, type ForwardedRef } from 'react';
import './card.less';

const Card = memo(
  forwardRef(
    <T extends CardElement = 'div'>(
      { as, header, body, children, ...rest }: CardProps<T>,
      ref: ForwardedRef<HTMLElement>
    ) => {
      const Component = (as || 'div') as ElementType;
      return (
        <Component ref={ref} className='card' {...rest}>
          {header && <h2 className='card-header'>{header}</h2>}
          {body && <div className='card-body'>{body}</div>}
          {children}
        </Component>
      );
    }
  )
) as <T extends CardElement = 'div'>(
  props: CardProps<T> & { ref?: ForwardedRef<HTMLElement> }
) => JSX.Element;

export default Card;
