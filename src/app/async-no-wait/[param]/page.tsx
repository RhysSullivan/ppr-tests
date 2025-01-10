import { unstable_cacheLife } from "next/cache";
import { Suspense } from "react";
type Props = {params: Promise<{param: string}>}
// Create a component that includes the delay
async function DelayedContent({ params }: Props) {
  "use cache"
  unstable_cacheLife('seconds')
  const {param} = await params;
  return (
    <div>
      Hello from async-no-wait {param}
      <title>{`Async No Wait ${param}`}</title>
    </div>
  );
}

export default function AsyncNoWait({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DelayedContent params={params} />
    </Suspense>
  );
}
