import type { ProsConsResponse } from "../../../interfaces";
import { environment } from "../../../../environments/environment";

export const prosConsUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/pro-cons-discusser`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) throw new Error('No se pudo realizar la conexion');

    const data = await resp.json() as ProsConsResponse;
    return {
      ok: true,
      ...data
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role: '',
      content: 'No se pudo realizar la comparacion'
    }
  }
}
