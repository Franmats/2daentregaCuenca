import { Router } from "express";
import productPagModel from "../DAO/mongoManager/models/productpag.model.js"

const router = Router()

router.get("/", async (req, res)=> {
  const page = parseInt(req.query?.page || 1)
  const limit = parseInt(req.query?.limit || 10)
  const query = req.query?.query

  const result = await productPagModel.paginate({idCategoria:query}, {
      page,
      limit,
      lean: true //pasar a formato json
  })

  result.prevLink = result.hasPrevPage ? `/page=${result.prevPage}&limit=${limit}` : ""
  result.nextLink = result.hasNextPage ? `/page=${result.nextPage}&limit=${limit}` : ""
  console.log(result);

  res.render("products",result)
})
export default router