import getSession from "@/lib/session";
import React from "react";
import { ChildWithPropsComponentProps } from "./child-with-props-component";

interface ChildProps {
  children: React.ReactElement<ChildWithPropsComponentProps>;
}

const ChildComponent: React.FC<ChildProps> = ({ children }) => {
  // const session = await getSession();

  const enhancedChildren = React.Children.map(children, (child) =>
    [1, 2, 3, 4, 5].map((item, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { count: index });
      }
      return null;
    })
  );

  return (
    <>
      <div>난 자식</div>
      {/* <div>{children}</div> */}
      {enhancedChildren && enhancedChildren.flat()}

      {/* <div>{session.id}</div> */}
    </>
  );
};
export default ChildComponent;
