"use client"

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [metadata, setMetadata] = useState<Array<{title: string, description: string}>>([]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([true, true, true]);

  useEffect(() => {
    const fetchEndpoints = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const num = urlParams.get('num') || Math.floor(Math.random() * 100);
      
      const endpoints = [
        `/async-3s-wait/${num}`, 
        `/async-no-wait/${num}`, 
        `/no-async`
      ];

      Promise.all(
        endpoints.map(async (endpoint, index) => {
          try {
            const response = await fetch(endpoint, {
              headers: {
                'Accept': 'text/html',
                'Connection': 'keep-alive'
              },
              cache: 'no-store'
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            if (!reader) {
              throw new Error('Failed to get response reader');
            }

            let html = '';
            const decoder = new TextDecoder();

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              html += decoder.decode(value, { stream: true });
            }
            html += decoder.decode();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newData = {
              title: doc.querySelector('title')?.textContent || '',
              description: doc.querySelector('description')?.textContent || ''
            };

            setMetadata(prev => {
              const updated = [...prev];
              updated[index] = newData;
              return updated;
            });
          } finally {
            setLoadingStates(prev => {
              const updated = [...prev];
              updated[index] = false;
              return updated;
            });
          }
        })
      );
    };

    fetchEndpoints();
  }, []);

  return (
    <main>
      {[0,1,2].map((_, index) => (
        <div key={index}>
          {loadingStates[index] ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2>{metadata[index]?.title}</h2>
              <p>{metadata[index]?.description}</p>
            </>
          )}
        </div>
      ))}
    </main>
  );
}
