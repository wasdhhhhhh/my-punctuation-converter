import { useCallback } from 'react';

interface WorkerResult {
  type: string;
  result: any;
}

export const useTextWorker = () => {
  const worker = useCallback(() => {
    return new Worker(
      new URL('../workers/textConverter.worker.ts', import.meta.url),
      { type: 'module' }
    );
  }, []);

  const processText = useCallback((
    text: string, 
    type: 'convert' | 'stats',
    mode: 'auto' | 'toZh' | 'toEn' = 'auto'
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      const textWorker = worker();
      
      textWorker.onmessage = (e: MessageEvent<WorkerResult>) => {
        resolve(e.data.result);
        textWorker.terminate();
      };
      
      textWorker.onerror = (error) => {
        reject(error);
        textWorker.terminate();
      };
      
      textWorker.postMessage({ text, type, mode });
    });
  }, [worker]);

  return { processText };
}; 