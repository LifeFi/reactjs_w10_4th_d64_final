export interface ChildWithPropsComponentProps {
  count?: number;
}

const ChildWithPropsComponent: React.FC<ChildWithPropsComponentProps> = ({
  count,
}) => <div>Count: {count}</div>;

export default ChildWithPropsComponent;
