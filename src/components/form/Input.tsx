import classNames from 'classnames';
import PropTypes from 'prop-types';

interface Props
  extends React.PropsWithChildren,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  invalid: boolean;
  className: string;
}

const Input = (props: Props) => {
  const { invalid, className, ...rest } = props;

  return (
    <input className={classNames('form-control', { 'is-invalid': invalid }, className)} {...rest} />
  );
};

export default Input;
