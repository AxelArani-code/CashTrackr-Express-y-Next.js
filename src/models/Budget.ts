import { Table, Column, DataType, HasMany, BelongsTo, ForeignKey,  Model, AllowNull } from "sequelize-typescript";
import Expense from "./Expense";

@Table({
    tableName: 'budgets'
})
class Budget extends Model{
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare name:string
 @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
   declare amount:string

   @HasMany(()=> Expense,{
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
   })
   
   declare expenses: Expense[]
}

export default Budget

