import React from 'react';

import './loader-animation.css';

function LoaderAnimation(props: Props) {
  const { isLoading, error, children } = props;

  if (error) return <h1>{error.message}</h1>;

  if (isLoading) return <div className="loader" />;

  return children;
}

interface Props {
  isLoading: boolean;
  error: Error | null;
  children: JSX.Element;
}

export default LoaderAnimation;
