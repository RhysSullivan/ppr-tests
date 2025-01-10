
type Props = {params: Promise<{param: string}>}

export default async function AsyncNoWait({ params }: Props) {
    const {param} = await params;
  return (
    <div>
      Hello from async-no-wait {param}
      <title>{`Async No Wait ${param}`}</title>
    </div>
  );
}
