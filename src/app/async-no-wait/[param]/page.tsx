"use cache"
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { Suspense } from 'react';

type Props = {params: Promise<{param: string}>}

// Create a separate async component to handle the param
async function AsyncContent({ params }: Props) {
  const {param} = await params;
  return (
    <div>
      Hello from async-no-wait {param}
      <title>{`Async No Wait ${param}`}</title>
    </div>
  );
}

// Main component with Suspense
export default function AsyncNoWait({ params }: Props) {
  cacheLife('minutes')
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncContent params={params} />
    </Suspense>
  );
}
