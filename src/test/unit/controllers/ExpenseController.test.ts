import { createRequest, createResponse } from "node-mocks-http";
import Expense from "../../../models/Expense";
import { budgets } from './../../mocks/budgets';
import { ExpensesController } from "../../../controllers/ExpenseController";
import e from "express";
import { expenses } from './../../mocks/expenses';

jest.mock("../../../models/Expense", () => ({
    create: jest.fn()
}));

describe('ExpenseController.create', () => {
    it('should create a new expense', async () => {
        const expenseMock = {
            save: jest.fn()
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
        expect(expenseMock.save).toHaveBeenCalled()
        expect(expenseMock.save).toHaveBeenCalledTimes(1);
        expect(Expense.create).toHaveBeenCalledWith(req.body);

    })
     it('should handle expense creation errors', async () => {
        const expenseMock = {
            save: jest.fn()
        };
        (Expense.create as jest.Mock).mockRejectedValue(new Error)
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
        expect(res.statusCode).toBe(500);
        expect(data).toEqual('Error al Agregar Gasto');
                expect(expenseMock.save).not.toHaveBeenCalled()
        expect(Expense.create).toHaveBeenCalledWith(req.body);

    })
});

describe('ExpenseController.getById', () => {
  it('should return expense with ID 1', async() => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budgets/:budgetId/expenses/:expenseId',
      expenses: expenses[0],
    });
    const res = createResponse();
    ExpensesController.getById(req, res);

    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(data).toEqual(expenses[0]);
  })
});

describe('ExpenseController.updateById', () => {
  it('should update expense and return a success message', async() => {
   const expenseMock = {
    ...expenses[0],
            update: jest.fn()
        };
    const req = createRequest({
      method: 'PUT',
      url: '/api/budgets/:budgetId/expenses/:expenseId',
      expenses: expenseMock,
        body: { name: 'Updated Expense', amount: 100 }
    });
    const res = createResponse();
    await ExpensesController.updateById(req, res);

    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
   expect(data).toEqual('Gasto Actualizado Correctamente');
   expect(expenseMock.update).toHaveBeenCalledWith(req.body);
   expect(expenseMock.update).toHaveBeenCalledTimes(1);
  })
});
describe('ExpenseController.deleteById', () => {
  it('should delete expense and return a success message', async() => {
   const expenseMock = {
    ...expenses[0],
            destroy: jest.fn()
        };
    const req = createRequest({
      method: 'DELETE',
      url: '/api/budgets/:budgetId/expenses/:expenseId',
      expenses: expenseMock,
    });
    const res = createResponse();
    await ExpensesController.deleteById(req, res);

    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
   expect(data).toEqual('Gasto Eliminado Correctamente');
   expect(expenseMock.destroy).toHaveBeenCalledTimes(1);
  })
});