import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await revalidatePath("/");
    return res.json({ revalidated: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Erro ao revalidar:", err);
    return res.status(500).send(`Erro ao revalidar a pagina: ${err.message}`);
  }
}
