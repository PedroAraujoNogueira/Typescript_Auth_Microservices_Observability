import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "users",
    timestamps: false,
})

export default class UserModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: true })
    declare name: string;

    @Column({ allowNull: false })
    declare password: string;

    @Column({ allowNull: false })
    declare email: string;

    @Column({ allowNull: false })
    declare active: string;

}