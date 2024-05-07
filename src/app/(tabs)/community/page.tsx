import ChildComponent from "./child-component";
import ChildWithPropsComponent from "./child-with-props-component";
import ParentComponent from "./parent-component";

export default function Community() {
  return (
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <h1 className="text-2xl">Community</h1>
      <ParentComponent>
        <div>난 0째</div>
        <ChildComponent>
          <ChildWithPropsComponent />
        </ChildComponent>
        <div>난 둘째</div>
      </ParentComponent>
    </div>
  );
}
