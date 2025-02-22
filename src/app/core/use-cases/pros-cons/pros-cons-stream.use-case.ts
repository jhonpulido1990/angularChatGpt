import { environment } from "../../../../environments/environment";

export async function* proConsStreamUseCase(prompt: string, abortSignal: AbortSignal) {
  try {
    const resp = await fetch(`${environment.backendApi}/pro-cons-discusser-stream`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal,
    });

    if (!resp.ok) throw new Error('No se pudo realizar la conexion');

    const reader = resp.body?.getReader();
    if(!reader) {
      console.log('No se pudo generar el reader');
      throw new Error('No se pudo generar el reader');
    }

    const decoder = new TextDecoder();
    let text = '';
    while( true ) {
      const { value, done } = await reader.read();
      if ( done ) break;

      const decodeChunk = decoder.decode(  value, { stream: true } );
      text += decodeChunk;
      yield text;
    }

    return null;
  } catch (error) {
    return null;
  }
};
