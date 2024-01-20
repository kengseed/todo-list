import { Request, Response, NextFunction } from 'express';
import Todo from "../models/toto.model";
import { v4 as uuidv4 } from "uuid";

class ToDoController {
    private dataList: Todo[] = [
        {
            id: uuidv4(),
            title: "Test first item",
            createdBy: "test-user",
            createdDateTime: new Date(),
            updatedBy: "test-user",
            updatedDateTime: new Date()
        }
    ];

    constructor() {
        this.initialize();
    }

    private initialize() {
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteByUserName = this.deleteByUserName.bind(this);
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        res.json({ data: this.dataList });
    }

    getById(req: Request, res: Response, next: NextFunction) {
        let result = this.dataList.find(o => o.id == req.params.id);

        res.json({ data: result !== undefined ? result : null });
    }

    add(req: Request, res: Response, next: NextFunction) {
        //Parse to model and validate
        let request = req.body as Todo;
        if ((request === undefined) || (request == null)) {
            res.statusCode = 500;
            res.send({ data: "Request data is incorrect format." });
        }

        //Add new data
        let newData: Todo = {
            id: uuidv4(),
            title: request.title,
            createdBy: request.createdBy,
            createdDateTime: new Date(),
            updatedBy: request.createdBy,
            updatedDateTime: new Date()
        };
        this.dataList.push(newData);
        res.statusCode = 201;

        res.send({ data: newData });
    }

    update(req: Request, res: Response, next: NextFunction) {
        //Parse to model and validate
        let request = req.body as Todo;
        if ((request === undefined) || (request == null)) {
            res.statusCode = 500;
            res.send({ data: "Request data is incorrect format." });
        }

        //Update data
        let isFound: boolean = false;
        let result: Todo | null = null;
        this.dataList.map(o => {
            if (o.id == request.id) {
                o.title = request.title;
                o.updatedBy = request.updatedBy;
                o.updatedDateTime = new Date();

                isFound = true;
                result = o;
            }
        });

        //Not found data to update
        if (!isFound) res.statusCode = 204;

        res.send({ data: result });
    }

    delete(req: Request, res: Response, next: NextFunction) {
        //Find data by id
        let index = this.dataList.findIndex(o => o.id == req.params.id);
        let result: string = "Deleted successful";

        //Delete and return status
        if (index > -1) {
            this.dataList.splice(index, 1);
            res.statusCode = 200;
        } else {
            res.statusCode = 204;
            result = "Not found data to delete";
        }

        res.send({ data: result });
    }

    deleteByUserName(req: Request, res: Response, next: NextFunction) {
        //Return if no data
        if (this.dataList.length == 0) {
            res.statusCode = 204;
            res.send();
        }

        //Delete data
        let isFound: boolean = false;
        let result: string = "Deleted successful";
        this.dataList.forEach(o => {
            let index = this.dataList.findIndex(o => o.createdBy == req.params.user);
            if (index > -1) {
                this.dataList.splice(index, 1);
                isFound = true;
            }             
        });

        //Not found data to update
        if (!isFound) res.statusCode = 204;

        res.send({ data: result });
    }
}

export default new ToDoController();