import type { TraslateResponse } from "../../../interfaces";
import { environment } from "../../../../environments/environment";

export const traslateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/translate`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) throw new Error('No se pudo realizar la traduccion');

    const { message } = await resp.json() as TraslateResponse;
    return {
      ok: true,
      message: message
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo realizar la traduccion'
    }
  }
}
