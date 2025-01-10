
type Props = {params: Promise<{param: string}>}

export default async function AsyncNoWait({ params }: Props) {
    const {param} = await params;
  return (
    <div>
      Hello from no-async {param}
      <title>{`No Async ${param}`}</title>
    </div>
  );
}
