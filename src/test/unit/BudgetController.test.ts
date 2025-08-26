import { BudgetController } from "../../controllers/BudgetController"
import { budgets } from "../mocks/budgets"
import { createRequest, createResponse } from 'node-mocks-http'
import Budget from "../../models/Budget"

jest.mock("../../models/Budget", () => ({
  findAll: jest.fn()
}))

//Pruebas unitarias 
describe('BudgetController', () => {
  //Funciona para ejecutar antes de cada prueba 
  beforeEach(() => {
    (Budget.findAll as jest.Mock).mockReset();
    (Budget.findAll as jest.Mock).mockImplementation((options) => {
      const updatedBudgets = budgets.filter(budget => budget.userId === options.where.userId);

      return Promise.resolve(updatedBudgets);
    });
  });

  // Aquí van las pruebas unitarias
  it('should retrieve 2 budgets for user with ID 1', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 1 }
    })
    const res = createResponse();

    await BudgetController.getAll(req, res)

    const data = res._getJSONData();

    expect(data).toHaveLength(2);
    console.log(data)

    expect(res.statusCode).toBe(200);
    expect(res.status).not.toBe(404);
  })

  it('should retrieve 1 budgets for user with ID 2', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 2 }
    })
    const res = createResponse();

    await BudgetController.getAll(req, res)

    const data = res._getJSONData();

    expect(data).toHaveLength(1);
    console.log(data)

    expect(res.statusCode).toBe(200);
    expect(res.status).not.toBe(404);
  })

  it('should retrieve 0 budgets for user with ID 10', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 10 }
    })
    const res = createResponse();

    await BudgetController.getAll(req, res)

    const data = res._getJSONData();

    expect(data).toHaveLength(0);
    console.log(data)

    expect(res.statusCode).toBe(200);
    expect(res.status).not.toBe(404);
  })

  //Controlar los Errores
  it('should handle errors when fetching budgets', async () => {
    const req = createRequest({
      method: 'GET',
      url: '/api/budgets',
      user: { id: 100}
    })
    const res = createResponse();
    (Budget.findAll as jest.Mock).mockRejectedValue(new Error);
    await BudgetController.getAll(req, res);
    expect(res.statusCode).toBe(500); 
    expect(res._getJSONData()).toEqual({ error: 'Internal Server Error' });

  })
})