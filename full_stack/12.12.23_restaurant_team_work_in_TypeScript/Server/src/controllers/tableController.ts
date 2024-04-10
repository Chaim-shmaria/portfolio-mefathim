import * as baseServer from "../baseServer";
import express, { Request, Response } from "express";

const tableController = express.Router();

tableController.get("/all", async (req: Request, res: Response) => {
  try {
    const tables = await baseServer.selectAll("tables");
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).send("error");
  }
});

tableController.get("/", async (req: Request, res: Response) => {
  try {
    const selectedColumn = await baseServer.selectByColumn(
      "tables",
      req.params.column,
      req.params.value
    );
    res.status(200).json({ selectedColumn });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

tableController.post("/add", async (req: Request, res: Response) => {
  try {
    await baseServer.insertRow("tables", req.body);
    res.status(201).send("ok");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

tableController.put("/update/:id", async (req: Request, res: Response) => {
  try {
    await baseServer.updateRow("tables", req.body,'id', Number(req.params.id));
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

tableController.put("/unseat/update/:id", async (req: Request, res: Response) => {
  try {
    await baseServer.updateRow("tables", {connected_to: null} ,'connected_to', Number(req.params.id));
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

tableController.put("/seat/:id", async (req: Request, res: Response) => {
  try {
    const { n_diners, waiter_id, connect_to} = req.body;

    if (!n_diners && !waiter_id && !connect_to) {
      await baseServer.updateRow(
        "tables",
        { n_diners, waiter_id},
        'id',
        Number(req.params.id)
      );
      res.status(200).send("ok");
    } else if (!n_diners && !waiter_id && connect_to) {
      await baseServer.updateRow(
        "tables",
        { connect_to},
        'id',
        Number(req.params.id)
      );
      res.status(200).send("ok");
    } else {
      return res.status(400).send("Invalid data provided");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

tableController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await baseServer.deleteRow("tables","id", id);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default tableController