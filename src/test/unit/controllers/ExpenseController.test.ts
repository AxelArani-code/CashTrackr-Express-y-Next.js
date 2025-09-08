import { createRequest, createResponse } from "node-mocks-http";
import Expense from "../../../models/Expense";
import { budgets } from './../../mocks/budgets';
import { ExpensesController } from "../../../controllers/ExpenseController";

jest.mock("../../../models/Expense", () => ({
    create: jest.fn()
}));

describe('ExpenseController.create', () => {
    it('should create a new expense', async () => {
        const expenseMock = {
            save: jest.fn().mockResolvedValue(true)
        };
        (Expense.create as jest.Mock).mockReturnValue(expenseMock);
        const req = createRequest({
            method: 'POST',
            url: '/api/budgets/:budgetId/expenses',
            body: {
                name: ' Test Expense', amount: 500
            },
            budget: { id: 1 }
        });
        const res = createResponse();
        await ExpensesController.create(req, res);
        const data = res._getJSONData();
        expect(res.statusCode).toBe(201);
        expect(data).toEqual('Gasto Agregado Correctamente');
        expect(expenseMock.save).toHaveBeenCalledTimes(1);
        expect(Expense.create).toHaveBeenCalledWith(req.body);

    })
});