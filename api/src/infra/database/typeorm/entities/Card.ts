import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { ICard, List } from "./../../../../domain/entities/card";

@Entity()
export class Card implements ICard {
    @PrimaryColumn({
        length: 64,
    })
    id: string;

    @Column({
        length: 50,
    })
    title: string;

    @Column({
        length: 100,
    })
    content: string;

    @Column({
        type: "varchar",
        enum: List,
    })
    list: List;

    @CreateDateColumn()
    created_at: Date;
}
