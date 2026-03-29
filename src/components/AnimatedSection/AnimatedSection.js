import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const AnimatedSection = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  className = '',
  ...props
}) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  const getDelayClass = () => {
    if (delay === 0) return '';
    return `delay-${delay * 100}`;
  };

  return (
    <div
      ref={ref}
      className={`${animation} ${getDelayClass()} ${className}`}
      data-animated={isIntersecting}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
