export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='animate-appear w-full lg:max-w-7xl lg:mx-auto'>
      {children}
    </div>
  );
}
