export default function Notification() {
  // console.log(process.env);

  console.log(process.env.NODE_ENV);
  console.log(process.env.ENV);
  console.log(process.env.ENV_DEVELOPMENT_LOCAL);

  return (
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <h1 className="text-2xl">Notification</h1>
    </div>
  );
}
