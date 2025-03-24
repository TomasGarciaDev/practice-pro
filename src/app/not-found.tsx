import { title } from "process";

export const metadata = {
  title: "Page Not Found",
  description: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className='flex justify-center'>
      <div className='text-center p-8 bg-background/70 m-12 rounded-xl'>
        <h1 className='text-5xl font-bold'>Page Not Found</h1>
      </div>
    </div>
  );
}
