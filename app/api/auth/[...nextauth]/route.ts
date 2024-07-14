import { authOptions } from "@/lib/session"
import NextAuth from "next-auth"
import { NextApiRequest , NextApiResponse } from "next"
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOptions);
  };

  export default handler;