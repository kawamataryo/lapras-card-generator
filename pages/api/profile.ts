import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  await fetch(`https://lapras.com/public/${req.query.username}.json`)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(404).json({ error: "User not found" })
    })
}

export default handler
