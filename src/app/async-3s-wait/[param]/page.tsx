import { unstable_cacheLife } from "next/cache";
import { Suspense } from "react";
type Props = {params: Promise<{param: string}>}
// Create a component that includes the delay
async function DelayedContent({ params }: Props) {
  "use cache"
  unstable_cacheLife('seconds')
  const {param} = await params;
  // Simulate 3s delay as if getting from a database
  await new Promise(resolve => setTimeout(resolve, 3000));
  return (
    <div>
      Hello from async-3s-wait {param}
      <title>{`Async 3s Wait ${param}`}</title>
    </div>
  );
}

export default function Async3sWait({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DelayedContent params={params} />
    </Suspense>
  );
}
